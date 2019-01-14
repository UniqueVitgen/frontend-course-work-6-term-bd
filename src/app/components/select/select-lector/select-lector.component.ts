import { Component, OnInit, OnDestroy } from '@angular/core';
import { LectorService } from '../../../services/lector-service/lector.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-select-lector',
  templateUrl: './select-lector.component.html',
  styleUrls: ['./select-lector.component.css']
})
export class SelectLectorComponent implements OnInit, OnDestroy {

  lectorStaff: Array<{description: any, src: any, post: any, title: any, degree: any, name: any}>;
  lectors;
  // lector;
  onDestroy;
  selectedLector;
  isOk;

  constructor(public lectorService: LectorService, public bsModalRef: BsModalRef,) { 
    // this.lectorStaff = [
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподавательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподавательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподавательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподавательской деятельностью с прошлого века. ', name:'Куприянов'
    //   }
    // ];
  }

  getAllLectors(onSuccess?) {
    this.lectorService.getLectors().subscribe(lectors => {
      this.lectors = lectors;
      console.log('lectors - ', lectors);
      if(onSuccess) {
        onSuccess(lectors);
      }
      // this.lectors = this.lectors.map(lector => {
      //   lector.selected = false;
      // })
    })  

  }

  initializeSelecteLector() {
    if(this.selectedLector == null) {
      this.selectedLector = this.lectors[0];
    }
  }

  selectLector(lector?) {
    this.selectedLector = lector;
    console.log('select');
  }

  cancel() {
    // this.router.navigate(['admin-faculty']);
    this.bsModalRef.hide();
  }

  ok() {
    this.isOk = true;
    this.cancel();
  }

  formatFullName(user) {
    return user.lastname + ' ' + user.firstname + ' ' + user.middlename;
  }

  ngOnInit() {
    this.getAllLectors(() => {
      this.initializeSelecteLector();
    });
  }

  ngOnDestroy(): void {
    if(this.onDestroy) {
      // console.log('enter');
      if(this.isOk) {
        this.onDestroy(this.selectedLector);
      }

    }
    else {
      // console.log('leave');

    }
  }

}
