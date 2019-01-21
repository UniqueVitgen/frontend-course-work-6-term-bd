import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SpecializationService} from '../../../services/specialization/specialization.service';
import {Specialization} from '../../../factory/specialization.factory';
import {Group} from '../../../factory/group.factory';
import {Subscription} from 'rxjs';
import {GroupService} from '../../../services/group/group.service';

@Component({
  selector: 'app-specialization-item',
  templateUrl: './specialization-item.component.html',
  styleUrls: ['./specialization-item.component.css']
})
export class SpecializationItemComponent implements OnInit {
  id: number;
  specialization: Specialization;
  groups: Group[];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private specializationService: SpecializationService) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      // let main = url[0];
      // console.log(main);
        // Defaults to 0 if no query param provided.
        this.id = Number(url[1]) || 0;
        this.getSpecialization(this.id).add(() => {
          this.getGroups(this.specialization);
        });
    });
  }
  getSpecialization(id: number): Subscription {
    return this.specializationService.getById(id).subscribe(resGroup => {
      console.log('resGroup', resGroup);
      this.specialization = resGroup;
      // this.getStudents(this.group);
    });
  }
  getGroups(specialization: Specialization): Subscription {
    return this.groupService.getAllBySpecializationId(specialization.idSpecialization).subscribe(resGroups => {
      this.groups = resGroups;
    });
  }
  saveInPDF() {
    this.specializationService.getPDF(this.specialization).subscribe(res => {
      console.log('res', res);
      let data = new Blob([res], { type: 'application/pdf' });
      let file = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = file;
      link.download = 'Специальность:' + this.specialization.name ;
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

  saveInWord() {
    this.specializationService.getWord(this.specialization).subscribe(res => {
      console.log('res', res);
      const data = new Blob([res], { type: 'application/docx' });
      const file = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = file;
      link.download = 'Специальность:' + this.specialization.name + '.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

}
