import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../services/department/department.service';
import { Department } from '../../../factory/department.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { DepartmentFormComponent } from '../../../components/forms/department-form/department-form.component';

@Component({
  selector: 'app-department-admin',
  templateUrl: './department-admin.component.html',
  styleUrls: ['./department-admin.component.css']
})
export class DepartmentAdminComponent implements OnInit {
  departments: Department[];
  searchValue: string;
  bsModalRef: BsModalRef;

  constructor(private departmentService: DepartmentService,
    private formEventService: FormEventService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getDepartments();
    this.trackDepartments();
  }

  getDepartments() {
    this.departmentService.getAll().subscribe(resDepartments => {
      this.departments = resDepartments;
    });
  }

  openDepartmentForm(department?: Department) {
    let edit;
    if (department) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      departmentEdit: department,

    };
    const modalOptions = {
      initialState: initialState,
      class: 'department-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(DepartmentFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  changeInput(value: string) {
    this.searchValue = value;
  }

  editDepartment(department: Department) {
    if (department) {
      this.departmentService.edit(department).subscribe(res => {
        // this.getDepartments();
      });
    } else {
      this.getDepartments();
    }
  }

  trackDepartments() {
    this.formEventService.hideDepartmentForm.subscribe(() => {
     //  console.log('hide');
     this.getDepartments();
    });
  }
}
