import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'registry-academics-chart',
  templateUrl: './academics.chart.html',
  styleUrls: ['./academics.chart.scss']
})
export class RegistryAcademicsChart {
  constructor () {}

  public donutChartData = [{
    id: 0,
    label: 'water',
    value: 20,
    color: 'red',
  }, {
    id: 1,
    label: 'land',
    value: 20,
    color: 'blue',
  }, {
    id: 2,
    label: 'sand',
    value: 30,
    color: 'green',
  }, {
    id: 3,
    label: 'grass',
    value: 20,
    color: 'yellow',
  }, {
    id: 4,
    label: 'earth',
    value: 10,
    color: 'pink',
  }];

  public ngOnInit (): void {}

}