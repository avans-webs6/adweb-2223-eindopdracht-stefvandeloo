import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {getApp, initializeApp} from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc, deleteField } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  firestore: Firestore;
  categoryCollectionName: string = 'categories';

  constructor() {
    const app = getApp();
    this.firestore = getFirestore(app);
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

  getCategory(categoryId: string): Observable<Category> {
    return new Observable((subscriber: Subscriber<Category>) => {
      getDoc(doc(this.firestore, this.categoryCollectionName, categoryId)).then((doc) => {
        let category = doc.data() as Category ?? {};
        category['id'] = doc.id;
        subscriber.next(category);
      });
    });
  }

  addCategory(category: Category) {
    const categoryDocument = doc(collection(this.firestore, this.categoryCollectionName)).withConverter(this.categoryConverter);
    category.id = categoryDocument.id;
    setDoc(categoryDocument, category);
  }

  editCategory(category: Category) {
    const categoryDocument = doc(this.firestore, this.categoryCollectionName, category.id);
    const categoryData = this.categoryConverter.toFirestore(category);
    updateDoc(categoryDocument, categoryData);
  }

  deleteCategory(categoryId: string) {
    deleteDoc(doc(this.firestore, this.categoryCollectionName, categoryId));
  }

  categoryConverter = {
    toFirestore: (category: Category) => {
      if (category.endDate) {
        return {
          id: category.id,
          name: category.name,
          budget: category.budget,
          endDate: category.endDate
        }
      } else {
        return {
          id: category.id,
          name: category.name,
          budget: category.budget,
          endDate: ""
        }
      }
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);

        let category = new Category();
        category.createCategory(data.id, data.name, data.budget);
        if (data.endDate) {
          category.setEndDate(data.endDate);
        }
        return category;
    }
  };
}
