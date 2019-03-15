import {SEC} from './sec.factory';
import {Group} from './group.factory';
import {Student} from './user.factory';

export class SECEvent {
    id?: number;
    groups?: Group[];
    date: Date | string;
    endDate: Date | string;
    address: string;
    students?: Student[];
}

export class SECEventForm extends SECEvent{
  sec?: SEC;
}
