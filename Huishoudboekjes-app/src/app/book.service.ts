import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Book } from './book.model';
import { TransactionService } from './transaction.service';

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

  private bookConverter = {
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
}
