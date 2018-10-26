import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FormEventService {
  public showQualificationForm: EventEmitter<any> = new EventEmitter();
  public showFacultyForm: EventEmitter<any> = new EventEmitter();
  public showSpecializationForm: EventEmitter<any> = new EventEmitter();
  public showGroupForm: EventEmitter<any> = new EventEmitter();
  public hideQualificationForm: EventEmitter<any> = new EventEmitter();
  public hideFacultyForm: EventEmitter<any> = new EventEmitter();
  public hideSpecializationForm: EventEmitter<any> = new EventEmitter();
  public hideGroupForm: EventEmitter<any> = new EventEmitter();
  public hideDiplomWorkForm: EventEmitter<any> = new EventEmitter();
  public hideDegreeForm: EventEmitter<any> = new EventEmitter();
  public hideSECForm: EventEmitter<any> = new EventEmitter();
  public hidePostForm: EventEmitter<any> = new EventEmitter();
  public hideTitleForm: EventEmitter<any> = new EventEmitter();
  public hideSECUserForm: EventEmitter<any> = new EventEmitter(); 

  constructor() { }

}
