import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {
  @Input() src: string;
  @Input() haveHoverEffect: boolean;

  constructor() { }

  ngOnInit() {
  }

}
