import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-huishoudboekjes-detail-statistics',
  templateUrl: './huishoudboekjes-detail-statistics.component.html',
  styleUrls: ['./huishoudboekjes-detail-statistics.component.css']
})
export class HuishoudboekjesDetailStatisticsComponent {
  @Input()
  balance: string = "";

  constructor() {
  }

  formatNumber(number: string) {
    if (number.endsWith(".00")) return number.replace(".00", ",-");
    return number;
  }
}
