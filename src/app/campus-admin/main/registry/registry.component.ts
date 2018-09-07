import {
  Component,
  OnInit
} from '@angular/core';

@Component({
   selector: 'campus-admin-registry-component',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class CampusAdminRegistryComponent implements OnInit {
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
