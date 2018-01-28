import {Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener, Input} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {MindMap} from './mind-map/mind-map';

@Component({
  selector: 'app-full-brainstorming-map',
  templateUrl: './full-brainstorming-map.component.html',
  styleUrls: ['./full-brainstorming-map.component.scss']
})
export class FullBrainstormingMapComponent implements OnInit, AfterViewInit {
  @Input('show-input') showInput = true;

  @ViewChild('brainstormingMap') elem: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
  }

  public invokeEvent:Subject<any> = new Subject();

  private map: any;
  mapId: any;
  keyword: string;
  maxCharacters = 85;
  inputImage: any = 'rect';

  constructor() {
    this.mapId = 'brainstorming-map-id-' + Math.floor(Math.random() * (100000)) + 100000;
  }

  ngOnInit() {
    this.invokeEvent.subscribe((value) => {
      switch (value) {
        case 'rect':
          this.inputImage = 'circle';
          break;
        case 'circle':
          this.inputImage = 'hexagon';
          break;
        case 'hexagon':
          this.inputImage = 'triangle';
          break;
        case 'triangle':
          this.inputImage = 'star';
          break;
        case 'star':
          this.inputImage = 'pentagon';
          break;
        case 'pentagon':
          this.inputImage = false;
          break;
      }
    });
  }

  ngAfterViewInit() {
    const demoData = {
      "name": "Topic text",
      "children": [
        {
          "name": "Related node 1",
          "children": [],
          "node_id": 2,
          "closed": false
        },
        {
          "name": "Related node 2",
          "children": [],
          "node_id": 3,
          "closed": false
        }
      ],
      "node_id": 1,
      "closed": false
    };
    const paddings = 20;

    const width = this.elem.nativeElement.offsetWidth - 2 * paddings;
    const height = width * 0.6;

    this.map = new MindMap();

    this.map.setEventObservable(this.invokeEvent);

    this.map.init(this.mapId, width, height, demoData)
  }

  addKeyword() {
    this.map.addNode(this.keyword);
    this.keyword = '';
  }

}
