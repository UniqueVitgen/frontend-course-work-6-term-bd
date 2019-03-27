import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SECComponent } from './sec/sec.component';
import { SECListComponent } from './seclist/seclist.component';
import { CommonPagesModule } from '../common/common-pages.module';
import { AngularLibraryModule } from '../../modules/library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../modules/library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { BootstrapModule } from '../../modules/library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../storage/storages.module';
import { WorkersModule } from '../../workers/workers.module';
import {PrimeNGModule} from '../../modules/library/prime-ng/prime-ng.module';

@NgModule({
  imports: [
    CommonModule,
    AngularLibraryModule,
    MaterialDesignModule,
    BootstrapModule,
    ComponentsModule,
    PrimeNGModule,
    CommonPagesModule,
    StoragesModule,
    WorkersModule
  ],
  declarations: [
    SECListComponent,
    SECComponent
  ],
  exports: [
    SECListComponent,
    SECComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SecretaryModule { }
