import { Component } from '@angular/core';


import { MainComponent } from './pages/common/main/main.component';
import { AboutUsComponent } from './pages/common/about-us/about-us.component';
import { SignUpComponent } from './pages/common/sign-up/sign-up.component';
import { SignUpStudentComponent } from './pages/common/sign-up/sign-up-student/sign-up-student.component';
import { SignUpLectorComponent } from './pages/common/sign-up/sign-up-lector/sign-up-lector.component';
import { SignInComponent } from './components/forms/sign-in/sign-in.component';

import { SelectDiplomComponent } from './pages/students/select-diplom/select-diplom.component';
import { SelectTeacherComponent } from './pages/students/select-teacher/select-teacher.component';
import { LectorStaffComponent } from './pages/students/lector-staff/lector-staff.component';
import { NewsComponent } from './pages/students/news/news.component';

import { InvolveComponent } from './pages/lectors/involve/involve.component';
import { PercentageComponent } from './pages/lectors/percentage/percentage.component';
import { QueryStudentsComponent } from './pages/lectors/query-students/query-students.component';

import { GlobalEventsService } from './services/events/global/global-events.service';

import { TokenStorage } from './storage/token/TokenStorage';
import { UserStorage } from './storage/user/UserStorage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bsModalRef: BsModalRef;
  title = 'app';
  mode: any = 'unathored';
  unauthored = [
    { title: 'Главная', path:'home' },
    { title: 'Регистрация', path:'registration' },
    // { title: 'Войти', path: 'login' },
    // { path: 'news', component: NewsComponent  },
    // { path: 'lector-staff', component: LectorStaffComponent  },
    // { path: 'about-us', component: SelectDiplomComponent  },

  ];

  student = [
    { path: 'select-diplom', component: NewsComponent, title:'Выбор работы' },
    { path: 'news', component: NewsComponent, title:'Новости' },
    { path: 'lector-staff', component: LectorStaffComponent, title:'Преподователи' },
    { path: 'about-us', component: SelectDiplomComponent,content: [], title:'О нас' },
  ]

  lector = [

    { path: 'involve', component: InvolveComponent },
    { path: 'query-students', component: QueryStudentsComponent },
    { path: 'percentage', component: SelectDiplomComponent,content: [] },
    { path: 'news', component: NewsComponent },
    { path: 'about-us', component: SelectDiplomComponent,content: [] },
  ]

  admin = [
    {path: 'admin-faculty', title: 'Факультет'},
    {path: 'admin-specialization', title: 'Специальность'},
    {path: 'admin-group', title: 'Группа'},
    { path: 'news', title: 'Новости',  component: NewsComponent },
    { path: 'about-us', title: 'О нас', component: SelectDiplomComponent,content: [] },
  ]

  constructor(private globalEventsManager: GlobalEventsService,
    private modalService: BsModalService,
    public userStorage: UserStorage,
    public tokenStorage: TokenStorage
  ) {
    this.globalEventsManager.showStudentsNavBar.subscribe((mode: any) => {
      console.log('student user');
      this.mode = 'student';
    });

    this.globalEventsManager.showUnathoridNavBar.subscribe((mode: any) => {
      console.log('unathored user');
      this.mode = 'unathored';
    });
    this.globalEventsManager.showAdminNavBar.subscribe((mode: any) => {
      console.log('admin entered in my app');
      this.mode = 'admin';
    });
    this.globalEventsManager.showLectorNavBar.subscribe((mode: any) => {
      this.mode = 'lector';
    });
  }

  loginForm() {
    let modalOptions = {
      // initialState: initialState,
      class:'login-form',
      ignoreBackdropClick: true

    }
    this.modalService.show(SignInComponent, modalOptions)
  }

  logout() {
    this.tokenStorage.signOut();
    this.userStorage.signOut();
  }

  unAuth() {
    console.log('unath');
    localStorage.removeItem('student');
  }

  authStudent() {
    console.log('student');
    localStorage.removeItem('student');
  }
}
