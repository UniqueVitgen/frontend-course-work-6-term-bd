import {Student} from './user.factory';
import {Lector} from './lector.factory';
import {Percentage} from './percentage.factory';
import {Status} from './status.factory';

export class DiplomWork {
  id?: number;
  name: string;
  comment: string;
  mark: number;
  student: Student;
  leader: Lector;
  recensor?: Lector;
  scienceConsultor?: Lector;
  otConsultor?: Lector;
  teoConsultor?: Lector;
  status?: Status;
}
