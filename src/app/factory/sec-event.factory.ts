import {SEC} from './sec.factory';

export class SECEvent {
    id?: number;
    date: Date | string;
    address: string;
}

export class SECEventForm extends SECEvent{
  sec?: SEC;
}
