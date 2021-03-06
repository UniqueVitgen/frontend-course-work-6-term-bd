import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @Input() input: string;
  @Output() inputChange: EventEmitter<String> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  keyUp(keyboardEvent) {
    this.inputChange.emit(keyboardEvent.target.value);
  }

}
