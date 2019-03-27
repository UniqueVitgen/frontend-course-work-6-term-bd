import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimeWorker } from './DateTimeWorker';
import { ArrayWorker } from './ArrayWorker';
import { UserWorker } from './UserWorker';

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
