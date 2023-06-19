import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Transaction } from './transaction.model';
import { BookService } from './book.service';
import { Book } from './book.model';
import { TransactionType } from './transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  firestore: Firestore;
  booksCollectionName = "books";
  archivedBooksCollectionName = "archivedBooks";
  incomeCollectionName = "income";

  constructor(private bookService: BookService) { 
    const app = initializeApp(environment.firebaseConfig); 
    this.firestore = getFirestore(app);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'fakeUser@gmail.com', 'fakeUserPassword').then((response) => {
      console.log(response);
    });
  }

  getIncomeOfBook(bookId: string) {
    return new Observable((Subscriber: Subscriber<Transaction[]>) => {
      onSnapshot(collection(this.firestore, 'books/' + bookId + '/' + TransactionType.INCOME.toLowerCase()), (snapshot) => {
        let income: Transaction[] = [];
        snapshot.forEach((doc) => {
          let incomeItem = doc.data() as Transaction;
          incomeItem['id'] = doc.id;
          income.push(incomeItem);
        });
        Subscriber.next(income);
      });
    });
  }

  getExpensesOfBook(bookId: string) {
    return new Observable((Subscriber: Subscriber<Transaction[]>) => {
      onSnapshot(collection(this.firestore, 'books/' + bookId + '/' + TransactionType.EXPENSES.toLowerCase()), (snapshot) => {
        let expenses: Transaction[] = [];
        snapshot.forEach((doc) => {
          let expense = doc.data() as Transaction;
          expense['id'] = doc.id;
          expenses.push(expense);
        });
        Subscriber.next(expenses);
      });
    });
  }

  getTransaction(bookId: string, transactionId: string, transactionType: string) {
    return new Observable((subscriber: Subscriber<Transaction>) => {
      getDoc(doc(this.firestore, 'books/' + bookId + '/' + transactionType.toLowerCase() + '/' + transactionId)).then((doc) => {
        let transaction = doc.data() as Transaction ?? {};
        transaction['id'] = doc.id;
        subscriber.next(transaction);
      });
    });
  }

  addTransactionToBook(book: Book, transaction: Transaction, transactionType: string) {
      const transactionDocument = this.addTransaction(transaction, 'books/' + book.id + '/' + transactionType.toLowerCase());
      this.bookService.editBook(book);
      setDoc(transactionDocument, transaction);
  }

  editTransaction(bookId: string, transaction: Transaction, transactionType: string) {
    updateDoc(doc(this.firestore, 'books/' + bookId + '/' + transactionType.toLowerCase(), transaction.id).withConverter(this.transactionConverter), transaction);
  }

  addTransaction(transaction: Transaction, collectionTitle: string) {
    const transactionDocument = doc(collection(this.firestore, collectionTitle));
    transaction.id = transactionDocument.id;
    return transactionDocument.withConverter(this.transactionConverter);
  }

  transactionConverter = {
    toFirestore: (transaction: Transaction) => {
        return {
            id: transaction.id,
            description: transaction.description,
            price: transaction.price,
            date: transaction.date
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let transaction = new Transaction();
        transaction.createTransaction(data.id, data.description, data.price, data.date);
        return transaction;
    }
  };
}
