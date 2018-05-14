import { Component, OnInit } from '@angular/core';
import { LectorService } from '../../../services/lector-service/lector.service';
import { UserService } from '../../../services/user-service/user.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news: Array<{title: any, description: any, src: any, date: any}>;

  constructor(
    public lectorService: LectorService,
    public userService: UserService) {
    this.news = [
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподователь Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      },
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподователь Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      },
      {
        title: 'Сдача Куприянову в 301', description:'Показ Дипломной работы Куприянову будет осуществлятся в левом крыле 3 этажа ФИТРа в 301 кабинете с одновременной сдачей лабораторной работы у группе 10701215',
        src: 'assets/img/students/news/template.png', date: '28 feb'
      },
      {
        title: 'Перенос сдачи у Ивановой', description:'Связи с болезнью Доцента кафедры ПОВТ факульта ФММП Преподователь Мария Иванова не сможет проводить свои занятии в 1 апреля, но сможет проводить 3 апреля',
        src: 'assets/img/students/news/template.png', date: '11 apr'
      }
    ]
    this.lectorService.getLectors().subscribe(data => {
      console.log('lectors - ',data);
    });
    this.userService.getUsers().subscribe(data => {
      console.log('users - ', data);
    })
   }

  ngOnInit() {
  }

}
