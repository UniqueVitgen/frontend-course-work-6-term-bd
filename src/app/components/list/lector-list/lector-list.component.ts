import {Component, Input, OnInit} from '@angular/core';
import {FileWorker} from '../../../workers/file.worker';
import {UserWorker} from '../../../workers/UserWorker';
import {Lector} from '../../../factory/lector.factory';
import {DiplomWork} from '../../../factory/diplom-work.factory';

@Component({
  selector: 'app-lector-list',
  templateUrl: './lector-list.component.html',
  styleUrls: ['./lector-list.component.css']
})
export class LectorListComponent implements OnInit {
  @Input() lectors: Lector[];
  @Input() diplomWork: DiplomWork;

  constructor(public fileWorker: FileWorker, public userWorker: UserWorker) { }

  ngOnInit() {
  }

}
