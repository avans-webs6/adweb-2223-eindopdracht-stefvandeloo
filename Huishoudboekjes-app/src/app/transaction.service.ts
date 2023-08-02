import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, updateDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  firestore: Firestore;
  booksCollectionName = "books";
  transactionsCollectionName = "transactions";
  archivedBooksCollectionName = "archivedBooks";
  incomeCollectionName = "income";

  constructor() { 
    const app = initializeApp(environment.firebaseConfig); 
    this.firestore = getFirestore(app);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'fakeUser@gmail.com', 'fakeUserPassword').then((response) => {
      console.log(response);
    });
  }

  getIncomeOfBook(bookId: string) {
    return new Observable((Subscriber: Subscriber<Transaction[]>) => {
      this.createTransactionSnapshot(bookId, Subscriber, TransactionType.INCOME);
    });
  }

  getExpensesOfBook(bookId: string) {
    return new Observable((Subscriber: Subscriber<Transaction[]>) => {
      this.createTransactionSnapshot(bookId, Subscriber, TransactionType.EXPENSES);
    });
  }

  createTransactionSnapshot(bookId: string, Subscriber: Subscriber<Transaction[]>, transactionType: TransactionType) {
    onSnapshot(collection(this.firestore, this.transactionsCollectionName), (snapshot) => {
      let transactions: Transaction[] = [];
      snapshot.forEach((doc) => {
        let transaction = doc.data() as Transaction;
        if (!transaction.bookId || !transaction.bookId.match(bookId)) return;

        if (transaction.type === transactionType) {
          transaction['id'] = doc.id;
          transactions.push(transaction);
        }
      });
      Subscriber.next(transactions);
    });
  }

  getTransaction(transactionId: string) {
    return new Observable((subscriber: Subscriber<Transaction>) => {
      getDoc(doc(this.firestore, this.transactionsCollectionName + '/' + transactionId)).then((doc) => {
        let transaction = doc.data() as Transaction ?? {};
        transaction['id'] = doc.id;
        subscriber.next(transaction);
      });
    });
  }

  editTransaction(transaction: Transaction) {
    updateDoc(doc(this.firestore, this.transactionsCollectionName, transaction.id).withConverter(this.transactionConverter), transaction);
  }

  addTransaction(transaction: Transaction) {
    const transactionDocument = doc(collection(this.firestore, this.transactionsCollectionName)).withConverter(this.transactionConverter);
    transaction.id = transactionDocument.id;
    setDoc(transactionDocument, transaction);
  }

  deleteTransaction(transactionId: string) {
    deleteDoc(doc(this.firestore, this.transactionsCollectionName, transactionId));
  }

  public transactionConverter = {
    toFirestore: (transaction: Transaction) => {
    return {
            id: transaction.id,
            description: transaction.description,
            price: transaction.price,
            date: transaction.date,
            type: transaction.type,
            bookId: transaction.bookId,
            categoryId: transaction.categoryId
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let transaction = new Transaction();
        transaction.createTransaction(data.id, data.description, data.price, data.date, data.type, data.bookId, data.categoryId);
        return transaction;
    }
  };
}
