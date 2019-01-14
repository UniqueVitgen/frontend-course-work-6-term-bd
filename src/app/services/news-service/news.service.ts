import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { NewsForm, News } from '../../factory/news.factory';
import { Observable } from 'rxjs';

const prefix ="news/";
@Injectable()
export class NewsService {

  constructor(
    private configService: ConfigService) { }

    getById(id: number): Observable<News> {
      return this.configService.get(prefix+'news-' + id);
    }
    
    save(news: NewsForm) : Observable<News> {
      return this.configService.post(prefix+'save',news);
    }
    
    edit(news: News): Observable<News> {
      return this.configService.post(prefix+'edit',news);
    }

    editByForm(newsForm: News): Observable<News> {
      return this.configService.post(prefix + 'edit-by-form', newsForm);
    }

    getAll() {
      return this.configService.get(prefix+'getAll');
    }

    delete(news: News) {
      return this.configService.delete(prefix+'delete-' + news.id);
    }

}
