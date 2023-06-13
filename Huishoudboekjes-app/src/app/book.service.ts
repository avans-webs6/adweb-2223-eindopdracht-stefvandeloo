import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  firestore: Firestore;
  booksCollectionName = "books";
  archivedBooksCollectionName = "archivedBooks";

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
  getBook(book: Book): Observable<Book> {
    return new Observable((subscriber: Subscriber<Book>) => {
      getDoc(doc(this.firestore, this.booksCollectionName, book.id)).then((doc) => {
        let book = doc.data() as Book ?? {};
        book['id'] = doc.id;
        subscriber.next(book);
      });
    });
  }

  addBook(book: Book) {
    const bookDocument = this.addBookTemplate(book, this.booksCollectionName).withConverter(this.bookConverter);
    setDoc(bookDocument, book);
  }

  archiveBook(book: Book) {
    deleteDoc(doc(this.firestore, this.booksCollectionName, book.id));
    const bookDocument = this.addBookTemplate(book, this.archivedBooksCollectionName).withConverter(this.bookConverter);
    setDoc(bookDocument, book);
  }

  dearchiveBook(book: Book) {
    deleteDoc(doc(this.firestore, this.archivedBooksCollectionName, book.id));
    const bookDocument = this.addBookTemplate(book, this.booksCollectionName).withConverter(this.bookConverter);
    setDoc(bookDocument, book);
  }

  editBook(book: Book) {
    updateDoc(doc(this.firestore, this.booksCollectionName, book.id).withConverter(this.bookConverter), book);
  }



  addBookTemplate(book: Book, collectionTitle: string) {
    const bookDocument = doc(collection(this.firestore, collectionTitle));
    book.id = bookDocument.id;
    return bookDocument;
  }

  //TODO: Maybe use the bookConverter here too, instead of 'as Book'.
  getBooksFromFirestore(collectionTitle: string) {
    return new Observable((Subscriber: Subscriber<Book[]>) => {
      onSnapshot(collection(this.firestore, collectionTitle), (snapshot) => {
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
    toFirestore: (book: { id: string; title: string; description: string; }) => {
        return {
            id: book.id,
            title: book.title,
            description: book.description
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        return new Book(data.id, data.title, data.description);
    }
};
}
