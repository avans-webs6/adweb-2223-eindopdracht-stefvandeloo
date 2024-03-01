import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { TransactionService } from './transaction.service';
import firebase from "firebase/compat";
import { getApp } from "firebase/app";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  firestore: Firestore;
  booksCollectionName = "books";
  transactionsCollectionName = "transactions";
  archivedBooksCollectionName = "archivedBooks";
  incomeCollectionName = "income";

  constructor(private transactionService: TransactionService) {
    const app = getApp();
    this.firestore = getFirestore(app);
    const auth = getAuth(app);

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User logged in with email: ", user.email);
      } else {
        console.log("No user logged in");
      }
    });
  }

  getBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.booksCollectionName);
  }

  getArchivedBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.archivedBooksCollectionName);
  }

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

  addBookCollection(book: Book, collectionTitle: string) {
    const bookDocument = doc(collection(this.firestore, collectionTitle)).withConverter(this.bookConverter);
    book.id = bookDocument.id;
    setDoc(bookDocument, book);
  }

  async archiveBook(book: Book) {
    const oldBookId = this.toggleArchivationBook(book, this.archivedBooksCollectionName, this.booksCollectionName);
    await this.changeTransactionsBookId(oldBookId, book.id);
  }

  async dearchiveBook(book: Book) {
    const oldBookId = this.toggleArchivationBook(book, this.booksCollectionName, this.archivedBooksCollectionName);
    await this.changeTransactionsBookId(oldBookId, book.id);
  }

  toggleArchivationBook(book: Book, addCollectionName: string, deleteCollectionName: string) {
    const oldBookId = book.id;
    deleteDoc(doc(this.firestore, deleteCollectionName, book.id));
    this.addBookCollection(book, addCollectionName);
    return oldBookId;
  }

  async changeTransactionsBookId(oldBookId: string, newBookId: string) {
    const transactionQuery = query(collection(this.firestore, this.transactionsCollectionName), where("bookId", "==", oldBookId));
    let transactions = await getDocs(transactionQuery.withConverter(this.transactionService.transactionConverter));
    transactions.forEach((transaction) => {
      updateDoc(doc(this.firestore, this.transactionsCollectionName, transaction.data().id), { bookId: newBookId });
    });
  }

  getBooksFromFirestore(collectionTitle: string) {
    return new Observable((Subscriber: Subscriber<Book[]>) => {
      onSnapshot(collection(this.firestore, collectionTitle), (snapshot) => {
        let books: Book[] = [];
        snapshot.forEach((doc) => {
          let book = doc.data();
          book['id'] = doc.id;
          books.push(book as Book);
        });
        Subscriber.next(books);
      });
    });
  }

  private bookConverter = {
    toFirestore: (book: Book) => {
        return {
            id: book.id,
            title: book.title,
            description: book.description,
            userEmail: book.userEmail
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let book = new Book(data.userEmail);
        book.createBook(data.id, data.title, data.description);
        return book;
    }
  };
}
