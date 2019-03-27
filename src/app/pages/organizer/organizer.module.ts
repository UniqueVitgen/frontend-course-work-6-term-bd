import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LectorOrganizerComponent} from './lector-organizer/lector-organizer.component';
import {AngularLibraryModule} from '../../modules/library/angular-library/angular-library.module';
import {MaterialDesignModule} from '../../modules/library/material-design/material-design.module';
import {BootstrapModule} from '../../modules/library/bootstrap/bootstrap.module';
import {ComponentsModule} from '../../components/components.module';
import {CommonPagesModule} from '../common/common-pages.module';
import {StoragesModule} from '../../storage/storages.module';
import {WorkersModule} from '../../workers/workers.module';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';

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
