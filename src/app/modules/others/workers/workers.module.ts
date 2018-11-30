import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { ArrayWorker } from '../../../workers/ArrayWorker';
import { UserWorker } from '../../../workers/UserWorker';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DateTimeWorker,
    ArrayWorker,
    UserWorker
  ],
  declarations: [],
  exports: [
  ]
})
export class WorkersModule { }
