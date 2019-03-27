import {Component, Input, OnInit} from '@angular/core';
import {SECEvent} from '../../../factory/sec-event.factory';

@Component({
  selector: 'app-secevent-table',
  templateUrl: './secevent-table.component.html',
  styleUrls: ['./secevent-table.component.css']
})
export class SECEventTableComponent implements OnInit {
  @Input()
  public secEvents: SECEvent[];

  public displayedColumnsEvent = ['date', 'time', 'address', 'groups', 'edit', 'delete'];

  constructor() {
  }

  ngOnInit() {
  }

}
