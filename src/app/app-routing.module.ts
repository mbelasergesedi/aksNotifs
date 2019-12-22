import * as core from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'modal-page', loadChildren: './tab3/modal-page/modal-page.module#ModalPagePageModule' },

  {
    path: 'simple',
    loadChildren: () => import('../app/tab3/simple/simple.module').then(m => m.SimpleModule)
  },
  {
    path: '',
    loadChildren: () => import('../app/tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'infos',
    loadChildren: () => import('./informations/informations.module').then(m => m.InformationsModule)
  },
  { path: 'second/:price', loadChildren: './second/second.module#SecondPageModule' },
  {
    path: 'infosdetails',
    loadChildren: () => import('./infosdetails/infosdetails.module').then(m => m.InfosdetailsModule)
  },
  {
    path: 'complexe',
    loadChildren: () => import('./tab3/complexe/complexe.module').then(m => m.ComplexeModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },

  {
    path: 'lostpassword',
    loadChildren: () => import('./lostpassword/lostpassword.module').then(m => m.LostpasswordModule)
  },
  {
    path: 'updatemydata',
    loadChildren: () => import('./updatemydata/updatemydata.module').then(m => m.UpdatemydataModule)
  },

  {
    path: 'interaction',
    loadChildren: () => import('./tab3/interaction/interaction.module').then(m => m.InteractionModule)
  }
  ,

  {
    path: 'dci',
    loadChildren: () => import('./tab3/dci/dci.module').then(m => m.DciModule)
  }
  ,
  {
    path: 'cartographie',
    loadChildren: () => import('./tab5/tab5.module').then(m => m.Tab5PageModule)
  }
  ,
  {
    path: 'account',
    loadChildren: () => import('./tab3/account/account.module').then(m => m.AccountModule)
  }
  ,
  {
    path: 'quotation',
    loadChildren: () => import('../app/quotations/quotations.module').then(m => m.QuotationsModule)
  }
  ,
  {
    path: 'roi',
    loadChildren: () => import('./roi/roi.module').then(m => m.RoiPageModule)
  }
  ,
  {
    path: 'students',
    loadChildren: () => import('./tab3/accountStudent/account.module').then(m => m.AccountModule)
  }
  ,

  {
    path: 'professional',
    loadChildren: () => import('./tab3/authentication-users/authentification-users.module').then(m => m.AuthentificationUsersModule)
  },
  {
    path: 'second',
    loadChildren: () => import('./second/second.module').then(m => m.SecondPageModule)
  }


];
@core.NgModule({
  imports:
    [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
  exports:
    [
      RouterModule
    ]
})
export class AppRoutingModule { }
