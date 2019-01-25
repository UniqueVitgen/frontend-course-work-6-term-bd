import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { query } from '@angular/core/src/animation/dsl';
import { UserService } from '../../../services/user-service/user.service';
import {UserStorage} from '../../../storage/user/UserStorage';
import {User, UserUploadForm} from '../../../factory/user.factory';
import {SelectImageComponent} from '../../../components/select/select-image/select-image.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UploadFileService} from '../../../services/upload-file/upload-file.service';
import {FileWorker} from '../../../workers/file.worker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sub;
  id: number;
  user: User;
  imageModal: BsModalRef;

  constructor(
    private userStorage: UserStorage,

    private route: ActivatedRoute, private modalService: BsModalService,
    public fileWorker: FileWorker,
    private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.url
      .subscribe(url => {
        const main = url[0];
        if (main.path === 'my-profile') {
          this.user = this.userStorage.getUser();

        }
        // Defaults to 0 if no query param provided.
        // this.id = + params['id'] || 0;
        // this.getUser(this.id);
      });
  }

  formatFullName(user) {
    return user.lastname + ' ' +  user.firstname + ' ' + user.middlename;
  }

  formatUserRole(user) {
    return user.roles[0].name;
  }

  getUser(id) {
    this.userService.getById(id).subscribe(res => {
      this.user = res;
      console.log('res user - ', res);
    });
  }

  selectImage(user?) {
    let edit;
    if (user) {
      edit = true;
    } else {
      edit = false;
    }
    const initialState = {
      isEdit: edit,
      facultyEdit: user,
      onDestroy: (file) => {
        if (file) {
          console.log('file', file);
          const filename: string = file.substring(file.lastIndexOf('/') + 1);
          const userUploadForm: UserUploadForm = {
            filename: file,
            user: this.user
          };
          this.userService.uploadPhoto(this.user, filename).subscribe(resUser => {
            this.user = resUser;
            this.userStorage.saveUser(this.user);
          });
        }
      }
    };
    const modalOptions = {
      initialState: initialState,
      class: 'faculty-form',
      ignoreBackdropClick: true

    };
    // this.subscribe();
    this.imageModal = this.modalService.show(SelectImageComponent, modalOptions);
    this.imageModal.content.closeBtnName = 'Close';
  }

}
