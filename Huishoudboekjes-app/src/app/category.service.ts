import { Injectable } from '@angular/core';
import {from, map, Observable, Subscriber} from 'rxjs';
import { getApp } from "firebase/app";
import { Firestore , getFirestore, onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
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
          category.id = doc.id;
          categories.push(category);
        });
        Subscriber.next(categories);
      });
    });
  }

  getCategory(categoryId: string): Observable<Category> {
    return from(getDoc(doc(this.firestore, this.categoryCollectionName, categoryId))).pipe(
        map(doc => {
            let category = doc.data() as Category;
            category.id = doc.id;
            return category;
        })
      );
  }

  async addCategory(category: Category) {
    const categoryDocument = doc(collection(this.firestore, this.categoryCollectionName)).withConverter(this.categoryConverter);
    category.id = categoryDocument.id;
    await setDoc(categoryDocument, category);
  }

  async editCategory(category: Category) {
    const categoryDocument = doc(this.firestore, this.categoryCollectionName, category.id);
    const categoryData = this.categoryConverter.toFirestore(category);
    await updateDoc(categoryDocument, categoryData);
  }

  async deleteCategory(categoryId: string) {
    await deleteDoc(doc(this.firestore, this.categoryCollectionName, categoryId));
  }

  categoryConverter = {
    toFirestore: (category: Category) => {
        console.log(category.endDate)
        return {
          id: category.id,
          name: category.name,
          budget: category.budget,
          endDate: category.endDate
        };
    },
    fromFirestore: (snapshot: { data: (arg0: any) => any; }, options: any) => {
        const data = snapshot.data(options);

        let category = new Category();
        category.createCategory(data.id, data.name, data.budget);
        category.setEndDate(data.endDate ?? "");
        return category;
    }
  };
}
