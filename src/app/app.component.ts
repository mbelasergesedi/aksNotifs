import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/AuthService';
import { environment } from './environments/environment';
import * as firebase from 'firebase';
import { ConnectionService } from 'ng-connection-service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public authenticationService: AuthService,
    private connectionService: ConnectionService
  ) { }
  // tslint:disable-next-line: member-ordering
  isConnected: any;

  status: string;
  ngOnInit() {
    this.splashScreen.show();
    this.splashScreen.hide();
    firebase.initializeApp(environment.firebase);
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'Connecté à Internet';
        // tslint:disable-next-line: no-unused-expression
      } else {
        // tslint:disable-next-line: no-unused-expression
        !this.isConnected;
      }
      {
        this.status = 'Pas Connecté à Internet';
      }
    });
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          this.navCtrl.navigateForward('tabs/tab1');
        }, false);
      });
      this.statusBar.styleDefault();
    });
  }
}
