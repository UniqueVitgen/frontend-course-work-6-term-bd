import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { University } from '../../../factory/university.factory';
import { User } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';
import { Router } from '@angular/router';
import { UserWorker } from '../../../workers/UserWorker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UniversityFormComponent } from '../../forms/university-form/university-form.component';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { UniversityService } from '../../../services/university/university.service';

@Component({
  selector: 'app-university-table',
  templateUrl: './university-table.component.html',
  styleUrls: ['./university-table.component.css']
})
export class UniversityTableComponent implements OnInit {
  @Input() universities: University[];
  @Input('search') searchValue: string;
  @Output('editUniversity') outputEditUniversity: EventEmitter<University> = new EventEmitter();
  @Output('deleteUniversity') outputDeleteUniversity: EventEmitter<University> = new EventEmitter();
  selectedUniversities: University[];
  bsModalRef: BsModalRef;
  displayedColumns= ['name', 'shortName', 'edit', 'delete'];
  displayedColumnsUser = ['name', 'shortName'];
  user: User;
  isAdmin: boolean;

  constructor(private userStorage: UserStorage,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private universityService: UniversityService,
    private userWorker: UserWorker) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.isAdmin = this.userWorker.hasAdminRole(this.user);
  }
  ngOnChanges(): void {
    this.search(this.searchValue);
  }
 
  openUniversityForm(university?: University) {
    let edit;
    if(university) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      universityEdit: university,

    };
    let modalOptions = {
      initialState: initialState,
      class:'university-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(UniversityFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  trackUniversitys() {
    this.formEventService.hideUniversityForm.subscribe(() => {
     //  console.log('hide');
     this.outputEditUniversity.emit(null);
    })
  }

  search(value: string) {
    if(value) {
      value = value.toUpperCase();
      this.selectedUniversities = this.universities.filter((fac) => {
        let targ = fac.name.toUpperCase();
        if(targ.indexOf(value) != -1) {
          return true;
        } 
      });
    }
    else {
      this.selectedUniversities = this.universities;
    }
    console.log('selected', this.selectedUniversities);

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

  deleteUniversity(university) {
    this.universityService.delete(university).subscribe(answer => {
      this.outputDeleteUniversity.emit(null);
      console.log('answer');
    });
  }

}
