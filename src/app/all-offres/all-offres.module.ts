import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AllOffresComponent } from './all-offres.component';
import {TimeAgoPipe} from 'time-ago-pipe';
import { NgHttpLoaderModule } from 'ng-http-loader';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgHttpLoaderModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: AllOffresComponent
            }
        ])
    ],
    declarations: [AllOffresComponent]
})
export class AllOffreModule { }
