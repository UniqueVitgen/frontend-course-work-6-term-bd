import {Component, OnDestroy, OnInit} from '@angular/core';
import {LectorService} from '../../../services/lector-service/lector.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Lector} from '../../../factory/lector.factory';
import {LectorType} from '../../../factory/enums/lector-type.enum';

@Component({
  selector: 'app-select-lector',
  templateUrl: './select-lector.component.html',
  styleUrls: ['./select-lector.component.css']
})
export class SelectLectorComponent implements OnInit, OnDestroy {

  lectors: Lector[];
  onDestroy;
  selectedLector: Lector;
  isOk: boolean;
  type: LectorType;

  constructor(public lectorService: LectorService, public bsModalRef: BsModalRef) {
  }

  getAllLectors(onSuccess?) {
    if (this.lectors == null) {
      this.lectorService.getLectors().subscribe(lectors => {
        this.lectors = lectors;
        console.log('lectors - ', lectors);
        if (onSuccess) {
          onSuccess(lectors);
        }
      });
    }

  }

  initializeSelecteLector() {
    if (this.selectedLector == null) {
      // this.selectedLector = this.lectors[0];
    }
  }

  selectLector(lector?: Lector) {
    if (!(this.type === LectorType.leader && !lector.free)) {
      this.selectedLector = lector;
      console.log('select');
    }
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
