import { NgModule } from '@angular/core';
import {AutoCompleteModule} from 'primeng/primeng';
import { InPlaceEditorAllModule } from '@syncfusion/ej2-angular-inplace-editor';

@NgModule({
  imports: [
    AutoCompleteModule
  ],
  declarations: [],
  exports: [
    AutoCompleteModule
  ]
})
export class PrimeNGModule { }
