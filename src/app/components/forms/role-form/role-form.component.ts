import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RoleService } from '../../../services/role/role.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  public roleForm;
  public role = {
    name: '',
    shortName: ''
  };
  public roleEdit;
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public roleService: RoleService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService) { 
    
    this.roleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      
    })
  }

  saveRole() {
    this.roleService.save(this.role).subscribe(answer => {
      console.log('answer from save Role - ', answer);
      this.cancel();
    })

  }

  editRole(role) {
    // console.log('edited - ', this.RoleEdit);
    this.createRoleEditFromRole();
    console.log('edited - ', this.roleEdit);
    this.roleService.edit(this.roleEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideRoleForm.emit(true);
    this.bsModalRef.hide();
  }

  createRoleFromEditRole() {
    for(let property in this.role) {
      this.role[property] = this.roleEdit[property];
    }
  }

  createRoleEditFromRole() {
    for(let property in this.role) {
      this.roleEdit[property] = this.role[property];
    }
  }

  determineIfEdit() {
    if(this.roleEdit) {
      this.createRoleFromEditRole();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showRoleForm.emit(true);
    console.log('on init');
    this.determineIfEdit();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideRoleForm.emit(true);
  }

}
