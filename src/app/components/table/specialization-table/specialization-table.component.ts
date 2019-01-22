import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserWorker} from '../../../workers/UserWorker';
import {Specialization} from '../../../factory/specialization.factory';
import {User} from '../../../factory/user.factory';

@Component({
  selector: 'app-specialization-table',
  templateUrl: './specialization-table.component.html',
  styleUrls: ['./specialization-table.component.css']
})
export class SpecializationTableComponent implements OnInit {
  @Input() specializations: Specialization[];
  @Input() user: User;
  @Output('clickEdit') outputClickEdit: EventEmitter<Specialization> = new EventEmitter<Specialization>();
  @Output('clickDelete') outputClickDelete: EventEmitter<Specialization> = new EventEmitter<Specialization>();
  @Output('clickRow') outputClickRow: EventEmitter<Specialization> = new EventEmitter();
  displayedColumnsAdmin= ['name', 'faculty', 'code', 'qualification', 'edit', 'delete'];
  displayedColumns= ['name', 'faculty', 'code', 'qualification'];

  constructor(
    private userWorker: UserWorker) { }

  ngOnInit() {
  }

}
