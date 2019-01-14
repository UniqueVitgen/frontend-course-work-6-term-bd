import { User } from "./user.factory";

export class NewsBasic {
    id?: number;
    title: string= '';
    content: string = '';
    created: string | Date;
    user: User;
}

export class News extends NewsBasic {
    imageModel?: ImageModel;

    static assignFromNewsForm(news: News, newsForm: NewsForm) {
        for(let prop in news) {
            if(prop == 'imageModel') {

            }
            else if(prop == 'filename') {

            }
            else {
                news[prop] = newsForm[prop];
            }
        }
    }
}

export class NewsForm extends NewsBasic {
    filename?: string;
    url?: string;

    static assignFromNews(newsForm: NewsForm, news: News) {
        for(let prop in news) {
            if(prop == 'imageModel') {

            }
            else {
                newsForm[prop] = news[prop];
            }
        }
    }
}

export class ImageModel {
    id: number;
    description: string;
    filename: string;
    content: any[];
    contentType: string;
    created: Date;
}
