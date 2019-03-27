import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DiplomWork} from '../../../factory/diplom-work.factory';
import {DiplomWorkLectorsFormComponent} from '../../forms/diplom-work-lectors-form/diplom-work-lectors-form.component';
import {Lector} from '../../../factory/lector.factory';

@Component({
  selector: 'app-lectors-accordion',
  templateUrl: './lectors-accordion.component.html',
  styleUrls: ['./lectors-accordion.component.css']
})
export class LectorsAccordionComponent implements OnInit, OnChanges {
  @Input() lectors: Lector[];
  @Input() diplomWork: DiplomWork;
  @Output('clickEditLectors') outputClickEditLectors: EventEmitter<DiplomWork> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  openDiplomWorkLectorsForm(diplomWork: DiplomWork): void {
    this.outputClickEditLectors.emit(diplomWork);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('lectors acc', this.lectors);
  }

}
