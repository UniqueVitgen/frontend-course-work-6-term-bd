import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenStorage } from './token/TokenStorage';
import { UserStorage } from './user/UserStorage';

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
