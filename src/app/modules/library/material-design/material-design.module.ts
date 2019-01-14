import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatTableModule, MatExpansionModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatMenuModule, MatFormFieldModule, MatAutocompleteModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ],
  declarations: [],
  exports: [
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ]
})
export class MaterialDesignModule { }
