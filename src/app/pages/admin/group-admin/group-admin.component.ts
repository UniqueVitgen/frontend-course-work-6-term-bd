import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { GroupService } from '../../../services/group/group.service';
import { GroupFormComponent } from '../../../components/forms/group-form/group-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-group-admin',
  templateUrl: './group-admin.component.html',
  styleUrls: ['./group-admin.component.css']
})
export class GroupAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public groupForm;
  public groups;
  public selectedGroups;
  displayedColumns= ['number', 'specialization', 'amount', 'edit', 'delete']
  search;

  constructor(public groupService: GroupService,
    private modalService: BsModalService,
    public formEventService: FormEventService, 
    public router: Router,) {
  }

  getAll() {
    this.groupService.getAll().subscribe(groups => {
      console.log('groups - ', groups);
      this.groups = groups;
      this.selectedGroups = groups;
    });

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedGroups = this.groups.filter((fac) => {
      let targ = fac.number.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackGroups() {
    this.formEventService.hideGroupForm.subscribe(() => {
     //  console.log('hide');
       this.getAll();
    })
  }
 
  openGroupForm(group?) {
    let edit;
    if(group) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      groupEdit: group,

    };
    let modalOptions = {
      initialState: initialState,
      class:'group-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(GroupFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  deleteGroup(group) {
    this.groupService.delete(group).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackGroups();
  }

}
