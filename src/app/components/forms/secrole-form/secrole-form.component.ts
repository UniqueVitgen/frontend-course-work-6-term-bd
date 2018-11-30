import { Component, OnInit, OnDestroy } from '@angular/core';
import { SECRole } from '../../../factory/sec-roles.factory';
import { FormBuilder, Validators } from '@angular/forms';
import { SECRoleService } from '../../../services/sec-role/secrole.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-secrole-form',
  templateUrl: './secrole-form.component.html',
  styleUrls: ['./secrole-form.component.css']
})
export class SECRoleFormComponent implements OnInit, OnDestroy {
  public secRoleForm;
  public secRole: SECRole = {name: ''};
  public secRoleEdit;
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public secRoleService: SECRoleService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService) { 
    
    this.secRoleForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      comment: ['', Validators.compose([])]
    })
  }

  saveSECRole() {
    this.secRoleService.save(this.secRole).subscribe(answer => {
      console.log('answer from save SECRole - ', answer);
      this.cancel();
    })

  }

  editSECRole(secRole) {
    // console.log('edited - ', this.SECRoleEdit);
    this.createSECRoleEditFromSECRole();
    console.log('edited - ', this.secRoleEdit);
    this.secRoleService.edit(this.secRoleEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideSECRoleForm.emit(true);
    this.bsModalRef.hide();
  }

  createSECRoleFromEditSECRole() {
    for(let property in this.secRole) {
      this.secRole[property] = this.secRoleEdit[property];
    }
  }

  createSECRoleEditFromSECRole() {
    for(let property in this.secRole) {
      this.secRoleEdit[property] = this.secRole[property];
    }
  }

  determineIfEdit() {
    if(this.secRoleEdit) {
      this.createSECRoleFromEditSECRole();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showSECRoleForm.emit(true);
    console.log('on init');
    console.log(this.secRoleEdit);
    this.determineIfEdit();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideSECRoleForm.emit(true);
  }

}
