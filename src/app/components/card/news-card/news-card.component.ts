import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { UserWorker } from '../../../workers/UserWorker';
import { NewsFormComponent } from '../../forms/news-form/news-form.component';
import { User } from '../../../factory/user.factory';
import { News } from '../../../factory/news.factory';
import { Router } from '@angular/router';
import { NewsService } from '../../../services/news-service/news.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {
  @Input() itemsCSS;
  @Input() item;
  @Input() user;
  @Input() hasPossibleAction;
  @Input() expanded: boolean;
  @Output('onChange') onChange = new EventEmitter();;
  bsModalRef: BsModalRef;

  constructor(private dateTimeWorker: DateTimeWorker, 
    private userWorker: UserWorker,
    public newsService: NewsService,
    private modalService: BsModalService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  formatDate(date, format?) {
    if(format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {
      return this.dateTimeWorker.getDate(date);
    }
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
      onSave: (res) => {
        this.onChange.emit(res);
      }
    };
    let modalOptions = {
      initialState: initialState,
      class:'news-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(NewsFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openNewsPage(item: News) {
    this.router.navigate(['/news', item.id] )
  }

  deleteNews(news) {
    this.newsService.delete(news).subscribe(res => {
      this.onChange.emit(null);
    })
  }

  hasChangeAccess(user: User, news: News) {
    if(user) {
      if(this.userWorker.hasAdminRole(user)) {
        return true;
      }
      else {
        return user.idPerson == news.user.idPerson;
      }
    }
  }


}
