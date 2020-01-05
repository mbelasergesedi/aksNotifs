import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { Tab2Page } from './tab2.page';
import { MomentModule } from 'ngx-moment';
import { FooPipe } from '../foo.pipe';
const routes: Routes = [
  {
    path: '',
    component: Tab2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    ReactiveFormsModule,
    IonicModule,
    NgHttpLoaderModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Tab2Page, FooPipe]
})
export class Tab2PageModule { }
