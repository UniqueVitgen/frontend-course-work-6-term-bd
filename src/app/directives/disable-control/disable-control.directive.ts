import { Directive, Input , Renderer, ElementRef, forwardRef, Provider} from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';
// import {Directive, Renderer, ElementRef, forwardRef, Provider} from 'angular2/core'
// import {NG_VALUE_ACCESSOR, DefaultValueAccessor} from 'angular2/common'
// import {CONST_EXPR} from '@angular/src/facade/lang'
import {Observable} from 'rxjs/Observable'

// const PROVIDE = CONST_EXPR(new PROVIDER(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => QueryDirective), multi: true}));

@Directive({
  selector: '[disableControl]'
})
export class DisableControlDirective {

  @Input() set disableControl( condition : boolean ) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor( private ngControl : NgControl ) {
  }

}
