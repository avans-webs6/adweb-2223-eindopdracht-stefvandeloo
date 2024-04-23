import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesEditComponent } from './huishoudboekjes-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Book} from "../book.model";
import {BookService} from "../book.service";
import firebase from "firebase/compat";

describe('HuishoudboekjesEditComponent', () => {
  let component: HuishoudboekjesEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesEditComponent>;
  let mockBookService = jasmine.createSpyObj(BookService, ['editBook']);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesEditComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: mockBookService }],
    });
    fixture = TestBed.createComponent(HuishoudboekjesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit book', () => {
    component.book = new Book("1", "Book 1", "Description 1", "test@email.com");
    component.editBookForm.setValue({title: 'New Book', description: 'New Description'});
    component.onSave();

    expect(component.book).toBeTruthy();
    expect(component.book.title).toContain('New Book');
    expect(component.book.title).not.toContain('Book 1');
    expect(component.book.description).toContain('New Description');
    expect(component.book.userEmail).toContain('test@email.com');
    expect(mockBookService.editBook).toHaveBeenCalledWith(component.book);
  });

  it('should not edit book with empty title', () => {
    component.book = new Book("", "", "", "test@email.com");
    component.editBookForm.setValue({title: '', description: 'New Description'});
    component.onSave();

    expect(component.book).toBeTruthy();
    expect(component.book.title).toBeFalsy();
    expect(component.book.description).toBeFalsy();
    expect(mockBookService.editBook).not.toHaveBeenCalledWith(component.book);
  });
});
