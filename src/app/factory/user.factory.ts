export class Person {
    firstname: string;
    lastname: string;
    middlename: string;
}

export class User extends Person {
    idPerson: number;
    username: string;
    password: string;
    roles: string;
}

export class SECUserBase extends Person {
    id?: number;
}

export class SECUserForm extends SECUserBase {
    role?;
}

export class SECUser extends SECUserBase {
    roles?;

    static assign(secUser: SECUser, secUserForm: SECUserForm) {
        for(let prop in secUserForm) {
            if(prop == 'role') {
                secUser.roles = [secUserForm.role];
            }
            else {
                secUser[prop] = secUserForm[prop];
            }
        }
    }

    static assignToForm(secUserForm: SECUserForm, secUser: SECUser) {
        for(let prop in secUser) {
            if(prop == 'roles') {
                secUserForm.role = secUser.roles[0];
            }
            else {
                secUserForm[prop] = secUser[prop];
            }
        }

    }
}