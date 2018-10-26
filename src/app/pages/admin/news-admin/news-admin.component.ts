import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewsFormComponent } from '../../../components/forms/news-form/news-form.component';
import { NewsComponent } from '../../students/news/news.component';

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {
  @ViewChild(NewsComponent) newsComponent;
  bsModalRef: BsModalRef;
  public faculties;

  constructor(
    private modalService: BsModalService) {
  }

  getAll() {
    // this.facultyService.getAll().subscribe(faculties => {
    //   console.log('facs - ', faculties);
    //   this.faculties = faculties;
    // })

  }

  
 
  openNewsForm(news?) {
    let edit;
    if(news) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      news: news,

    };
    let modalOptions = {
      initialState: initialState,
      class:'news-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(NewsFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

}
