import {PercentageEventModel} from '../model/percentage-event.model';
import {PercentageFormComponent} from '../../../forms/percentage-form/percentage-form.component';
import {PercentageService} from '../../../../services/percentage/percentage.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {SEC} from '../../../../factory/sec.factory';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentageTableEventService {
  bsModalRef: BsModalRef;
  constructor(public percentageService: PercentageService,
  private modalService: BsModalService) {}


  deletePercentage(percentageEventModel: PercentageEventModel, onSuccess: () => void) {
    const {percentage} = percentageEventModel;
    this.percentageService.delete(percentage).subscribe(data => {
      console.log(data);
      onSuccess();
    });
  }
  openPercentageForm(percentageEventModel: PercentageEventModel, sec: SEC, onDestroy: () => void) {
    let percentage, index, edit;
    let previous, next;
    if (percentageEventModel) {
      ({percentage, index} = percentageEventModel);
      if (index - 1 >= 0) {
        previous = sec.percentages[index - 1];
      }
      if (index + 1 < sec.percentages.length) {
        next = sec.percentages[index + 1];
      }
    }
    if (percentage) {
      edit = true;
      percentage.startDate = (new Date(percentage.startDate)) as any;
      percentage.endDate = (new Date(percentage.endDate)) as any;
    } else {
      edit = false;
    }
    const initialState: any = {
      isEdit: edit,
      percentageEdit: percentage,
      sec: sec,
      onDestroy: () => {
        onDestroy();
      },
      previous: previous,
      next: next,
    };
    if (percentage) {
      initialState.percentage = percentage;
    }
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openPercentageFormBefore(percentageEventModel: PercentageEventModel, sec: SEC, onDestroy: () => void) {
    const {percentage, index} = percentageEventModel;
    const endDate = percentage.startDate;
    let previous, next;
    if (index - 1 >= 0) {
      previous = sec.percentages[index - 1];
    }
    next = percentage;
    const initialState = {
      percentageEdit: percentage,
      endDate: endDate,
      sec: sec,
      onDestroy: () => {
        onDestroy();
      },
      previous: previous,
      next: next
    };
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };

    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
  openPercentageFormAfter(percentageEventModel: PercentageEventModel, sec: SEC, onDestroy: () => void) {
    const {percentage, index} = percentageEventModel;
    const startDate = percentage.endDate;
    let previous, next;
    if (index + 1 < sec.percentages.length) {
      next = sec.percentages[index + 1];
    }
    previous = percentage;
    const initialState = {
      percentageEdit: percentage,
      startDate: startDate,
      sec: sec,
      onDestroy: () => {
        onDestroy();
      },
      previous: previous,
      next: next
    };
    const modalOptions = {
      initialState: initialState,
      class: 'percentage-form',
      ignoreBackdropClick: true
    };
    this.bsModalRef = this.modalService.show(PercentageFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
