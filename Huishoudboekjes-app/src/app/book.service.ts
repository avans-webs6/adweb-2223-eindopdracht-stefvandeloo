import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { Transaction } from './transaction.model';
import { TransactionType } from './transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  firestore: Firestore;
  booksCollectionName = "books";
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

  getBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.booksCollectionName);
  }

  getArchivedBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.archivedBooksCollectionName);
  }

  //TODO: Maybe use the bookConverter here too, instead of 'as Book'.
  getBook(bookId: string): Observable<Book> {
    return new Observable((subscriber: Subscriber<Book>) => {
      getDoc(doc(this.firestore, this.booksCollectionName, bookId)).then((doc) => {
        let book = doc.data() as Book ?? {};
        book['id'] = doc.id;
        subscriber.next(book);
      });
    });
  }

  addBook(book: Book) {
    this.addBookCollection(book, this.booksCollectionName);
  }

  editBook(book: Book) {
    updateDoc(doc(this.firestore, this.booksCollectionName, book.id).withConverter(this.bookConverter), book);
  }

  async archiveBookAndTransactions(book: Book) {
    const storedIncomeDocuments = await this.receiveStoredTransactionDocuments(this.booksCollectionName, book.id, TransactionType.INCOME);
    const storedExpensesDocuments = await this.receiveStoredTransactionDocuments(this.booksCollectionName, book.id, TransactionType.EXPENSES);

    const oldBookId = this.toggleArchivationBook(book, this.archivedBooksCollectionName, this.booksCollectionName);
    this.changeTransactionSaveCollection(storedIncomeDocuments, this.archivedBooksCollectionName, this.booksCollectionName, oldBookId, book.id, TransactionType.INCOME);
    this.changeTransactionSaveCollection(storedExpensesDocuments, this.archivedBooksCollectionName, this.booksCollectionName, oldBookId, book.id, TransactionType.EXPENSES);
  }

  async dearchiveBookAndTransactions(book: Book) {
    const storedIncomeDocuments = await this.receiveStoredTransactionDocuments(this.archivedBooksCollectionName, book.id, TransactionType.INCOME);
    const storedExpensesDocuments = await this.receiveStoredTransactionDocuments(this.archivedBooksCollectionName, book.id, TransactionType.EXPENSES);

    const oldBookId = this.toggleArchivationBook(book, this.booksCollectionName, this.archivedBooksCollectionName);
    this.changeTransactionSaveCollection(storedIncomeDocuments, this.booksCollectionName, this.archivedBooksCollectionName, oldBookId, book.id, TransactionType.INCOME);
    this.changeTransactionSaveCollection(storedExpensesDocuments, this.booksCollectionName, this.archivedBooksCollectionName, oldBookId, book.id, TransactionType.EXPENSES);
  }

  addBookCollection(book: Book, collectionTitle: string) {
    const bookDocument = doc(collection(this.firestore, collectionTitle)).withConverter(this.bookConverter);
    book.id = bookDocument.id;
    setDoc(bookDocument, book);
  }

  toggleArchivationBook(book: Book, addCollectionName: string, deleteCollectionName: string) {
    const oldBookId = book.id;
    deleteDoc(doc(this.firestore, deleteCollectionName, book.id));
    this.addBookCollection(book, addCollectionName);
    return oldBookId;
  }

  receiveStoredTransactionDocuments(collectionName: string, bookId: string, transactionType: TransactionType) {
    return getDocs(collection(this.firestore, collectionName, bookId, transactionType.toLowerCase()).withConverter(this.transactionConverter));
  }

  changeTransactionSaveCollection(storedDocuments: QuerySnapshot<Transaction>, addCollectionName: string, deleteCollectionName: string, 
                                  oldBookId: string, bookId: string, transactionType: TransactionType) {
    storedDocuments.forEach((transaction) => {
      this.addBookTransaction(addCollectionName + "/" + bookId + "/" + transactionType.toLowerCase(), transaction.data());
      deleteDoc(doc(this.firestore, deleteCollectionName + "/" + oldBookId + "/" + transactionType.toLowerCase(), transaction.id));
    });
  }

  addBookTransaction(collectionTitle: string, documentToAdd: Transaction) {
    const transactionDocument = doc(collection(this.firestore, collectionTitle)).withConverter(this.transactionConverter);
    documentToAdd.id = transactionDocument.id;
    setDoc(transactionDocument, documentToAdd);
  }

  //TODO: Maybe use the bookConverter here too, instead of 'as Book'.
  getBooksFromFirestore(collectionTitle: string) {
    return new Observable((Subscriber: Subscriber<Book[]>) => {
      onSnapshot(collection(this.firestore, collectionTitle).withConverter(this.bookConverter), (snapshot) => {
        let books: Book[] = [];
        snapshot.forEach((doc) => {
          let book = doc.data() as Book;
          book['id'] = doc.id;
          books.push(book);
        });
        Subscriber.next(books);
      });
    });
  }

  bookConverter = {
    toFirestore: (book: Book) => {
        return {
            id: book.id,
            title: book.title,
            description: book.description
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let book = new Book();
        book.createBook(data.id, data.title, data.description);
        return book;
    }
  };

  transactionConverter = {
    toFirestore: (transaction: Transaction) => {
    return {
            id: transaction.id,
            description: transaction.description,
            price: transaction.price,
            date: transaction.date,
            categoryId: transaction.categoryId
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let transaction = new Transaction();
        transaction.createTransaction(data.id, data.description, data.price, data.date, data.categoryId);
        return transaction;
    }
  };
}
