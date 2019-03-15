import { SECEvent } from './sec-event.factory';
import { Group } from './group.factory';
import { SECUser } from './user.factory';
import {Specialization} from './specialization.factory';
import {Department} from './department.factory';

export class SEC {
    id?: number;
    number?: number;
    specializations?: Specialization[];
    groups?: Group[];
    department?: Department;
    events?: SECEvent[];
    users?: SECUser[];
    startDate?: Date | string;
    endDate?: Date | string;
}
