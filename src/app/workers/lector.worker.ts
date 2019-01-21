import {Injectable} from '@angular/core';
import {Lector, LectorOrganization, LectorUniversity} from '../factory/lector.factory';

@Injectable({
  providedIn: 'root'
})
export class LectorWorker {
  isLectorUniversity(lector: Lector) {
    return (lector as LectorUniversity).degree != null;
  }
  isLectorOrganization(lector: Lector) {
    return (lector as LectorOrganization).organization != null;
  }
  getPost(lector: Lector) {
    if (this.isLectorUniversity(lector)) {
      return (lector as LectorUniversity).post.name;
    } else if (this.isLectorOrganization(lector)) {
      return (lector as LectorOrganization).postOrganization.name;
    }
  }
}
