import {Department} from './department.factory';
import {Qualification} from './qualification.factory';

export class Specialization {
    idSpecialization: number;
    name: string;
    department?: Department;
    qualification: Qualification;
    code: string;
}
