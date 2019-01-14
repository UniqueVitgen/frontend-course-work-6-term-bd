import { Component, OnInit } from '@angular/core';
import { Department, DepartmentForm } from '../../../factory/department.factory';
import { FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department/department.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { FacultyService } from '../../../services/faculty/faculty.service';
import { Faculty } from '../../../factory/faculty.factory';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  public departmentForm;
  public department: DepartmentForm = {name: '', shortName: '', faculty: null};
  public departmentEdit;
  sub;
  isEdit;
  faculties: Faculty[];

  constructor(public formBuilder: FormBuilder, 
    public departmentService: DepartmentService, public router: Router,
  private route: ActivatedRoute, 
  public bsModalRef: BsModalRef, 
  public facultyService: FacultyService,
  public formEventService: FormEventService) { 
    
    this.departmentForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([])],
      faculty: ['', Validators.compose([])]
    })
  }

  saveDepartment() {
    this.departmentService.save(this.department).subscribe(answer => {
      console.log('answer from save Department - ', answer);
      this.cancel();
    })

  }

  compareFaculties(c1, c2): boolean {
    if(c1 && c2) {
      return c1 && c2 ? c1.idFaculty === c2.idFaculty : c1 === c2;
    }
  }  

  editDepartment(department) {
    // console.log('edited - ', this.DepartmentEdit);
    this.createDepartmentEditFromDepartment();
    console.log('edited - ', this.departmentEdit);
    this.departmentService.edit(this.departmentEdit).subscribe(answer => {
      console.log(answer);
      this.cancel();
    })
  }

  cancel() {
    this.formEventService.hideDepartmentForm.emit(true);
    this.bsModalRef.hide();
  }

  createDepartmentFromEditDepartment() {
    for(let property in this.department) {
      this.department[property] = this.departmentEdit[property];
    }
  }

  createDepartmentEditFromDepartment() {
    for(let property in this.department) {
      this.departmentEdit[property] = this.department[property];
    }
  }

  determineIfEdit() {
    if(this.departmentEdit) {
      this.createDepartmentFromEditDepartment();
      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    this.formEventService.showDepartmentForm.emit(true);
    console.log('on init');
    console.log(this.departmentEdit);
    this.determineIfEdit();
    this.getAllFaculties();

  }

  getAllFaculties() {
   this.facultyService.getAll().subscribe(faculties => {
       console.log('facs - ', faculties);
       this.faculties = faculties;
   });

  }
  
  ngOnDestroy(): void {
    this.formEventService.hideDepartmentForm.emit(true);
  }

}
