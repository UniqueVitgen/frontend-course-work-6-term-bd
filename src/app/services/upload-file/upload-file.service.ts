
import {Injectable} from '@angular/core';
// import {HttpRequest, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
 
@Injectable()
export class UploadFileService {
 
  constructor(private configService: ConfigService) {}
 
  pushFileToStorage(file: File) {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);

    return this.configService.post('post', formdata);
     
    // return this.http.request(req);
  }
 
  getFiles(): Observable<string[]> {
    return this.configService.get('getallfiles');
  }
}
