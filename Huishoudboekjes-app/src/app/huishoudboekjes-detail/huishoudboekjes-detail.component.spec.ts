import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail.component';
import { TransactionType } from '../transaction-type.enum';
import {RouterTestingModule} from "@angular/router/testing";
import {DatePipe} from "@angular/common";
import {
    HuishoudboekjesDetailStatisticsComponent
} from "../huishoudboekjes-detail-statistics/huishoudboekjes-detail-statistics.component";
import {
    HuishoudboekjesTransactionsCreateComponent
} from "../huishoudboekjes-transactions-create/huishoudboekjes-transactions-create.component";
import {
    HuishoudboekjesDetailTransactionsComponent
} from "../huishoudboekjes-detail-transactions/huishoudboekjes-detail-transactions.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesDetailComponent', () => {
    let component: HuishoudboekjesDetailComponent;
    let fixture: ComponentFixture<HuishoudboekjesDetailComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HuishoudboekjesDetailComponent,
                HuishoudboekjesDetailTransactionsComponent,
                HuishoudboekjesTransactionsCreateComponent,
                HuishoudboekjesDetailStatisticsComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                FormsModule,
                ReactiveFormsModule,
            ],
            providers: [DatePipe]
        });
        fixture = TestBed.createComponent(HuishoudboekjesDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should open income dialog when transaction type is INCOME', () => {
        spyOn(component.createIncomeDialog, 'showModal');
        component.onCreateDialog(TransactionType.INCOME);
        expect(component.createIncomeDialog.showModal).toHaveBeenCalled();
    });

    it('should open expenses dialog when transaction type is EXPENSES', () => {
        spyOn(component.createExpensesDialog, 'showModal');
        component.onCreateDialog(TransactionType.EXPENSES);
        expect(component.createExpensesDialog.showModal).toHaveBeenCalled();
    });
});
