import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RichTextEditorComponent, ToolbarService, TableService, RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import { LinkService, ImageService, MarkdownEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import {InPlaceEditorAllModule} from '@syncfusion/ej2-angular-inplace-editor';

@NgModule({
  imports: [
    RichTextEditorAllModule,
    InPlaceEditorAllModule
  ],
  providers: [
    ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService
  ],
  declarations: [],
  exports: [
    RichTextEditorAllModule,
    InPlaceEditorAllModule
  ]
})
export class Ej2Module { }
