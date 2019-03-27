import {Component, Input, OnInit} from '@angular/core';
import {SEC} from '../../../../../factory/sec.factory';
import {DateTimeWorker} from '../../../../../workers/DateTimeWorker';

@Component({
  selector: 'app-seccard',
  templateUrl: './seccard.component.html',
  styleUrls: ['./seccard.component.css']
})
export class SECCardComponent implements OnInit {
  @Input() sec: SEC;

  constructor(public dateTimeWorker: DateTimeWorker) { }

  ngOnInit() {
  }

}
