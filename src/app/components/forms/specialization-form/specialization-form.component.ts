import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SpecializationService } from '../../../services/specialization/specialization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty/faculty.service';
import { FormEventService }  from '../../../services/events/form/form-event.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FacultyFormComponent } from '../faculty-form/faculty-form.component';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { QualificationService } from '../../../services/qualification/qualification.service';
import { QualificationFormComponent } from '../qualification-form/qualification-form.component';

@Component({
  selector: 'app-specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.css']
})
export class SpecializationFormComponent implements OnInit, OnDestroy {
  public specializationForm;
  public specialization = {
    name: '',
    code: '',
    qualification: undefined,
    faculty: undefined
  };
  public specializationEdit;
  faculties;
  qualifications;
  sub;
  isEdit;
  isHidden = false;
  facultyModal: BsModalRef;
  qualificationModal: BsModalRef;
  subscriptions: Subscription[] = [];

  constructor(public formBuilder: FormBuilder, public facultyService:FacultyService, 
    public specializationService: SpecializationService, public router: Router,
    private modalService: BsModalService, private changeDetection: ChangeDetectorRef,
    public formEventService: FormEventService, 
    private qualificationService: QualificationService,
  private route: ActivatedRoute, public bsModalRef: BsModalRef) {
    this.specializationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      code: ['', Validators.compose([Validators.required])],
      qualification: ['', Validators.compose([Validators.required])],
      faculty: ['', Validators.compose([Validators.required])]
    });
  }

  subscribeFacultyForm() {
    this.formEventService.showFacultyForm.subscribe(() => {
      this.isHidden = true;
      // console.log('i see');
    })
    this.formEventService.hideFacultyForm.subscribe(() => {
      this.isHidden = false;
      // console.log('hide form');
      this.getAllFaculties();

    })

  }

  subscribeQualificationForm() {
    this.formEventService.showQualificationForm.subscribe(() => {
      this.isHidden = true;
      // console.log('i see');
    })
    this.formEventService.hideQualificationForm.subscribe(() => {
      this.isHidden = false;
      // console.log('hide form');
      this.getAllQualifications();

    })
  }

  getAllFaculties() {
   this.facultyService.getAll().subscribe(faculties => {
       console.log('facs - ', faculties);
       this.faculties = faculties;
   });

  }

  getAllQualifications() {
    this.qualificationService.getAll().subscribe((qualifications) => {
      this.qualifications = qualifications;
    });
  }

  saveSpecialization() {
    this.specializationService.save(this.specialization).subscribe(answer => {
      console.log('answer from save specialization - ', answer);
      // this.router.navigate(['admin-specialization']);
      this.cancel();
    })

  }

  editSpecialization(specialization) {
    // console.log('edited - ', this.facultyEdit);
    this.createSpecializationEditFromSpecialization();
    console.log('edited - ', this.specializationEdit);
    this.specializationService.edit(this.specializationEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideSpecializationForm.emit(true);
    // this.router.navigate(['admin-specialization']);
    this.bsModalRef.hide();
  }

  createSpecializationFromEditSpecialization() {
    for(let property in this.specialization) {
      this.specialization[property] = this.specializationEdit[property];
    }
  }

  createSpecializationEditFromSpecialization() {
    for(let property in this.specialization) {
      this.specializationEdit[property] = this.specialization[property];
    }
  }
  determineIfEdit() {
    if(this.specializationEdit) {
      this.createSpecializationFromEditSpecialization();
      console.log('edit - ', this.isEdit);
    }
  }

  subscribe() {
    
    const _combine = Observable.combineLatest(
      this.modalService.onShow,
      this.modalService.onShown,
      this.modalService.onHide,
      this.modalService.onHidden
    ).subscribe(() => this.changeDetection.markForCheck());
 
    this.subscriptions.push(
      this.modalService.onShow.subscribe((reason: string) => {
      })
    );
    this.subscriptions.push(
      this.modalService.onShown.subscribe((reason: string) => {
      })
    );
    this.subscriptions.push(
      this.modalService.onHide.subscribe((reason: string) => {
        const _reason = reason ? `, dismissed by ${reason}` : '';
      })
    );
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        const _reason = reason ? `, dismissed by ${reason}` : '';
        this.unsubscribe();
      })
    );
  }
 
  unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }

  
 
  openFacultyForm(faculty?) {
    let edit;
    if(faculty) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      facultyEdit: faculty,

    };
    let modalOptions = {
      initialState: initialState,
      class:'faculty-form',
      ignoreBackdropClick: true

    }
    // this.subscribe();
    this.facultyModal = this.modalService.show(FacultyFormComponent, modalOptions);
    this.facultyModal.content.closeBtnName = 'Close';
  }

  openQualificationForm(qualification?) {
    let edit;
    if(qualification) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      qualificationEdit: qualification,

    };
    let modalOptions = {
      initialState: initialState,
      class:'qualification-form',
      ignoreBackdropClick: true

    }
    // this.subscribe();
    this.qualificationModal = this.modalService.show(QualificationFormComponent, modalOptions);
    this.qualificationModal.content.closeBtnName = 'Close';
  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idFaculty === c2.idFaculty : c1 === c2;
    }
  }  

  ngOnInit() {
    this.formEventService.showSpecializationForm.emit(true);
    this.determineIfEdit();
    this.getAllFaculties();
    this.getAllQualifications();
    this.subscribeFacultyForm();
    this.subscribeQualificationForm();
    console.log('changed - ',this.specialization);
    // this.sub = this.route.params      
    // .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     let id = params['id'];
    //     if(id) {
    //       this.isEdit = true;
    //       this.specializationService.getById(id).subscribe(data => {
    //         console.log('data - ', data);
    //         this.specializationEdit = data;
    //         // console.log('edited - ', this.facultyEdit);
    //         this.createSpecializationFromEditSpecialization();
    //         // console.log('edited - ', this.facultyEdit);
    //       })
    //     }
    //     else {
    //       this.isEdit = false;
    //     }
    //     // console.log(params['id']);
    //   });

  }
  ngOnDestroy(): void {
    this.formEventService.hideSpecializationForm.emit(true);
    console.log('destroy');
  }

}
