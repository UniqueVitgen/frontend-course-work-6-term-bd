import { Specialization } from "./specialization.factory";
import { Faculty } from "./faculty.factory";

export class Department {
    id?: number;
    name: string;
    shortName: string;
    faculty: Faculty;
    disabledEditSec?: boolean;
    // specializations?: Specialization[];
}

export class DepartmentForm extends Department {
    // faculty: Faculty;
}
