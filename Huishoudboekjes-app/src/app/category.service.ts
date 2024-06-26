import { Injectable } from '@angular/core';
import {from, map, Observable, Subscriber} from 'rxjs';
import { onSnapshot, collection, updateDoc, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { Category } from './category.model';
import {FirebaseService} from "./firebase.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryCollectionName: string = 'categories';

  constructor(private firebase: FirebaseService) {  }

  getCategories(): Observable<Category[]> {
    return new Observable((Subscriber: Subscriber<Category[]>) => {
      onSnapshot(collection(this.firebase.firestore, this.categoryCollectionName).withConverter(this.categoryConverter), (snapshot) => {
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
    return from(getDoc(doc(this.firebase.firestore, this.categoryCollectionName, categoryId))).pipe(
        map(doc => {
            let category = doc.data() as Category;
            category.id = doc.id;
            return category;
        })
      );
  }

  async addCategory(category: Category) {
    const categoryDocument = doc(collection(this.firebase.firestore, this.categoryCollectionName)).withConverter(this.categoryConverter);
    category.id = categoryDocument.id;
    await setDoc(categoryDocument, category);
  }

  async editCategory(category: Category) {
    const categoryDocument = doc(this.firebase.firestore, this.categoryCollectionName, category.id);
    const categoryData = this.categoryConverter.toFirestore(category);
    await updateDoc(categoryDocument, categoryData);
  }

  async deleteCategory(categoryId: string) {
    await deleteDoc(doc(this.firebase.firestore, this.categoryCollectionName, categoryId));
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

        let category = new Category(data.id, data.name, data.budget, data.endDate ?? "");
        return category;
    }
  };
}
