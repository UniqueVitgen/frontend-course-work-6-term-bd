import {Component, Input, OnInit} from '@angular/core';
import {SEC} from '../../../factory/sec.factory';

@Component({
  selector: 'app-secaccordion',
  templateUrl: './secaccordion.component.html',
  styleUrls: ['./secaccordion.component.css']
})
export class SECAccordionComponent implements OnInit {
  @Input() sec: SEC;

  constructor() { }

  ngOnInit() {
  }

}
