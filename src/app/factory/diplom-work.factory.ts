import {Student} from './user.factory';
import {Lector} from './lector.factory';
import {Percentage} from './percentage.factory';
import {Status} from './status.factory';

export class DiplomWork {
  name: string;
  comment: string;
  student: Student;
  leader: Lector;
  recensor?: Lector;
  scienceConsultor?: Lector;
  otConsultor?: Lector;
  teoConsultor?: Lector;
  percentages?: Percentage[];
  status?: Status;
}
