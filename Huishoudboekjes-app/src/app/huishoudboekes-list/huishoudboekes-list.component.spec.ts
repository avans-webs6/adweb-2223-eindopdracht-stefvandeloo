import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekesListComponent } from './huishoudboekes-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HuishoudboekjesCreateComponent} from "../huishoudboekjes-create/huishoudboekjes-create.component";
import {ReactiveFormsModule} from "@angular/forms";
import {BookService} from "../book.service";
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import {Book} from "../book.model";

describe('HuishoudboekesListComponent', () => {
  let component: HuishoudboekesListComponent;
  let fixture: ComponentFixture<HuishoudboekesListComponent>;
  let mockBookService = jasmine.createSpyObj(BookService, ['getBooks', 'addBook']);
  let mockCreateComponent = MockComponent(HuishoudboekjesCreateComponent);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuishoudboekesListComponent, mockCreateComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      providers: [{ provide: BookService, useValue: mockBookService}],
    }).compileComponents();

    fixture = TestBed.createComponent(HuishoudboekesListComponent);
    component = fixture.componentInstance;

    mockBookService.getBooks.and.returnValue(of([
      new Book("1", 'Book 1', 'Description 1', 'Test1@email.com' ),
      new Book("2", 'Book 2', 'Description 2' )
    ]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of huishoudboekjes', async () => {
    const selector = '.books ul li';
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll(selector).length).toEqual(2);
    expect(compiled.querySelectorAll(selector)[0].textContent).toContain('Book 1');
    expect(compiled.querySelectorAll(selector)[1].textContent).toContain('Book 2');
  });

  it('should display new book when created', async () => {
    const selector = '.books ul li';
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll(selector).length).toEqual(2);
    expect(compiled.querySelectorAll(selector)[2]).toBeFalsy();

    component.books?.push(new Book("3", 'NEW_BOOK', 'Description 3'));
    fixture.detectChanges();

    expect(compiled.querySelectorAll(selector).length).toEqual(3);
    expect(compiled.querySelectorAll(selector)[0].textContent).toContain('Book 1');
    expect(compiled.querySelectorAll(selector)[1].textContent).toContain('Book 2');
    expect(compiled.querySelectorAll(selector)[2].textContent).toContain('NEW_BOOK');
  });
});
