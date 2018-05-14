import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormEventService }  from '../../../services/events/form/form-event.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupService } from '../../../services/group/group.service';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { SpecializationFormComponent } from '../specialization-form/specialization-form.component';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit, OnDestroy {
  public groupForm;
  public group = {
    number: '',
    specialization: '',
  };
  public groupEdit;
  sub;
  isEdit;
  isShowSpecialization = false;
  specializations;
  specializationModal: BsModalRef;

  constructor(public formBuilder: FormBuilder, public groupService: GroupService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef,
  private modalService: BsModalService, 
  public specializationService: SpecializationService, public formEventService: FormEventService) { 
    
    this.groupForm = this.formBuilder.group({
      number: ['', Validators.compose([Validators.required])],
      specialization: ['', Validators.compose([Validators.required])]
      
    })
  }

  saveGroup() {
    this.groupService.save(this.group).subscribe(answer => {
      console.log('answer from save group - ', answer);
      this.cancel();
    })

  }

  editGroup(group) {
    this.createGroupEditFromGroup();
    console.log('edited - ', this.groupEdit);
    this.groupService.edit(this.groupEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideGroupForm.emit(true);
    this.bsModalRef.hide();
  }

  getAllSpecializations() {
   this.specializationService.getAll().subscribe(specializations => {
       console.log('facs - ', specializations);
       this.specializations = specializations;
   });

  }

  trackSpecializationForm() {
    this.formEventService.showSpecializationForm.subscribe(() => {
      this.isShowSpecialization = true;
      console.log('i see');
    })
    this.formEventService.hideSpecializationForm.subscribe(() => {
      this.isShowSpecialization = false;
      console.log('hide form');
      this.getAllSpecializations();

    })
  }

  compareSpecializations(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idSpecialization === c2.idSpecialization : c1 === c2;
    }
  }  

  createGroupFromEditGroup() {
    for(let property in this.group) {
      this.group[property] = this.groupEdit[property];
    }
  }
 
  openSpecializationForm(specialization?) {
    let edit;
    if(specialization) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      specializationEdit: specialization,

    };
    let modalOptions = {
      initialState: initialState,
      class:'specialization-form',
      ignoreBackdropClick: true

    }
    this.specializationModal = this.modalService.show(SpecializationFormComponent, modalOptions);
    // this.bsModalRef.content.closeBtnName = 'Close';
  }

  createGroupEditFromGroup() {
    for(let property in this.group) {
      this.groupEdit[property] = this.group[property];
    }
  }

  determineIfEdit() {
    if(this.groupEdit) {
      this.createGroupFromEditGroup();
      console.log('edit - ', this.isEdit);
    }
  }

  subscribeSpecializationForm() {
    this.formEventService.showSpecializationForm.subscribe(() => {
      console.log('i see');
      this.isShowSpecialization = true;
    })
    this.formEventService.hideSpecializationForm.subscribe(() => {
      console.log('hide form');
      this.isShowSpecialization = false;
      this.getAllSpecializations();

    })
  }

  ngOnInit() {
    this.formEventService.showGroupForm.emit(true);
    console.log('on init');
    this.determineIfEdit();
    this.getAllSpecializations();
    this.subscribeSpecializationForm();

  }

  ngOnDestroy(): void {
    this.formEventService.hideGroupForm.emit(true);
  }

}
