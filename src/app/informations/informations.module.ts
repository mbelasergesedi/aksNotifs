import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InformationsComponent } from './informations.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgHttpLoaderModule,
    RouterModule.forChild([
      {
        path: '',
        component: InformationsComponent
      }
    ])
  ],
  declarations: [InformationsComponent]
})
export class InformationsModule { }
