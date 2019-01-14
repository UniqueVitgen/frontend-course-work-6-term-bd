import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalEventsService {
  public showStudentsNavBar: EventEmitter<any> = new EventEmitter();
  public showLectorNavBar: EventEmitter<any> = new EventEmitter();
  public showOrganizerNavBar: EventEmitter<any> = new EventEmitter();
  public showSecretaryNavBar: EventEmitter<any> = new EventEmitter();
  public showAdminNavBar: EventEmitter<any> = new EventEmitter();
  public showUnathoridNavBar: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
