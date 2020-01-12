import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab8Page } from './tab8.page';

const routes: Routes = [
  {
    path: 'tab8',
    component: Tab8Page,
    children:
      [
        {
          path: 'createaccount',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/account.module#AccountModule'
              }
            ]
        },
        {
          path: 'pharmacie',
          children:
            [
              {
                path: '',
                loadChildren: '../tab2/tab2.module#Tab2PageModule'
              }
            ]
        },
        {
          path: 'tab3',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/tab3.module#Tab3PageModule'
              }
            ]
        },
        {
          path: 'tab4',
          children:
            [
              {
                path: '',
                loadChildren: '../tab4/tab4.module#Tab4PageModule'
              }
            ]
        },
        {
          path: 'tab5',
          children:
            [
              {
                path: '',
                loadChildren: '../tab5/tab5.module#Tab5PageModule'
              }
            ]
        },
        {
          path: 'tab6',
          children:
            [
              {
                path: '',
                loadChildren: '../tab6/tab6.module#Tab6PageModule'
              }
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/tab1',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports:
    [
      RouterModule.forChild(routes)
    ],
  exports:
    [
      RouterModule
    ]
})
export class TabsPageRoutingModule { }