import {Injectable} from '@angular/core';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {DiplomWorkLectorsFormComponent} from '../../forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Injectable()
export class LectorsAccordionService {
  private bsModalRef2: BsModalRef;
  constructor(
    private modalService: BsModalService) {
  }
  public editDiplomLectors(diplomWork: DiplomWork) {
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
    this.bsModalRef2 = this.modalService.show(DiplomWorkLectorsFormComponent, modalOptions);
    this.bsModalRef2.content.closeBtnName = 'Close';
  }
}
