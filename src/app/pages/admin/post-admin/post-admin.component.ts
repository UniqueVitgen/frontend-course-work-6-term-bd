import { Component, OnInit, ViewChild } from '@angular/core';

import { PostFormComponent } from '../../../components/forms/post-form/post-form.component';

import { PasswordValidator } from '../../../validators/password.validator';
import { PostService } from '../../../services/post/post.service';
import { Router } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal';
import { ModalService } from '../../../services/modal-service/modal.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormEventService } from '../../../services/events/form/form-event.service';

@Component({
  selector: 'app-post-admin',
  templateUrl: './post-admin.component.html',
  styleUrls: ['./post-admin.component.css']
})
export class PostAdminComponent implements OnInit {
  bsModalRef: BsModalRef;
  public posts;
  public selectedPosts;
  displayedColumns= ['name', 'edit', 'delete']
  search;

  constructor(public postService: PostService,
    private modalService: BsModalService,
    private formEventService: FormEventService,
    public router: Router,) {
  }

  getAll() {
    this.postService.getAll().subscribe(posts => {
      console.log('facs - ', posts);
      this.posts = posts;
      this.selectedPosts = posts;
    })

  }

  keyUp(event) {
    if (event.key === 'Escape') {
      this.search = '';
    }
    this.clickSearch();
  }

  clickSearch() {
    let value = this.search.toUpperCase();
    this.selectedPosts = this.posts.filter((fac) => {
      let targ = fac.name.toUpperCase();
      if(targ.indexOf(value) != -1) {
        return true;
      } 
    })
  }

  trackFormPostHide() {
    this.formEventService.hidePostForm.subscribe(()=> {
      this.getAll();
    })
  }
 
  openPostForm(post?) {
    let edit;
    if(post) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      postEdit: post,

    };
    let modalOptions = {
      initialState: initialState,
      class:'post-form',
      ignoreBackdropClick: true

    }
    this.bsModalRef = this.modalService.show(PostFormComponent, modalOptions);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


  // openModal(id: string) {
  //   this.modalService.open(id);
  // }

  // closeModal(id: string) {
  //   this.modalService.close(id);
  // }

  addPost() {
    this.router.navigate(['new-post'])
  }

  // closeModal() {
  //   console.log('inner');
  //   try {
  //     this.modal.close().then(answer => {
  //       console.log('close1 - ', answer);
  //     }).catch(err => {
  //       console.log('close1 err - ', err);
  //     });;
  //     this.modal.dismiss().then(answer => {
  //       console.log('close2 - ', answer);
  //     }).catch(err => {
  //       console.log('close2 err - ', err);
  //     });
  //   }
  //   catch (err) {
  //     console.log('err - ', err);
  //   }
  // }

  deletePost(post) {
    this.postService.delete(post).subscribe(answer => {
      console.log('answer');
      this.getAll();
    })
  }

  ngOnInit() {
    this.getAll();
    this.trackFormPostHide();
    setTimeout(() => {
      // this.modalService.open('1');

    }, 5000);
  }

}
