import { Component, OnInit } from '@angular/core';

import { RoleService } from '../../../services/role/role.service';
import { UserService } from '../../../services/user-service/user.service';
import { LectorService } from '../../../services/lector-service/lector.service';
import { TitleService } from '../../../services/title/title.service';
import { PostService } from '../../../services/post/post.service';
import { DegreeService } from '../../../services/degree/degree.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    public lectorService: LectorService,
    public roleService: RoleService,
    public titleService: TitleService,
    public degreeService: DegreeService,
    public postService: PostService,
    public userService: UserService) { 

  }

  ngOnInit() {
  }

}
