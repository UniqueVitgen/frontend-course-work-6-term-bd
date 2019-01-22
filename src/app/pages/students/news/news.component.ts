import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { LectorService } from '../../../services/lector-service/lector.service';
import { UserService } from '../../../services/user-service/user.service';
import { NewsService } from '../../../services/news-service/news.service';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';
import { UserStorage } from '../../../storage/user/UserStorage';
import { UserWorker } from '../../../workers/UserWorker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NewsFormComponent } from '../../../components/forms/news-form/news-form.component';
import { User } from '../../../factory/user.factory';
import { News } from '../../../factory/news.factory';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsItems: Array<{title: any, description: any, src: any, date: any}>;
  news;
  user: User;
  bsModalRef: BsModalRef;
  @Input() itemsCSS;
  @Input() hasTitle = true;
  @Input() titleHeader = 'Новости';
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor(
    public lectorService: LectorService,
    public newsService: NewsService,
    public dateTimeWorker: DateTimeWorker,
    private modalService: BsModalService,
    private userWorker: UserWorker,
    public userStorage: UserStorage,
    private router: Router,
    public userService: UserService) {
    this.lectorService.getLectors().subscribe(data => {
      console.log('lectors - ', data);
    });
    this.userService.getUsers().subscribe(data => {
      console.log('users - ', data);
    });
   }

  ngOnInit() {
    console.log('itemsScc', this.itemsCSS);
    console.log('hasTitle', this.hasTitle);
    this.getAllNews();
    this.user = this.userStorage.getUser();
  }

  getAllNews() {
    this.newsService.getAll().subscribe(data => {
      this.news = data;
      this.createSrcInNews();
      this.onChange.emit(true);
      console.log('news - ', this.news);
    });
  }

  createSrcInNews() {
    this.news.forEach(element => {
      if (element.imageModel) {
        element.src = 'http://localhost:8081/files/' + element.imageModel.filename;
      }
    });
  }

  openNewsForm(news?) {
    let edit;
    if (news) {
      edit = true;
    }
    else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      news: news,
      onSave: (res) => {
        this.getAllNews();
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'news-form',
      ignoreBackdropClick: true

    };
    this.bsModalRef = this.modalService.show(NewsFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  openNewsPage(item: News) {
    this.router.navigate(['/news', item.id] );
  }

  deleteNews(news) {
    this.newsService.delete(news).subscribe(res => {
      this.getAllNews();
    });
  }

  hasChangeAccess(user: User, news: News) {
    if (user) {
      if (this.userWorker.hasAdminRole(user)) {
        return true;
      }
      else {
        return user.idPerson == news.user.idPerson;
      }
    }
  }

  formatDate(date, format?) {
    if (format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {
      return this.dateTimeWorker.getDate(date);
    }
  }

}
