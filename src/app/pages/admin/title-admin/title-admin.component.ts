import { Component, OnInit, ViewChild } from '@angular/core';

import { TitleFormComponent } from '../../../components/forms/title-form/title-form.component';

import { PasswordValidator } from '../../../validators/password.validator';
import { TitleService } from '../../../services/title/title.service';
import { Router } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ModalService } from '../../../services/modal-service/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-title-admin',
  templateUrl: './title-admin.component.html',
  styleUrls: ['./title-admin.component.css']
})
export class TitleAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public titles;
  public selectedTitles;
  displayedColumns= ['name', 'edit', 'delete']
  search;

  constructor(public titleService: TitleService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router,) {
  }

  getAll() {
    this.titleService.getAll().subscribe(titles => {
      console.log('facs - ', titles);
      this.titles = titles;
      this.selectedTitles = titles;
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
    this.selectedTitles = this.titles.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackFormTitleHide() {
    this.formEventService.hideTitleForm.subscribe(()=> {
      this.getAll();
    })
  }
 
  openTitleForm(title?) {
    let edit;
    if(title) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      titleEdit: title,

    };
    let modalOptions = {
      initialState: initialState,
      class:'title-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(TitleFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addTitle() {
    this.router.navigate(['new-title'])
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

  deleteTitle(title) {
    this.titleService.delete(title).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormTitleHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}

