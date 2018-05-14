import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public accomplishments: Array<{ src: string, amount: any, title: string }>;
  public statistics: Array<{ year: string, registered: any, goodMark: any, average: string }>;
  public contacts: Array<{ name: string, src: any, post: any}>;

  constructor() {
    this.accomplishments = [
      { src: 'assets/icon/about-us/student-male.png', amount: 2000, title: 'Пользователей'},
      { src: 'assets/icon/about-us/diploma.png', amount: 700, title: 'Дипломов'},
      { src: 'assets/icon/about-us/goal.png', amount: 100, title: 'Красных дипломов'},
      { src: 'assets/icon/about-us/comments.png', amount: 500, title: 'Положительных отзывов'},
    ];
    this.statistics = [
      {year:'2017-2018', registered:100, goodMark:0, average:'-'},
      {year:'2016-2017', registered:250, goodMark:170, average:'8.1'},
      {year:'2015-2016', registered:150, goodMark:100, average:'7.5'},
    ];
    this.contacts = [
      {name:'Орсик Виталий', src:'assets/img/about-us/user-60.jpg',post: 'Верстальщик'},
      {name:'Орсик Виталий', src:'assets/img/about-us/user-60.jpg',post: 'Бэкэнд разработчик'},
      {name:'Орсик Виталий', src:'assets/img/about-us/user-60.jpg',post: 'Служба поддержки'},
    ];
   }

  ngOnInit() {
  }

}
