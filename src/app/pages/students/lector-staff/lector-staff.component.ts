import { Component, OnInit, Input } from '@angular/core';
import { LectorService } from '../../../services/lector-service/lector.service';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {FileWorker} from '../../../workers/file.worker';
import {Lector} from '../../../factory/lector.factory';

@Component({
  selector: 'app-lector-staff',
  templateUrl: './lector-staff.component.html',
  styleUrls: ['./lector-staff.component.css']
})
export class LectorStaffComponent implements OnInit {

  // lectorStaff: Array<{description: any, src: any, post: any, title: any, degree: any, name: any}>;
  lectors: Lector[];
  @Input() diplomWork: DiplomWork;
  @Input() isChild = false;
  properties = {
    'leader': 'Руководитель проекта',
    'scienceConsultor': 'Научный консультант',
    'recensor': 'Рецензент',
    'otConsultor': 'Консультант по организационно-технической части',
    'teoConsultor': 'Консультант по техническо-экономическому обоснованию'
  };


  constructor(public lectorService: LectorService, public fileWorker: FileWorker) {
  }

  getAllLectors() {
    this.lectorService.getLectors().subscribe(lectors => {
      console.log('lectors - ', lectors);
      this.lectors = lectors;
    });

  }

  formatRole(lector) {
    const strs = [];
    for (const property in this.properties) {
      if (lector['is' + property]) {
        strs.push(this.properties[property]);
      }
    }
    return strs;
  }

  formatFullName(user) {
    return user.lastname + ' ' + user.firstname + ' ' + user.middlename;
  }

  ngOnInit() {
    this.getAllLectors();
  }

}
