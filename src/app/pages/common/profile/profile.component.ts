import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { query } from '@angular/core/src/animation/dsl';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sub;
  id;
  user;

  constructor(
    private route: ActivatedRoute,private UserService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = + params['id'] || 0;
        this.getUser(this.id);
      })
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user) {
    return user.roles[0].name;
  }

  getUser(id) {
    this.UserService.getById(id).subscribe(res => {
      this.user = res;
      console.log('res user - ', res);
    })
  }

}
