import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenStorage } from '../../../storage/token/TokenStorage';
import { UserStorage } from '../../../storage/user/UserStorage';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TokenStorage,
    UserStorage
  ],
  exports: [
  ]
})
export class StoragesModule { }
