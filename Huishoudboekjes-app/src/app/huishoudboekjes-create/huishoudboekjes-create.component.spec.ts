import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCreateComponent } from './huishoudboekjes-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Book} from "../book.model";
import {BookService} from "../book.service";

describe('HuishoudboekjesCreateComponent', () => {
  let component: HuishoudboekjesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesCreateComponent>;
  let mockBookService = jasmine.createSpyObj(BookService, ['getBooks', 'addBook']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: mockBookService}],
    });
    fixture = TestBed.createComponent(HuishoudboekjesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create book', () => {
    component.book = new Book("", "", "", "test@email.com");
    component.createBookForm.setValue({title: 'New Book', description: 'New Description'});
    component.onSave();

    expect(component.book).toBeTruthy();
    expect(component.book.title).toContain('New Book');
    expect(component.book.description).toContain('New Description');
    expect(component.book.userEmail).toContain('test@email.com');
    expect(mockBookService.addBook).toHaveBeenCalledWith(component.book);
  });

  it('should not create book with empty title', () => {
    component.book = new Book("", "", "", "test@email.com");
    component.createBookForm.setValue({title: '', description: 'New Description'});
    component.onSave();

    expect(component.book).toBeTruthy();
    expect(component.book.title).toBeFalsy();
    expect(component.book.description).toBeFalsy();
    expect(mockBookService.addBook).not.toHaveBeenCalledWith(component.book);
  });
});
