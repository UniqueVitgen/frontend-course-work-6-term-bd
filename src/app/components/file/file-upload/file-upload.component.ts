import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  @Input('text') text;
  @Output('onChange') onChange = new EventEmitter();;
  // @Input('file') file;
  // @Output('file') file;

  constructor() { }

  ngOnInit() {
  }

  changeFile(event)  {
    // this.onChange.emit(event);
    let file = event.srcElement.files[0];
    this.onChange.emit(file);
    // if(this.onChange) { this.onChange(this.file, event);}
    // console.log(this.file);
  }

}
