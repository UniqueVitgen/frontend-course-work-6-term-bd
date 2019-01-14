import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../services/group/group.service';
import { Group } from '../../../factory/group.factory';
import { Student } from '../../../factory/user.factory';
import { UserStorage } from '../../../storage/user/UserStorage';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  sub;
  id: number;
  group: Group;
  students: Student[];

  constructor(
    private route: ActivatedRoute,
    private userStorage: UserStorage,
    private groupService: GroupService) {
    this.route.url.subscribe(url => {
      let main = url[0];
      console.log(main);
      if (main.path == 'student-group') {
          this.group = this.userStorage.getUser().group;
          this.getStudents(this.group);
      }
      else {
        // Defaults to 0 if no query param provided.
        this.id = Number(url[1]) || 0;
        this.groupService.getById(this.id).subscribe(resGroup => {
          console.log('resGroup', resGroup);
          this.group = resGroup;
          this.getStudents(this.group);
        })
      }
    });
  }

  getStudents(group: Group) {
    this.groupService.getAllByGroupId(group.idGroup).subscribe(resStudents => {
      console.log('resStudents', resStudents);
      this.students = resStudents;
    });
  }

  // saveInWord() {
  //   this.diplomWorkService.getWord(this.diplomWork).subscribe(res => {
  //     console.log('res', res);
  //     let data = new Blob([res], { type: 'application/docx' });
  //     let file = window.URL.createObjectURL(data);
  //     let link = document.createElement('a');
  //     link.href = file;
  //     link.download = 'Дипломная работа:' + this.diplomWork.name + '.docx';
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   });
  // }

  // saveInPDF() {
  //   this.diplomWorkService.getPDF(this.diplomWork).subscribe(res => {
  //     console.log('res', res);
  //     let data = new Blob([res], { type: 'application/docx' });
  //     let file = window.URL.createObjectURL(data);
  //     let link = document.createElement('a');
  //     link.href = file;
  //     link.download = 'Дипломная работа:' + this.diplomWork.name + '.docx';
  //     document.body.appendChild(link);
  //     link.click();
  //     link.parentNode.removeChild(link);
  //   });
  // }

  saveInPDF() {
    this.groupService.getPDF(this.group).subscribe(res => {
      console.log('res', res);
          let data = new Blob([res], { type: 'application/pdf' });
          let file = window.URL.createObjectURL(data);
          let link = document.createElement('a');
          link.href = file;
          link.download = 'Группа:' + this.group.number ;
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
    });
  }

  saveInWord() {
    this.groupService.getWord(this.group).subscribe(res => {
      console.log('res', res);
      let data = new Blob([res], { type: 'application/docx' });
      let file = window.URL.createObjectURL(data);
      let link = document.createElement('a');
      link.href = file;
      link.download = 'Группа:' + this.group.number + '.docx';
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    });
  }

  ngOnInit() {
  }

}
