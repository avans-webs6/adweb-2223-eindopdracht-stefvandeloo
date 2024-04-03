import { Injectable } from '@angular/core';
import {Observable, Subscriber, from, map} from 'rxjs';
import { onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, query, where } from "firebase/firestore";
import { Book } from './book.model';
import { TransactionService } from './transaction.service';
import {FirebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  booksCollectionName = "books";
  archivedBooksCollectionName = "archivedBooks";
  constructor(private firebase: FirebaseService, private transactionService: TransactionService) {  }

  getBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.booksCollectionName);
  }

  getArchivedBooks(): Observable<Book[]> {
    return this.getBooksFromFirestore(this.archivedBooksCollectionName);
  }

  getBook(bookId: string): Observable<Book> {
      return from(getDoc(doc(this.firebase.firestore, this.booksCollectionName, bookId).withConverter(this.bookConverter))).pipe(
          map(doc => {
              const book = doc.data() as Book;
              book.id = doc.id;
              return book;
          })
      );
  }

  async addBook(book: Book) {
    await this.addBookCollection(book, this.booksCollectionName);
  }

  async editBook(book: Book) {
    await updateDoc(doc(this.firebase.firestore, this.booksCollectionName, book.id).withConverter(this.bookConverter), this.bookConverter.toFirestore(book));
  }

  async addBookCollection(book: Book, collectionTitle: string) {
    const bookDocument = doc(collection(this.firebase.firestore, collectionTitle)).withConverter(this.bookConverter);
    book.id = bookDocument.id;
    await setDoc(bookDocument, book);
  }

  async archiveBook(book: Book) {
    const oldBookId = await this.toggleArchivationBook(book, this.archivedBooksCollectionName, this.booksCollectionName);
    await this.transactionService.changeTransactionsBookId(oldBookId, book.id);
  }

  async dearchiveBook(book: Book) {
    const oldBookId = await this.toggleArchivationBook(book, this.booksCollectionName, this.archivedBooksCollectionName);
    await this.transactionService.changeTransactionsBookId(oldBookId, book.id);
  }

  async toggleArchivationBook(book: Book, addCollectionName: string, deleteCollectionName: string) {
    const oldBookId = book.id;
    await deleteDoc(doc(this.firebase.firestore, deleteCollectionName, book.id));
    await this.addBookCollection(book, addCollectionName);
    return oldBookId;
  }

  getBooksFromFirestore(collectionTitle: string) {
    return new Observable((Subscriber: Subscriber<Book[]>) => {
      onSnapshot(collection(this.firebase.firestore, collectionTitle), (snapshot) => {
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
