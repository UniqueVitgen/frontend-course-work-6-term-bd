import { Directive, ElementRef, Output, Input } from '@angular/core';
import { EventEmitter } from 'events';


@Directive({
  selector: '[percent]',
  host: {
      '(input)': 'format($event.target.value)'
  }

})
export class PercentDirective {
  nativeElement;
  before;
  pattern = /^\s?\s?$|^[1-9][0-9]?$|^100$/;

  constructor(public el: ElementRef) { 
    this.nativeElement = el.nativeElement;
  }

  format(value) {
    if(value.match(this.pattern)) {
      this.before = value;
    }
    else {
      value = this.before;
      this.nativeElement.value = this.before;
    }
  }

}
