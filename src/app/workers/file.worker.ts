import {Injectable} from '@angular/core';
import {ImageModel} from '../factory/image-model.factory';

@Injectable({
  providedIn: 'root'
})
export class FileWorker {
  public formatUrl(imageModel: ImageModel) {
    if (imageModel) {
      return 'http://localhost:8081/files/' + imageModel.filename;
    }
  }
}
