import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {DiplomWorkComponent} from './diplom-work.component';
import {CommonModule} from '@angular/common';
import {AngularLibraryModule} from '../../../modules/library/angular-library/angular-library.module';
import {MaterialDesignModule} from '../../../modules/library/material-design/material-design.module';
import {PrimeNGModule} from '../../../modules/library/prime-ng/prime-ng.module';
import {BootstrapModule} from '../../../modules/library/bootstrap/bootstrap.module';
import {ComponentsModule} from '../../../components/components.module';
import {StudentModule} from '../../students/student.module';
import {StoragesModule} from '../../../storage/storages.module';
import {WorkersModule} from '../../../workers/workers.module';
import {StudentCardComponent} from './components/student-card/student-card.component';
import {Ej2Module} from '../../../modules/library/ej2/ej2.module';
import { SECCardComponent } from './components/seccard/seccard.component';
import { DiplomWorkCardComponent } from './components/diplom-work-card/diplom-work-card.component';
import { MarkDiplomWorkFormComponent } from './components/mark-diplom-work-form/mark-diplom-work-form.component';
import {DiplomWorkCardService} from './components/diplom-work-card/diplom-work-card.service';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    ComponentsModule,
    PrimeNGModule,
    Ej2Module,
    StudentModule,
    StoragesModule,
    WorkersModule],
  declarations: [
    DiplomWorkComponent,
    StudentCardComponent,
    SECCardComponent,
    DiplomWorkCardComponent,
    MarkDiplomWorkFormComponent
  ],
  entryComponents: [
    MarkDiplomWorkFormComponent
  ],
  providers: [
    DiplomWorkCardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [DiplomWorkComponent]
})
export class DiplomWorkModule {}
