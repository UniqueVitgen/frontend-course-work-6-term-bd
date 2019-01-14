import { Component, OnInit } from '@angular/core';
import { UserStorage } from '../../../storage/user/UserStorage';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news-service/news.service';
import { News } from '../../../factory/news.factory';
import { User } from '../../../factory/user.factory';
import { DateTimeWorker } from '../../../workers/DateTimeWorker';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  sub;
  id: number;
  user : User;
  news: News;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private dateTimeWorker: DateTimeWorker,
    private userStorage: UserStorage) { }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = + params['id'] || 0;
        this.user = this.userStorage.getUser();
        this.getNews((news) => {
          console.log('news', news);
        })
      })
  }

  getNews(onSuccess?) {

    this.newsService.getById(this.id).subscribe(res => {
      this.news = res;
      if(onSuccess) {
        onSuccess(res);
      }
    })
  }

}
