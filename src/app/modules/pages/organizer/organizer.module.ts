import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LectorOrganizerComponent} from '../../../pages/organizer/lector-organizer/lector-organizer.component';
import {AngularLibraryModule} from '../../library/angular-library/angular-library.module';
import {MaterialDesignModule} from '../../library/material-design/material-design.module';
import {BootstrapModule} from '../../library/bootstrap/bootstrap.module';
import {ComponentsModule} from '../../components/components.module';
import {CommonPagesModule} from '../common-pages/common-pages.module';
import {StoragesModule} from '../../others/storages/storages.module';
import {WorkersModule} from '../../others/workers/workers.module';
import {PrimeNGModule} from '../../library/prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    PrimeNGModule,
    BootstrapModule,
    ComponentsModule,
    CommonPagesModule,
    StoragesModule,
    WorkersModule
  ],
  declarations: [
    LectorOrganizerComponent
  ],
  exports: [
    LectorOrganizerComponent
  ]
})
export class OrganizerModule { }
