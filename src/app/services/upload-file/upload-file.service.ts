
import {Injectable} from '@angular/core';
// import {HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';


@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  pushFileToStorage(file: File) {
    const formdata: FormData = new FormData();

    formdata.append('file', file);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'multipart/form-data');

    // const req = new HttpRequest('POST', this.configService.api + 'post', formdata, {
    //   headers: httpHeaders,
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    //
    // return this.http.request(req);
    return this.configService.post('post', formdata,{
      'Content-Type': 'multipart/form-data'
    });

    // return this.http.request(req);
  }

  getFiles(): Observable<string[]> {
    return this.configService.get('getallfiles');
  }
}
