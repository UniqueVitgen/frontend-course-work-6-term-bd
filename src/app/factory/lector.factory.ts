import {Student, User} from './user.factory';
import {Title} from './title.factory';
import {Degree} from './degree.factory';
import {Post} from './post.factory';
import {Organization} from './organization.factory';

export class Lector extends User {
  maxCountOfDiplom?: number;
  countOfDiplom: number;
  free: boolean;
}

export class LectorUniversity extends Lector {
  title: Title;
  degree: Degree;
  post: Post;
}

export class LectorOrganization extends Lector {
  organization: Organization;
  postOrganization: Organization;
}
