import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Department } from '../../../factory/department.factory';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { DepartmentService } from '../../../services/department/department.service';
import { UserWorker } from '../../../workers/UserWorker';
import { DepartmentFormComponent } from '../../forms/department-form/department-form.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit, OnChanges {
  @Input() departments: Department[];
  @Input('search') searchValue: string;
  @Output('editDepartment') outputEditDepartment: EventEmitter<Department> = new EventEmitter();
  @Output('deleteDepartment') outputDeleteDepartment: EventEmitter<Department> = new EventEmitter();
  selectedDepartments: Department[];
  bsModalRef: BsModalRef;
  displayedColumnsAdmin = [ 'change'];
  displayedColumnsMore = [ 'more'];
  displayedColumnsCommon = ['name', 'shortName', 'faculty'];
  displayedColumnsOrganization = ['disableChange'];
  targetDisplayedColumns: Array<string> = [];
  displayedColumnsUser = ['name', 'faculty', 'shortName', 'disableChange', 'more'];
  private isCanModifyLikeOrganizer: boolean;
  private isCanModifyLikeAdmin: boolean;
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private departmentService: DepartmentService,
    private router: Router,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
    this.isCanModifyLikeOrganizer = this.userWorker.hasOrganizerRole(this.user) || this.userWorker.hasAdminRole(this.user);
    this.isCanModifyLikeAdmin = this.userWorker.hasOrganizerRole(this.user) || this.userWorker.hasAdminRole(this.user);
    this.targetDisplayedColumns = [];
    this.targetDisplayedColumns = this.targetDisplayedColumns.concat(this.displayedColumnsCommon);
    if (this.isCanModifyLikeOrganizer) {
      this.targetDisplayedColumns = this.targetDisplayedColumns.concat(this.displayedColumnsOrganization);
    }
    this.targetDisplayedColumns = this.targetDisplayedColumns.concat(this.displayedColumnsMore);
    if (this.isCanModifyLikeOrganizer) {
      this.targetDisplayedColumns = this.targetDisplayedColumns.concat(this.displayedColumnsAdmin);
    }
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
  }

  openDepartmentForm(department?: Department) {
    let edit;
    if (department) {
      edit = true;
    } else {
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

  trackDepartments() {
    this.formEventService.hideDepartmentForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditDepartment.emit(null);
    });
  }

  search(value: string) {
    if (value) {
      value = value.toUpperCase();
      this.selectedDepartments = this.departments.filter((fac) => {
        const targ = fac.name.toUpperCase();
        if (targ.indexOf(value) != -1) {
          return true;
        }
      });
    } else {
      this.selectedDepartments = this.departments;
    }
    console.log('selected', this.selectedDepartments);

  }
  navigateToDepartmentItem(department: Department) {
    this.router.navigate(['department', department.id]);
  }
  changeDepartment(department: Department) {
    this.outputEditDepartment.emit(department);
  }

  deleteDepartment(department) {
    this.departmentService.delete(department).subscribe(answer => {
      this.outputDeleteDepartment.emit(null);
      console.log('answer');
    });
  }

}
