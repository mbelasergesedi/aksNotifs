import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Tab8Page } from './tab8.page';
import { AgmCoreModule } from '@agm/core';
import { NgHttpLoaderModule } from 'ng-http-loader';
const routes: Routes = [
  {
    path: '',
    component: Tab8Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgmCoreModule,
    NgHttpLoaderModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab8Page]
})
export class Tab8PageModule { }
