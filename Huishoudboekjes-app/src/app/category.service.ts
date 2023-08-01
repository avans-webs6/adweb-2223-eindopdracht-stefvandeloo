import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { initializeApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, getDocs, QuerySnapshot } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  firestore: Firestore;
  categoryCollectionName: string = 'categories';

  constructor() { 
    const app = initializeApp(environment.firebaseConfig); 
    this.firestore = getFirestore(app);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'fakeUser@gmail.com', 'fakeUserPassword').then((response) => {
      console.log(response);
    });
  }

  getCategories(): Observable<Category[]> {
    return new Observable((Subscriber: Subscriber<Category[]>) => {
      onSnapshot(collection(this.firestore, this.categoryCollectionName).withConverter(this.categoryConverter), (snapshot) => {
        let categories: Category[] = [];
        snapshot.forEach((doc) => {
          let category = doc.data() as Category;
          category['id'] = doc.id;
          categories.push(category);
        });
        Subscriber.next(categories);
      });
    });
  }

  addCategory(category: Category) {
    const categoryDocument = doc(collection(this.firestore, this.categoryCollectionName)).withConverter(this.categoryConverter);
    category.id = categoryDocument.id;
    setDoc(categoryDocument, category);
  }

  deleteCategory(categoryId: string) {
    deleteDoc(doc(this.firestore, this.categoryCollectionName, categoryId));
  }

  private categoryConverter = {
    toFirestore: (category: Category) => {
        return {
            id: category.id,
            name: category.name,
            budget: category.budget,
            endDate: new Date(category.endDate)
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);
        let category = new Category();
        category.createCategory(data.id, data.name, data.budget, data.endDate.toDate());
        return category;
    }
  };
}
