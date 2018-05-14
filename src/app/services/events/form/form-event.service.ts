import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FormEventService {
  public showFacultyForm: EventEmitter<any> = new EventEmitter();
  public showSpecializationForm: EventEmitter<any> = new EventEmitter();
  public showGroupForm: EventEmitter<any> = new EventEmitter();
  public hideFacultyForm: EventEmitter<any> = new EventEmitter();
  public hideSpecializationForm: EventEmitter<any> = new EventEmitter();
  public hideGroupForm: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
