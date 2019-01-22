import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DepartmentService} from '../../../services/department/department.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ArrayWorker} from '../../../workers/ArrayWorker';
import {SpecializationService} from '../../../services/specialization/specialization.service';
import {FormEventService} from '../../../services/events/form/form-event.service';
import {SEC} from '../../../factory/sec.factory';
import {Department} from '../../../factory/department.factory';

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.css']
})
export class SelectDepartmentComponent implements OnInit, OnDestroy {
  public secEdit: SEC;
  sub;
  isEdit;
  displayedColumns= ['name', 'shortName', 'faculty', 'selected'];
  public departments: Department[];
  public selectedDepartments: Department[];
  // public targetDepartments: Department[] = [];
  public targetDepartment: Department;
  sec: SEC;
  onSave;

  constructor(public formBuilder: FormBuilder, public departmentService: DepartmentService, public router: Router,
              private route: ActivatedRoute, public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private arrayWorker: ArrayWorker,
              public specializationService: SpecializationService, public formEventService: FormEventService) {

  }

  getAll() {
    this.departmentService.getAll().subscribe(resDepartments => {
      this.departments = resDepartments;
      this.selectedDepartments = resDepartments;
      if (this.secEdit.department) {
        this.targetDepartment = this.secEdit.department;
      } else {
        // this.targetDepartment = [];
      }
    });
    // if (this.sec && this.sec.id) {
    //   this.departmentService.findAllBySecInOrNull([this.sec]).subscribe(departments => {
    //     console.log('departments - ', departments);
    //     this.departments = departments;
    //     this.selectedDepartments = departments;
    //     this.targetDepartments = this.secEdit.departments.slice();
    //   });
    // }
    // else {
    //   this.departmentService.findAllBySecIsNull().subscribe(departments => {
    //     console.log('departments - ', departments);
    //     this.departments = departments;
    //     this.selectedDepartments = departments;
    //     this.targetDepartments = this.secEdit.departments.slice();
    //   })
    // }
  }

  cancel() {
    this.bsModalRef.hide();
  }

  compareSpecializations(c1, c2): boolean {
    if (c1 && c2) {
      return c1 && c2 ? c1.idSpecialization === c2.idSpecialization : c1 === c2;
    }
  }

  createDepartmentFromEditDepartment() {
    for (const property in this.sec) {
      this.sec[property] = this.secEdit[property];
    }
  }

  createDepartmentEditFromDepartment() {
    for (const property in this.sec) {
      this.secEdit[property] = this.sec[property];
    }
  }

  ngOnInit() {
    this.formEventService.showDepartmentForm.emit(true);
    console.log('on init');
    this.secEdit = Object.assign({}, this.sec);
    this.getAll();
  }

  ngOnDestroy(): void {
  }

  selectDepartment(department) {
    // if (!this.arrayWorker.containtsByProperty(this.targetDepartments, department, 'idDepartment')) {
      this.targetDepartment = department;
    // }
    // else {
    //   const index = this.arrayWorker.indexOfByProperty(this.targetDepartments, department, 'idDepartment');
    //   if (index > -1) {
    //     this.targetDepartments.splice(index, 1);
    //   }
    // }
    // if(department.selected) {
    //   this.targetDepartments.push(department);
    // }
    // else {
    //   var index = this.targetDepartments.indexOf(department);
    //   if (index > -1) {
    //     this.targetDepartments.splice(index, 1);
    //   }
    // }
    // console.log(this.targetDepartments);
    console.log(this.sec);
  }

  selectDepartments() {
    // this.sec.departments = this.targetDepartments;
    this.cancel();
    this.onSave(this.targetDepartment);
  }
}
