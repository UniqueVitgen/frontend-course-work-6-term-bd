import { Component, OnInit } from '@angular/core';
import { LectorService } from '../../../services/lector-service/lector.service';

@Component({
  selector: 'app-lector-staff',
  templateUrl: './lector-staff.component.html',
  styleUrls: ['./lector-staff.component.css']
})
export class LectorStaffComponent implements OnInit {

  lectorStaff: Array<{description: any, src: any, post: any, title: any, degree: any, name: any}>;
  lectors;

  constructor(public lectorService: LectorService) { 
    // this.lectorStaff = [
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподовательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподовательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподовательской деятельностью с прошлого века. ', name:'Куприянов'
    //   },
    //   {
    //     degree:'Доцент', post:'Зам декана', title:'ядерный физик', src:'assets/img/students/lector-staff/team-img.jpg',
    //     description:'Занимается Преподовательской деятельностью с прошлого века. ', name:'Куприянов'
    //   }
    // ];
  }

  getAllLectors() {
    this.lectorService.getLectors().subscribe(lectors => {
      console.log('lectors - ', lectors);
      this.lectors = lectors;
    })  

  }

  formatFullName(user) {
    return user.lastname + ' ' + user.firstname + ' ' + user.middlename;
  }

  ngOnInit() {
    this.getAllLectors();
  }

}
