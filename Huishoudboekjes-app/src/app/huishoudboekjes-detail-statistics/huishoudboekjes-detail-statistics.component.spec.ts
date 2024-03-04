import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailStatisticsComponent } from './huishoudboekjes-detail-statistics.component';

describe('HuishoudboekjesDetailStatisticsComponent', () => {
  let component: HuishoudboekjesDetailStatisticsComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailStatisticsComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
