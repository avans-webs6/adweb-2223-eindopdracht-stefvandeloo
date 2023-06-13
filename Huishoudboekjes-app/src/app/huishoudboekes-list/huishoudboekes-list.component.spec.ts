import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekesListComponent } from './huishoudboekes-list.component';

describe('HuishoudboekesListComponent', () => {
  let component: HuishoudboekesListComponent;
  let fixture: ComponentFixture<HuishoudboekesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekesListComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
