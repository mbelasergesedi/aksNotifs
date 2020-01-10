import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleComponent } from './simple.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgHighlightModule } from 'ngx-text-highlight';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgHighlightModule,
    NgHttpLoaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: SimpleComponent
      }
    ])
  ],
  declarations: [SimpleComponent]
})
export class SimpleModule {}