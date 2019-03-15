import { Group } from './group.factory';
import {ImageModel} from './image-model.factory';
import {Role} from './role.factory';

export class Person {
    firstname: string;
    lastname: string;
    middlename: string;
    firstnameInitial?: string;
    lastnameInitial?: string;
}

export class User extends Person {
    idPerson: number;
    username: string;
    password: string;
    roles: Role[];
    imageModel: ImageModel;
}

export class UserUploadForm {
  user: User;
  filename: string;
}

export class Student extends User {
    group?: Group;
}

export class SECUserBase extends Person {
    id?: number;
    user: User;
}

export class SECUserForm extends SECUserBase {
    role?: SECRole;
}

export class SECUser extends SECUserBase {
    roles?: SECRole[];

    static assign(secUser: SECUser, secUserForm: SECUserForm) {
        for (const prop in secUserForm) {
            if (prop == 'role') {
                secUser.roles = [secUserForm.role];
            }
            else {
                secUser[prop] = secUserForm[prop];
            }
        }
    }

    static assignToForm(secUserForm: SECUserForm, secUser: SECUser) {
        for (const prop in secUser) {
            if (prop == 'roles') {
                secUserForm.role = secUser.roles[0];
            } else {
                secUserForm[prop] = secUser[prop];
            }
        }

    }
}

export class SECRole {
  id: number;
  name: string;
}
