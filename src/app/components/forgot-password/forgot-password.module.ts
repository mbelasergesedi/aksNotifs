import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ForgotPasswordComponent
            }
        ])
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
