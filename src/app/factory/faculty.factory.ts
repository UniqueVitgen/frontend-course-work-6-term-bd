import { Department } from "./department.factory";
import { University } from "./university.factory";

export class Faculty {
    idFaculty?: number;
    name: string;
    shortName: string;
    departments?: Department[];
    university?: University;
}