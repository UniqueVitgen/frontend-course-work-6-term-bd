import {DiplomWork} from '../factory/diplom-work.factory';
import {User} from '../factory/user.factory';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiplomWorkWorker {
  public isLeader(diplomWork: DiplomWork, user: User) {
    return diplomWork.leader.idPerson === user.idPerson;
  }
}
