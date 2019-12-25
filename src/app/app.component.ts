import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/AuthService';
import { environment } from './environments/environment';
import * as firebase from 'firebase';
import { ConnectionService } from 'ng-connection-service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private fcm: FCM,
    private router: Router,
    private toastCtrl: ToastController,
    private statusBar: StatusBar,
    public authenticationService: AuthService,
    private connectionService: ConnectionService,
    private appMinimize: AppMinimize,
    private menu: MenuController
  ) { }
  // tslint:disable-next-line: member-ordering
  isConnected: any;
  status: string;
  ngOnInit() {
    this.fcm.getToken().then(token => {
      console.log(token);
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
    });
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigate([data.landing_page, data.price]);
      } else {
        console.log('Received in foreground');
        this.router.navigate([data.landing_page, data.price]);
      }
    });
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
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
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      console.log('exit should happen');
      navigator['app'].exitApp();
    });
  }
}
