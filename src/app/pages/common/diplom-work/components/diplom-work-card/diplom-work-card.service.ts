import {Injectable} from '@angular/core';
import {DiplomWork} from '../../../../../factory/diplom-work.factory';
import {DiplomWorkTitleFormComponent} from '../../../../../components/forms/diplom-work-title-form/diplom-work-title-form.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {MarkDiplomWorkFormComponent} from '../mark-diplom-work-form/mark-diplom-work-form.component';

@Injectable()
export class DiplomWorkCardService {
  private bsModalRef2: BsModalRef;
  constructor(
    private modalService: BsModalService) {
  }
  public editTitle(diplomWork: DiplomWork): void {
    let edit;
    if (diplomWork) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      diplomWorkEdit: diplomWork,
    };
    const modalOptions = {
      initialState: initialState,
      class: 'diplomWork-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef2 = this.modalService.show(DiplomWorkTitleFormComponent, modalOptions);
    this.bsModalRef2.content.closeBtnName = 'Close';
  }
  public editMark(diplomWork: DiplomWork): void {
    let edit;
    if (diplomWork) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      diplomWorkEdit: diplomWork,
    };
    const modalOptions = {
      initialState: initialState,
      class: 'diplomWork-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef2 = this.modalService.show(MarkDiplomWorkFormComponent, modalOptions);
    this.bsModalRef2.content.closeBtnName = 'Close';
  }
}
