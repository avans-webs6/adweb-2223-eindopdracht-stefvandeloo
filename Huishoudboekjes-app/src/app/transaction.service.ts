import { Injectable } from '@angular/core';
import {from, map, mergeMap, Observable, Subscriber} from 'rxjs';
import {getApp, initializeApp} from "firebase/app";
import {
    Firestore,
    getFirestore,
    onSnapshot,
    collection,
    updateDoc,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    query, where, getDocs
} from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';
import firebase from "firebase/compat";
import CollectionReference = firebase.firestore.CollectionReference;

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
    const app = getApp();
    this.firestore = getFirestore(app);
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

  getTransactionsOfBook(bookId: string, transactionType?: TransactionType) {
      return new Observable((subscriber: Subscriber<Transaction[]>) => {
            this.createTransactionSnapshot(bookId, subscriber, transactionType);
      });
  }

  createTransactionSnapshot(bookId: string, Subscriber: Subscriber<Transaction[]>, transactionType?: TransactionType) {
    const transactionQuery = this.createQuery(bookId, transactionType);

    onSnapshot(transactionQuery, (snapshot) => {
      let transactions: Transaction[] = [];
      snapshot.forEach((doc) => {
        let transaction = doc.data() as Transaction;
          transaction['id'] = doc.id;
          transactions.push(transaction);
      });
      Subscriber.next(transactions);
    });
  }

  createQuery(bookId: string, transactionType: TransactionType | undefined) {
      let q = query(
          collection(this.firestore, this.transactionsCollectionName),
          where("bookId", "==", bookId)
        );

      if (transactionType) {
          q = query(
              q,
              where("type", "==", transactionType)
          );
      }
      return q;
  }

  getTransactions() {
    return new Observable((subscriber: Subscriber<Transaction[]>) => {
      onSnapshot(collection(this.firestore, this.transactionsCollectionName), (snapshot) => {
        let transactions: Transaction[] = [];
        snapshot.forEach((doc) => {
          let transaction = doc.data() as Transaction;
          transaction['id'] = doc.id;
          transactions.push(transaction);
        });
        subscriber.next(transactions);
      });
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

    async changeTransactionsBookId(oldBookId: string, newBookId: string) {
        const transactionQuery = query(
            collection(this.firestore, this.transactionsCollectionName),
            where("bookId", "==", oldBookId)
        );
        let transactions = await getDocs(transactionQuery.withConverter(this.transactionConverter));
        transactions.forEach((transaction) => {
            updateDoc(doc(this.firestore, this.transactionsCollectionName, transaction.data().id), { bookId: newBookId });
        });

        from(getDocs(transactionQuery.withConverter(this.transactionConverter)))
            .pipe(
                mergeMap(transactions => transactions.docs),
                map(transaction => {
                    updateDoc(doc(this.firestore, this.transactionsCollectionName, transaction.data().id), { bookId: newBookId })
                })
            )
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
