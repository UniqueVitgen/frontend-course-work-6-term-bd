import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FacultyService } from '../../../services/faculty/faculty.service';
import { FormEventService }  from '../../../services/events/form/form-event.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UniversityService } from '../../../services/university/university.service';
import { University } from '../../../factory/university.factory';
import { Faculty } from '../../../factory/faculty.factory';

@Component({
  selector: 'app-faculty-form',
  templateUrl: './faculty-form.component.html',
  styleUrls: ['./faculty-form.component.css']
})
export class FacultyFormComponent implements OnInit, OnDestroy {
  public facultyForm;
  public faculty: Faculty = {
    name: '',
    shortName: '',
    university: null
  };
  public facultyEdit;
  public universities: University[];
  sub;
  isEdit;

  constructor(public formBuilder: FormBuilder, public facultyService: FacultyService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService,
  private universityService: UniversityService) { 
    
    this.facultyForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([Validators.required])],
      university: ['', Validators.compose([Validators.required])]
      
    })
  }

  saveFaculty() {
    this.facultyService.save(this.faculty).subscribe(answer => {
      console.log('answer from save faculty - ', answer);
      this.cancel();
    })

  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idFaculty === c2.idFaculty : c1 === c2;
    }
  } 

  editFaculty(faculty) {
    // console.log('edited - ', this.facultyEdit);
    this.createFacultyEditFromFaculty();
    console.log('edited - ', this.facultyEdit);
    this.facultyService.edit(this.facultyEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideFacultyForm.emit(true);
    // this.router.navigate(['admin-faculty']);
    this.bsModalRef.hide();
  }

  createFacultyFromEditFaculty() {
    for(let property in this.faculty) {
      this.faculty[property] = this.facultyEdit[property];
    }
  }

  createFacultyEditFromFaculty() {
    for(let property in this.faculty) {
      this.facultyEdit[property] = this.faculty[property];
    }
  }
  getAllUniversities() {
    this.universityService.getAll().subscribe((universities) => {
      this.universities = universities;
    });
  }

  determineIfEdit() {
    if(this.facultyEdit) {
      this.createFacultyFromEditFaculty();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showFacultyForm.emit(true);
    console.log('on init');
    this.determineIfEdit();
    this.getAllUniversities();

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideFacultyForm.emit(true);
  }

}
