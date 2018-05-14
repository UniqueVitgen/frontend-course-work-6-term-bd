import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from '../../../services/modal-service/modal.service';

@Component({
  selector: 'app-select-teacher',
  templateUrl: './select-teacher.component.html',
  styleUrls: ['./select-teacher.component.css']
})
export class SelectTeacherComponent implements OnInit {

  // @Input() id: string;
  //   private element: JQuery;
 
  //   constructor(private modalService: ModalService, private el: ElementRef) {
  //       this.element = $(el.nativeElement);
  //   }

  ngOnInit() {

  }

  public visible = false;
  public visibleAnimate = false;

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }

}
