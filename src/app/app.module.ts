import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {CommonModule} from '@angular/common';
import {httpFactory} from './interceptor/http.factory';

import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import { SignUpOrganizerComponent } from './pages/common/sign-up/sign-up-organizer/sign-up-organizer.component';
// import { DiplomWorkTitleFormComponent } from './components/forms/diplom-work-title-form/diplom-work-title-form.component';
// import { SignUpSecretarySecComponent } from './pages/common/sign-up/sign-up-secretary-sec/sign-up-secretary-sec.component';
// import { SECFormComponent } from './components/forms/secform/secform.component';
// import { SECEventFormComponent } from './components/forms/secevent-form/secevent-form.component';
// import { SelectGroupComponent } from './components/select/select-group/select-group.component';
// import { SECUserFormComponent } from './components/forms/secuser-form/secuser-form.component';
// import { SECRoleFormComponent } from './components/forms/secrole-form/secrole-form.component';
// import { NewsItemComponent } from './pages/common/news-item/news-item.component';
// import { NewsCardComponent } from './components/card/news-card/news-card.component';
// import { SECDateFormComponent } from './components/forms/secdate-form/secdate-form.component';
import {AdminModule} from './pages/admin/admin.module';
import {CommonPagesModule} from './pages/common/common-pages.module';
import {LectorModule} from './pages/lectors/lector.module';
import {SecretaryModule} from './pages/secretary/secretary.module';
import {StudentModule} from './pages/students/student.module';
import {ComponentsModule} from './components/components.module';
import {DirectivesModule} from './directives/directives.module';
import {AngularLibraryModule} from './modules/library/angular-library/angular-library.module';
import {BootstrapModule} from './modules/library/bootstrap/bootstrap.module';
import {MaterialDesignModule} from './modules/library/material-design/material-design.module';
import {PipesModule} from './modules/others/pipes/pipes.module';
import {StoragesModule} from './storage/storages.module';
import {WorkersModule} from './workers/workers.module';
import {ServicesModule} from './services/services.module';
import {GuardsModule} from './guards/guards.module';
import {OrganizerModule} from './pages/organizer/organizer.module';
import {Ej2Module} from './modules/library/ej2/ej2.module';
import {PrimeNGModule} from './modules/library/prime-ng/prime-ng.module';
import { SECEventTableComponent } from './components/table/secevent-table/secevent-table.component';
import { StudentTableComponent } from './components/table/student-table/student-table.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    AngularLibraryModule,
    BootstrapModule,
    MaterialDesignModule,
    PrimeNGModule,

    AdminModule,
    CommonPagesModule,
    LectorModule,
    SecretaryModule,
    StudentModule,
    ComponentsModule,
    OrganizerModule,

    DirectivesModule,
    StoragesModule,
    WorkersModule,
    PipesModule,
    GuardsModule,
    ServicesModule,
    Ej2Module
  ],
  entryComponents: [
  ],
  providers: [
    CommonModule,
    FormsModule,

    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {

}
