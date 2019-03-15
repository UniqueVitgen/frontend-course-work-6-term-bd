import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SECComponent } from '../../../pages/secretary/sec/sec.component';
import { SECListComponent } from '../../../pages/secretary/seclist/seclist.component';
import { CommonPagesModule } from '../common-pages/common-pages.module';
import { AngularLibraryModule } from '../../library/angular-library/angular-library.module';
import { MaterialDesignModule } from '../../library/material-design/material-design.module';
import { ComponentsModule } from '../../components/components.module';
import { BootstrapModule } from '../../library/bootstrap/bootstrap.module';
import { StoragesModule } from '../../others/storages/storages.module';
import { WorkersModule } from '../../others/workers/workers.module';
import {PrimeNGModule} from '../../library/prime-ng/prime-ng.module';

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
