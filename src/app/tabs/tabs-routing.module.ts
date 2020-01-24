import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


// Import canActivate guard services
import { AuthGuard } from '../shared/guard/auth.guard';
import { SecureInnerPagesGuard } from '../shared/guard/secure-inner-pages.guard.ts.guard';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'tab1',
          children:
            [
              {
                path: '',
                loadChildren: '../tab1/tab1.module#Tab1PageModule'
              }
            ]
        },
        {
          path: 'tab2',
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
          path: 'tab8',
          children:
            [
              {
                path: '',
                loadChildren: '../tab8/tab8.module#Tab8PageModule'
              }
            ]
        },
        {
          path: 'addpharma',
          children:
            [
              {
                path: '',
                loadChildren: '../add-pharma/add-pharma.module#AddPharmaModule'
              }
            ]
        },
        {
          path: 'login',
          children:
            [
              {
                path: '',
                loadChildren: '../login/login.module#LoginModule'
              }
            ]
        },


        {
          path: 'signalement',
          children:
            [
              {
                path: '',
                loadChildren: '../signalement/signalement.module#SignalementModule'
              }
            ]
        },
        {
          path: 'alloffre',
          children:
            [
              {
                path: '',
                loadChildren: '../all-offres/all-offres.module#AllOffreModule'
              }
            ]
        },
        {
          path: 'alldemande',
          children:
            [
              {
                path: '',
                loadChildren: '../alldemande/alldemande.module#AlldemandeModule'
              }
            ]
        },
        {
          path: 'offre',
          children:
            [
              {
                path: '',
                loadChildren: '../offre/offre.module#OffreModule'
              }
            ]
        },
        {
          path: 'createaccount',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/account/account.module#AccountModule'
              }
            ]
        },

        {
          path: 'students',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/accountStudent/account.module#AccountModule'
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
          path: 'quotation',
          children:
            [
              {
                path: '',
                loadChildren: '../quotations/quotations.module#QuotationsModule'
              }
            ]
        },
        {
          path: 'cartographie',
          children:
            [
              {
                path: '',
                loadChildren: '../tab5/tab5.module#Tab5PageModule'
              }
            ]
        },
        {
          path: 'simple',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/simple/simple.module#SimpleModule'
              }
            ]
        },
        {
          path: 'dci',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/dci/dci.module#DciModule'
              }
            ]
        },
        {
          path: 'sign-in',
          children:
            [
              {
                path: '',
                loadChildren: '../components/sign-in/sign-in.module#SignInModule'
              }
            ]
        },
        {
          path: 'sign-up',
          children:
            [
              {
                path: '',
                canActivate: [SecureInnerPagesGuard],
                loadChildren: '../components/sign-up/sign-up.module#SignUpModule'
              }
            ]
        },
        {
          path: 'forgot-password',
          children:
            [
              {
                path: '',
                canActivate: [SecureInnerPagesGuard],
                loadChildren: '../components/forgot-password/forgot-password.module#ForgotPasswordModule'
              }
            ]
        },
        {
          path: 'verify-email-address',
          children:
            [
              {
                path: '',
                canActivate: [SecureInnerPagesGuard],
                loadChildren: '../components/forgot-password/forgot-password.module#VerifyEmailModule'
              }
            ]
        },

        {
          path: 'interaction',
          children:
            [
              {
                path: '',
                loadChildren: '../tab3/interaction/interaction.module#InteractionModule'
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