import { User } from "../factory/user.factory";


export class UserWorker {


    hasStudentRole(user) {
        if (user) {
            for (let role of user.roles) {
                if (role.name == "STUDENT") {
                    return true;
                }
            }
        }
    }



    hasAdminRole(user) {
        if (user) {
            for (let role of user.roles) {
                if (role.name == "ADMIN") {
                    return true;
                }
            }
        }
    }

    hasLectorRole(user) {
        if (user) {
            for (let role of user.roles) {
                if (role.name == "LECTOR") {
                    return true;
                }
            }
        }
    }

    hasOrganizerRole(user) {
        if (user) {
            for (let role of user.roles) {
                if (role.name == "ORGANIZER") {
                    return true;
                }
            }
        }
    }

    hasSecretaryRole(user) {
        if (user) {
            for (let role of user.roles) {
                if (role.name == "SECRETARY_SEC") {
                    return true;
                }
            }
        }
    }

    formatFullName(user: User) {
        return user.lastname + ' ' + user.firstname + ' ' + user.middlename;
    }
}