import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { ArrayWorker } from '../../../workers/ArrayWorker';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.css']
})
export class SelectGroupComponent implements OnInit {
  public secEdit;
  sub;
  isEdit;
  displayedColumns= ['number', 'specialization', 'amount', 'selected']
  public groups;
  public selectedGroups;
  public targetGroups = [];
  sec;
  onSave;

  constructor(public formBuilder: FormBuilder, public groupService: GroupService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef,
  private modalService: BsModalService, 
  private arrayWorker: ArrayWorker,
  public specializationService: SpecializationService, public formEventService: FormEventService) { 

  }

  getAll() {
    if(this.sec && this.sec.id) {
      this.groupService.findAllBySecInOrNull([this.sec]).subscribe(groups => {
        console.log('groups - ', groups);
        this.groups = groups;
        this.selectedGroups = groups;
        this.targetGroups = this.secEdit.groups.slice();
      })
    }
    else {
      this.groupService.findAllBySecIsNull().subscribe(groups => {
        console.log('groups - ', groups);
        this.groups = groups;
        this.selectedGroups = groups;
        this.targetGroups = this.secEdit.groups.slice();
      })
    }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  compareSpecializations(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idSpecialization === c2.idSpecialization : c1 === c2;
    }
  }  

  createGroupFromEditGroup() {
    for(let property in this.sec) {
      this.sec[property] = this.secEdit[property];
    }
  }

  createGroupEditFromGroup() {
    for(let property in this.sec) {
      this.secEdit[property] = this.sec[property];
    }
  }

  ngOnInit() {
    this.formEventService.showGroupForm.emit(true);
    console.log('on init');
    this.secEdit = Object.assign({}, this.sec);
    this.getAll();
  }

  ngOnDestroy(): void {
  }

  selectGroup(group) {
    if(!this.arrayWorker.containtsByProperty(this.targetGroups, group, 'idGroup')) {
      this.targetGroups.push(group);
    }
    else {
        var index = this.arrayWorker.indexOfByProperty(this.targetGroups, group, 'idGroup');
        if (index > -1) {
          this.targetGroups.splice(index, 1);
        }
    }
    // if(group.selected) {
    //   this.targetGroups.push(group);
    // }
    // else {
    //   var index = this.targetGroups.indexOf(group);
    //   if (index > -1) {
    //     this.targetGroups.splice(index, 1);
    //   }
    // }
    console.log(this.targetGroups);
    console.log(this.sec);
  }

  selectGroups() {
    // this.sec.groups = this.targetGroups;
    this.cancel();
    this.onSave(this.targetGroups);
  }

}
