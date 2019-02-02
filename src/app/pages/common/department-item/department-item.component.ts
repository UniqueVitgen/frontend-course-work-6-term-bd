import { Component, OnInit } from '@angular/core';
import {Department} from '../../../factory/department.factory';
import {Specialization} from '../../../factory/specialization.factory';
import {ActivatedRoute} from '@angular/router';
import {DepartmentService} from '../../../services/department/department.service';
import {Group} from '../../../factory/group.factory';
import {SpecializationService} from '../../../services/specialization/specialization.service';

@Component({
  selector: 'app-department-item',
  templateUrl: './department-item.component.html',
  styleUrls: ['./department-item.component.css']
})
export class DepartmentItemComponent implements OnInit {
  department: Department;
  id: number;
  specializations: Specialization[];

  constructor(
    private route: ActivatedRoute,
    private specializationService: SpecializationService,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      const main = url[0];
      console.log(main);
      // if (main.path === 'student-group') {
      //   this.group = this.userStorage.getUser().group;
      //   this.getStudents(this.group);
      // } else {
        // Defaults to 0 if no query param provided.
        this.id = Number(url[1]) || 0;
        this.departmentService.getById(this.id).subscribe(resGroup => {
          console.log('resGroup', resGroup);
          this.department = resGroup;
          // this.getStudents(this.group);
          this.getSpecializations(this.department);
        });
      // }
    });
  }

  getSpecializations(department: Department) {
    this.specializationService.getByDepartment(department.id).subscribe(resSpecializations => {
      console.log('resSpecializations', resSpecializations);
      this.specializations = resSpecializations;
    });
  }
  saveInPDF() {
    // this.specializationService.getPDF(this.specialization).subscribe(res => {
    //   console.log('res', res);
    //   let data = new Blob([res], { type: 'application/pdf' });
    //   let file = window.URL.createObjectURL(data);
    //   let link = document.createElement('a');
    //   link.href = file;
    //   link.download = 'Специальность:' + this.specialization.name ;
    //   document.body.appendChild(link);
    //   link.click();
    //   link.parentNode.removeChild(link);
    // });
  }

  saveInWord() {
    this.departmentService.getWord(this.department).subscribe(res => {
      console.log('res', res);
      const data = new Blob([res], { type: 'application/docx' });
      const file = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = file;
      link.download = 'Кафедра:' + this.department.name + '.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }


}
