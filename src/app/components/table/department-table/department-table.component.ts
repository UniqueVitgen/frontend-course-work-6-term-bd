import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Department } from '../../../factory/department.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { DepartmentService } from '../../../services/department/department.service';
import { UserWorker } from '../../../workers/UserWorker';
import { DepartmentFormComponent } from '../../forms/department-form/department-form.component';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit {
  @Input() departments: Department[];
  @Input('search') searchValue: string;
  @Output('editDepartment') outputEditDepartment: EventEmitter<Department> = new EventEmitter();
  @Output('deleteDepartment') outputDeleteDepartment: EventEmitter<Department> = new EventEmitter();
  selectedDepartments: Department[];
  bsModalRef: BsModalRef;
  displayedColumns= ['name', 'shortName', 'faculty', 'edit', 'delete'];
  displayedColumnsUser = ['name', 'faculty', 'shortName'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private departmentService: DepartmentService,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
  }
 
  openDepartmentForm(department?: Department) {
    let edit;
    if(department) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      departmentEdit: department,

    };
    let modalOptions = {
      initialState: initialState,
      class:'department-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(DepartmentFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  trackDepartments() {
    this.formEventService.hideDepartmentForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditDepartment.emit(null);
    })
  }

  search(value: string) {
    if(value) {
      value = value.toUpperCase();
      this.selectedDepartments = this.departments.filter((fac) => {
        let targ = fac.name.toUpperCase();
        if(targ.indexOf(value) != -1) {
          return true;
        } 
      });
    }
    else {
      this.selectedDepartments = this.departments;
    }
    console.log('selected', this.selectedDepartments);

  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  // closeModal() {
  //   console.log('inner');
  //   try {
  //     this.modal.close().then(answer => {
  //       console.log('close1 - ', answer);
  //     }).catch(err => {
  //       console.log('close1 err - ', err);
  //     });;
  //     this.modal.dismiss().then(answer => {
  //       console.log('close2 - ', answer);
  //     }).catch(err => {
  //       console.log('close2 err - ', err);
  //     });
  //   }
  //   catch (err) {
  //     console.log('err - ', err);
  //   }
  // }

  deleteDepartment(department) {
    this.departmentService.delete(department).subscribe(answer => {
      this.outputDeleteDepartment.emit(null);
      console.log('answer');
    });
  }

}
