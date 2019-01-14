import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    public lectorService: LectorService,
    public newsService: NewsService,
    public dateTimeWorker: DateTimeWorker,
    private modalService: BsModalService,
    private userWorker: UserWorker,
    public userStorage: UserStorage,
    private router: Router,
    public userService: UserService) {
    this.newsItems = [
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподаватель Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      },
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподаватель Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      },
      {
        title: 'Сдача Куприянову в 301', description:'Показ Дипломной работы Куприянову будет осуществлятся в левом крыле 3 этажа ФИТРа в 301 кабинете с одновременной сдачей лабораторной работы у группе 10701215',
        src: 'assets/img/students/news/template.png', date: '28 feb'
      },
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподаватель Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      }
    ]
    this.lectorService.getLectors().subscribe(data => {
      console.log('lectors - ',data);
    });
    this.userService.getUsers().subscribe(data => {
      console.log('users - ', data);
    })
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
      console.log('news - ', this.news);
    })
  }

  createSrcInNews() {
    this.news.forEach(element => {
      if(element.imageModel) {
        element.src = "http://localhost:8081/files/" + element.imageModel.filename;
      }
    });
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
        this.getAllNews();
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
      this.getAllNews();
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

  formatDate(date, format?) {
    if(format) {
      return this.dateTimeWorker.getDate(date, format);
    }
    else {
      return this.dateTimeWorker.getDate(date);
    }
  }

}
