import { User } from '../factory/user.factory';
import {LectorOrganization, LectorUniversity} from '../factory/lector.factory';


export class UserWorker {


    hasStudentRole(user) {
        if (user) {
            for (const role of user.roles) {
                if (role.name == 'STUDENT') {
                    return true;
                }
            }
        }
    }



    hasAdminRole(user) {
        if (user) {
            for (const role of user.roles) {
                if (role.name == 'ADMIN') {
                    return true;
                }
            }
        }
    }

    hasLectorRole(user) {
        if (user) {
            for (const role of user.roles) {
                if (role.name == 'LECTOR') {
                    return true;
                }
            }
        }
    }

    hasOrganizerRole(user) {
        if (user) {
            for (const role of user.roles) {
                if (role.name == 'ORGANIZER') {
                    return true;
                }
            }
        }
    }

    hasSecretaryRole(user) {
        if (user) {
            for (const role of user.roles) {
                if (role.name == 'SECRETARY_SEC') {
                    return true;
                }
            }
        }
    }

    formatFullName(user: User) {
      if (user) {
        return user.lastname + ' ' + user.firstname + ' ' + user.middlename;
      }
    }

  formatUserRole(user: User) {
      if (user.roles.length > 0) {
        if (user.roles.length > 2) {
          if (this.hasLectorRole(user)) {
            return 'LECTOR';
          } else {
            return user.roles[0].name;
          }
        } else {
          return user.roles[0].name;
        }
      }
  }

  isLectorUniversity(user: User) {
      return user instanceof LectorUniversity;
  }
  isLectorOrganization(user: User) {
    return (user as LectorOrganization).postOrganization;
  }
}
