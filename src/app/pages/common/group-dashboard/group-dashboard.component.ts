import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group/group.service';
import { Group } from '../../../factory/group.factory';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.css']
})
export class GroupDashboardComponent implements OnInit {
  groups: Group[];
  selectedGroups: Group[];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.groupService.getAll().subscribe(groups => {
      console.log('groups - ', groups);
      this.groups = groups;
      this.selectedGroups = groups;
    });

  }


}
