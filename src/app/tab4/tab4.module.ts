import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tab4Page } from './tab4.page';
import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  {
    path: '',
    component: Tab4Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule { }
