import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UploadFileService } from '../../../services/upload-file/upload-file.service';

@Component({
  selector: 'app-select-image',
  templateUrl: './select-image.component.html',
  styleUrls: ['./select-image.component.css']
})
export class SelectImageComponent implements OnInit, OnDestroy {
  images;
  file;
  selectedImage;
  onDestroy;
  isSuccess;

  constructor(public bsModalRef: BsModalRef,
    private uploadFileService: UploadFileService) { }

  ngOnInit() {
    this.getAllImages();
  }
  ngOnDestroy(): void {
    if (this.onDestroy) {
      if (this.isSuccess) {
        this.onDestroy(this.selectedImage);
      }
    }
  }

  getAllImages() {
    this.uploadFileService.getFiles().subscribe(data => {
      this.images = data;
      console.log('data', data);
    });
  }

  selectImage(index) {
    console.log(' i - ', index);
    this.selectedImage = this.images[index];
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
    console.log('file1 - ', file);
    this.uploadFileService.pushFileToStorage(file).subscribe(event => {
      console.log('file - ', file);
      this.getAllImages();
    }, err => {

    });
    // this.file = event.srcElement.files[0];
    // console.log(this.file);
  }

  upload() {

    this.uploadFileService.pushFileToStorage(this.file).subscribe(event => {
      console.log('file - ', this.file);
    });
  }

  cancel() {
    this.bsModalRef.hide();
  }

  ok() {
    this.isSuccess = true;
    this.cancel();
  }

}
