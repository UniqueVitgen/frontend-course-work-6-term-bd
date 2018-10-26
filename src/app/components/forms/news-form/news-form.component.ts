import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewsService } from '../../../services/news-service/news.service';
import { FormEventService } from '../../../services/events/form/form-event.service';
import { UploadFileService } from '../../../services/upload-file/upload-file.service';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';
import { SelectImageComponent } from '../../select/select-image/select-image.component';
import { NewsForm, News } from '../../../factory/news.factory';
import { UserStorage } from '../../../storage/user/UserStorage';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit, OnDestroy {
  public newsForm;
  public news : News = new News();
  private editedNews: NewsForm = new NewsForm();
  sub;
  isEdit;
  image;
  images;
  imageModal: BsModalRef;
  isRefresh = false;
  onSave;

  constructor(public formBuilder: FormBuilder, public facultyService: NewsService, public router: Router,
  private route: ActivatedRoute, public bsModalRef: BsModalRef, public formEventService: FormEventService,
  private uploadFileService: UploadFileService, private modalService: BsModalService,
  private newsService: NewsService,
  private userStorage: UserStorage
  ) { 
    
    this.newsForm = this.formBuilder.group({
      file: ['', Validators.compose([])],
      title: ['', Validators.compose([Validators.required])],
      content: ['', Validators.compose([Validators.required])],
      
    })
  }

  saveNews() {
    // this.facultyService.save(this.faculty).subscribe(answer => {
    //   console.log('answer from save faculty - ', answer);
    //   this.cancel();
    // })

  }
  
 
  selectImage(faculty?) {
    let edit;
    if(faculty) {
      edit = true;
    }
    else {
      edit=false;
    }
    let initialState = {
      isEdit: edit,
      facultyEdit: faculty,
      onDestroy: (file) => {
        if(file) {
          console.log('file', file);
          this.editedNews.url = file;
          this.editedNews.filename = this.editedNews.url.substring(this.editedNews.url.lastIndexOf('/') + 1);
          this.isRefresh = true;
        }
      }
    };
    let modalOptions = {
      initialState: initialState,
      class:'faculty-form',
      ignoreBackdropClick: true

    }
    // this.subscribe();
    this.imageModal = this.modalService.show(SelectImageComponent, modalOptions);
    this.imageModal.content.closeBtnName = 'Close';
  }

  getAllImages() {
    this.uploadFileService.getFiles().subscribe(data => {
      this.images = data;
      console.log('data',data);
    })
  }

  editNews(news) {
    // console.log('edited - ', this.facultyEdit);
    // this.createFacultyEditFromFaculty();
    // console.log('edited - ', this.facultyEdit);
    // this.facultyService.edit(this.facultyEdit).subscribe(answer => {
    //   console.log(answer);
    //   this.cancel();
    // })
  }

  openPhoto() {

  }

  onChange(file) {
    console.log('file1 - ',file);
    this.uploadFileService.pushFileToStorage(file).subscribe(event => {
      console.log('file - ',file);
    })
    // this.file = event.srcElement.files[0];
    // console.log(this.file);
  }

  save() {
    this.createNewsEditFromNews();
    if(this.editedNews.url) {
      this.editedNews.filename = this.editedNews.url.substring(this.editedNews.url.lastIndexOf('/') + 1);
    }
    console.log('this.news', this.editedNews);
    // console.log(this.news.filename);
    // let file = new File([])
    // console.log('news - ',this.news);
    this.newsService.save(this.editedNews).subscribe(data => {
      console.log(data);
      if(this.onSave) {
        this.onSave(data);
      }
      this.cancel();
    });
  }

  edit() {
    if(this.checkIfNewsFormAndNewsHasSameImage()) {
      News.assignFromNewsForm(this.news, this.editedNews);
      this.newsService.edit(this.news).subscribe(res => {
        console.log('res ' , res);
        if(this.onSave) {
          this.onSave(res);
        }
        this.cancel();
  
      })
    }
    else {
      this.newsService.editByForm(this.editedNews).subscribe(res => {
        console.log('res - ', res);
        if(this.onSave) {
          this.onSave(res);
        }
        this.cancel();
      })
    }
  }

  checkIfNewsFormAndNewsHasSameImage() {
    if(this.isRefresh) {
      if(this.news.imageModel) {
        if(this.editedNews.filename == this.news.imageModel.filename) {
          return true;
        }
        return false;
      }
      return false;
    }
    else {
      return true;
    }
  }
  
  upload() {
 
    // this.uploadFileService.pushFileToStorage(this.file).subscribe(event => {
    //   console.log('file - ',this.file);
    // })
  }

  cancel() {
    this.bsModalRef.hide();
  }

  createNewsEditFromNews() {
    // for(let property in this.news) {
    //   this.newsEdit[property] = this.news[property];
    // }
  }

  determineIfEdit() {
    if(this.news) {

      console.log('edit - ', this.isEdit);
    }
  }

  ngOnInit() {
    // this.formEventService.showFacultyForm.emit(true);
    this.editedNews.user = this.userStorage.getUser();
    if(this.isEdit) {
      NewsForm.assignFromNews(this.editedNews, this.news);
    }
    console.log('on init', this.news);
    this.determineIfEdit();
    this.getAllImages();

  }
  
  ngOnDestroy(): void {
    // this.formEventService.hideFacultyForm.emit(true);
  }

}
