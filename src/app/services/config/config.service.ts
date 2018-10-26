import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

const api = 'http://localhost:8081/';

@Injectable()
export class ConfigService {

  constructor(
    private http: Http) { }

   get(url, request?) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(api + url, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};;
  }

  post(url, body, request?) {
    // let cpHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
    // let req: RequestOptionsArgs = {
    //   headers: cpHeaders
    // }
    // let options = new RequestOptions(req);
    if (request == null) request = {};
    return this.http.post(api + url, body, request)
      .map((res: Response) => res.json());
  }

  put(url, body, request?) {
    // let cpHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
    // let req: RequestOptionsArgs = {
    //   headers: cpHeaders
    // }
    // let options = new RequestOptions(req);
    if (request == null) request = {};
    return this.http.put(api + url, body, request)
      .map((res: Response) => res.json());
  }

  delete(url, request?) {
    // let cpHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });
    // let req: RequestOptionsArgs = {
    //   headers: cpHeaders
    // }
    // let options = new RequestOptions(req);
    if (request == null) request = {};
    return this.http.delete(api + url, request)
      .map((res: Response) => res.json());
  }

  blob(url) {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(api + url, options)
      .map((res) => (res as any)._body);
  }

}
