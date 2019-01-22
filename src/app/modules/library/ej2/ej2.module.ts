import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RichTextEditorComponent, ToolbarService, TableService, RichTextEditorAllModule} from '@syncfusion/ej2-angular-richtexteditor';
import { LinkService, ImageService, MarkdownEditorService } from '@syncfusion/ej2-angular-richtexteditor';

@NgModule({
  imports: [
    RichTextEditorAllModule
  ],
  providers: [
    ToolbarService, LinkService, ImageService, MarkdownEditorService, TableService
  ],
  declarations: [],
  exports: [
    RichTextEditorAllModule
  ]
})
export class Ej2Module { }
