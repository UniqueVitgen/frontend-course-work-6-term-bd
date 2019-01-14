import { Component, OnInit } from '@angular/core';
import { DiplomWorkService } from '../../../services/diplom-work/diplom-work.service';
import { UserStorage } from '../../../storage/user/UserStorage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PercentageFormComponent } from '../../../components/forms/percentage-form/percentage-form.component';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { Router } from '@angular/router';


@Component({
  selector: 'app-diplom-work-admin',
  templateUrl: './diplom-work-admin.component.html',
  styleUrls: ['./diplom-work-admin.component.css']
})
export class DiplomWorkAdminComponent implements OnInit {
  user;
  diplomWorks;
  selectedDiplomWorks;
  bsModalRef: BsModalRef;
  displayedColumns= ['name', 'student', 'more']
  search;

  constructor(private diplomWorkService: DiplomWorkService, private userStorage: UserStorage,
    private dateTimeWorker: DateTimeWorker,
    private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    // this.findAllDiplomWorkByLeader();
    // this.findAllDiplomWork();
    // this.findAllDiplomWorkByLector();
    this.getAll();

  }

  formatDate(date) {
    let dateObj = new Date(date);
    this.dateTimeWorker.getDate(dateObj);
  }

  getAll() {
    this.diplomWorkService.getAll().subscribe(res => {
      console.log('res - ', res);
      this.diplomWorks = res;
      this.selectedDiplomWorks = res;
    })
  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedDiplomWorks= this.diplomWorks.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
      if(this.formatFullName(fac.student).toUpperCase().indexOf(value) != -1) {
        return true;
      }
    })
  }

  findAllDiplomWorkByLeader(user?) {
    if(user == null) {user = this.user;}
    this.diplomWorkService.findAllByLeader(user).subscribe(res => {
    })
  }

  
 
  openPercentageForm(percentage?) {
    let edit;
    if(percentage) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      percentageEdit: percentage,

    };
    let modalOptions = {
      initialState: initialState,
      class:'percentage-form',
      ignoreBackdropClick: true
    }
    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  findAllDiplomWork(user?) {
    if(user == null) {user = this.user;}
    this.diplomWorkService.getAll().subscribe(res => {
      console.log('res - ', res);
      this.diplomWorks = res;
    })
  }

  findAllDiplomWorkByLector(user?) {
    if(user == null) {user = this.user;}
    this.diplomWorkService.findAllByLector(user).subscribe(res => {
      console.log('res - ', res);
      this.diplomWorks = res;
    })
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  goToDiplomWork(diplomWork) {
    this.router.navigate(['diplom-work', diplomWork.id]);
  }

}