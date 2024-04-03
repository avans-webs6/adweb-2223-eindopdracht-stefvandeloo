import { Injectable } from '@angular/core';
import {from, map, Observable, Subscriber} from 'rxjs';
import {
    onSnapshot,
    collection,
    updateDoc,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    query, where, getDocs
} from "firebase/firestore";
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';
import {FirebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactionsCollectionName = "transactions";

  constructor(private firebase: FirebaseService) {  }

  getTransactionsOfBook(bookId: string, transactionType?: TransactionType) {
      return new Observable((subscriber: Subscriber<Transaction[]>) => {
            this.createTransactionSnapshot(bookId, subscriber, transactionType);
      });
  }

    getTransactions() {
        return new Observable((subscriber: Subscriber<Transaction[]>) => {
            this.createTransactionSnapshot(undefined, subscriber);
        });
    }

  createTransactionSnapshot(bookId: string | undefined, Subscriber: Subscriber<Transaction[]>, transactionType?: TransactionType) {
    const transactionQuery = this.createQuery(bookId, transactionType);

    onSnapshot(transactionQuery, (snapshot) => {
      let transactions: Transaction[] = [];
      snapshot.forEach((doc) => {
        let transaction = doc.data() as Transaction;
          transaction.id = doc.id;
          transactions.push(transaction);
      });
      Subscriber.next(transactions);
    });
  }

  createQuery(bookId: string | undefined, transactionType: TransactionType | undefined) {
      let q = query(collection(this.firebase.firestore, this.transactionsCollectionName));
      if (bookId) q = query(q, where("bookId", "==", bookId));
      if (transactionType) q = query(q, where("type", "==", transactionType));
      return q;
  }

  getTransaction(transactionId: string) {
    return from(getDoc(doc(this.firebase.firestore, this.transactionsCollectionName + '/' + transactionId))).pipe(
        map(doc => {
            let transaction = doc.data() as Transaction;
            transaction.id = doc.id;
            return transaction;
        })
    );
  }

  async editTransaction(transaction: Transaction) {
    await updateDoc(doc(this.firebase.firestore, this.transactionsCollectionName, transaction.id).withConverter(this.transactionConverter), transaction);
  }

  async addTransaction(transaction: Transaction) {
    const transactionDocument = doc(collection(this.firebase.firestore, this.transactionsCollectionName)).withConverter(this.transactionConverter);
    transaction.id = transactionDocument.id;
    await setDoc(transactionDocument, transaction);
  }

  async deleteTransaction(transactionId: string) {
    await deleteDoc(doc(this.firebase.firestore, this.transactionsCollectionName, transactionId));
  }

    async changeTransactionsBookId(oldBookId: string, newBookId: string) {
        const transactionQuery = query(
            collection(this.firebase.firestore, this.transactionsCollectionName),
            where("bookId", "==", oldBookId)
        );
        const transactions = await getDocs(transactionQuery.withConverter(this.transactionConverter));
        transactions.forEach((transaction) => {
            updateDoc(doc(this.firebase.firestore, this.transactionsCollectionName, transaction.data().id), { bookId: newBookId });
        });
    }

  transactionConverter = {
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
