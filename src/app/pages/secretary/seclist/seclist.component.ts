import { Component, OnInit } from '@angular/core';
import { SECFormComponent } from '../../../components/forms/secform/secform.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SECService } from '../../../services/sec/sec.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { Router } from '@angular/router';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';

@Component({
  selector: 'app-seclist',
  templateUrl: './seclist.component.html',
  styleUrls: ['./seclist.component.css']
})
export class SECListComponent implements OnInit {
  bsModalRef: BsModalRef;
  public secs;
  public selectedSECs;
  displayedColumns= [ 'startDate', 'endDate', 'edit', 'delete']
  search;

  constructor(public secService: SECService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    private dateTimeWorker: DateTimeWorker,
    public router: Router,) {
  }

  getAll() {
    this.secService.getAll().subscribe(secs => {
      console.log('facs - ', secs);
      this.secs = secs;
      this.selectedSECs = secs;
    })

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedSECs = this.secs.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackFormSECHide() {
    this.formEventService.hideSECForm.subscribe(()=> {
      this.getAll();
    })
  }
 
  openSECForm(sec?) {
    let edit;
    if(sec) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      secEdit: sec,

    };
    let modalOptions = {
      initialState: initialState,
      class:'sec-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(SECFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addSEC() {
    this.router.navigate(['new-sec'])
  }

  // closeModal() {
  //   console.log('inner');
  //   try {
  //     this.modal.close().then(answer => {
  //       console.log('close1 - ', answer);
  //     }).catch(err => {
  //       console.log('close1 err - ', err);
  //     });;
  //     this.modal.dismiss().then(answer => {
  //       console.log('close2 - ', answer);
  //     }).catch(err => {
  //       console.log('close2 err - ', err);
  //     });
  //   }
  //   catch (err) {
  //     console.log('err - ', err);
  //   }
  // }

  deleteSEC(sec) {
    this.secService.delete(sec).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormSECHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

  formatDate(date, format?) {
    let dateObj = new Date(date);
    if(format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {return this.dateTimeWorker.getDate(date);}
  }

  goToSEC(sec) {
    this.router.navigate(['sec', sec.id]);
  }

}
