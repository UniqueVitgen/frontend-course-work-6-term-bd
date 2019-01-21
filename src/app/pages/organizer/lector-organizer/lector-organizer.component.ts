import { Component, OnInit } from '@angular/core';
import {LectorService} from '../../../services/lector-service/lector.service';
import {Lector} from '../../../factory/lector.factory';
import {SECUserFormComponent} from '../../../components/forms/secuser-form/secuser-form.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {LectorCountDiplomFormComponent} from '../../../components/forms/lector-count-diplom-form/lector-count-diplom-form.component';
import {UserWorker} from '../../../workers/UserWorker';
import {UserStorage} from '../../../storage/user/UserStorage';
import {User} from '../../../factory/user.factory';

@Component({
  selector: 'app-lector-organizer',
  templateUrl: './lector-organizer.component.html',
  styleUrls: ['./lector-organizer.component.css']
})
export class LectorOrganizerComponent implements OnInit {
  lectors: Lector[];
  user: User;
  public bsModalRefSelectGroups: BsModalRef;

  constructor(private lectorService: LectorService,
  private userStorage: UserStorage,
  private userWorker: UserWorker,
  private modalService: BsModalService) { }

  ngOnInit() {
    this.user = this.userStorage.getUser();
    this.getAll();
  }
  getAll() {
    this.lectorService.getLectors().subscribe(resLectors => {
      this.lectors = resLectors;
    });
  }

  saveInWord() {
    this.lectorService.getWord().subscribe(res => {
      console.log('res', res);
      let data = new Blob([res], { type: 'application/docx' });
      let file = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = file;
      link.download = 'Преподаватели.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }
  clickEditButton(lector: Lector) {
    let edit;
    if (lector) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      lectorEdit: lector,
      lector: lector,
      onSave: (lector: Lector) => {
      },
      onDestroy: () => {
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'sec-user-form',
      ignoreBackdropClick: true
    }
    this.bsModalRefSelectGroups = this.modalService.show(LectorCountDiplomFormComponent, modalOptions);
    this.bsModalRefSelectGroups.content.closeBtnName = 'Close';
  }

}
