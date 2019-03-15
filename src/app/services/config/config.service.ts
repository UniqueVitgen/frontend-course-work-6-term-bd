import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';

const api = 'http://localhost:8081/';

@Injectable()
export class ConfigService {
  public api = 'http://localhost:8081/';

  constructor(
    private http: Http) { }

   get(url, request?) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(api + url, options)
      .map(this.extractData);
  }

  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

  post(url, body, request?) {
    if (request == null) request = {};
    return this.http.post(api + url, body, request)
      .map((res: Response) => res.json());
  }

  put(url, body, request?) {
    if (request == null) request = {};
    return this.http.put(api + url, body, request)
      .map((res: Response) => res.json());
  }

  delete(url, request?) {
    if (request == null) request = {};
    return this.http.delete(api + url, request)
      .map((res: Response) => res.json());
  }

  blob(url) {
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.get(api + url, options)
      .map((res) => (res as any)._body);
  }

}
