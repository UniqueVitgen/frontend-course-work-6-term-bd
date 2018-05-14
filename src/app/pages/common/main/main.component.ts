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
    this.lectorService.getLectors().subscribe(data => {
      console.log(data);
    })
    this.userService.getUsers().subscribe(data => {
      console.log(data);
    })
    this.roleService.getRoles().subscribe(data => {
      console.log(data);
    }, err => {
      console.log('err - ', err);
    })
    this.titleService.getByName('Доцент').subscribe(data => {
      console.log('title', data);
    })
    this.degreeService.getByName('Кандидат наук').subscribe(data => {
      console.log('title', data);
    })
    this.postService.getByName('Доцент').subscribe(data => {
      console.log('title', data);
    })
    console.log('main controller');

  }

  ngOnInit() {
  }

}
