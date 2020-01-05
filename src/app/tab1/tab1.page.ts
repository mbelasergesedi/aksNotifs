import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notification.service';
import { map } from 'rxjs/operators';
import { AuthService } from './../services/AuthService';
import { ConnectionService } from 'ng-connection-service';
import { Subject } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { RoiService } from './../services/roi.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pushes: any = [];
  // Nouvelles
  ObjNouvelles = {
    categorie: 'Nouvelles',
    maxdata: 10
  };
  // Alertes
  ObjAlertes = {
    categorie: 'Alertes',
    maxdata: 10
  };

  // Ordre des pharmaciens
  ObjOpharmaciens = {
    categorie: 'Opharmaciens',
    maxdata: 10
  };
  // Fermeture pharmacie
  ObjClosePharma = {
    categorie: 'closePharma',
    maxdata: 10
  };
  //   Retrait produit
  ObjRetiredPharma = {
    categorie: 'RetiredPharma',
    maxdata: 10
  };
  //   Ordre des médecins
  ObjOrdMedecins = {
    categorie: 'Omedecins',
    maxdata: 10
  };
  //   Ordre des dentistes
  ObjOrdDentistes = {
    categorie: 'ODentistes',
    maxdata: 10
  };
  //   Ordre des Kine
  ObjOrdKine = {
    categorie: 'OKine',
    maxdata: 10
  };
  //   Ordre tradi
  ObjOrdTradi = {
    categorie: 'OTradi',
    maxdata: 10
  };
  //   Ordre infis
  ObjOrdInfis = {
    categorie: 'OInfis',
    maxdata: 10
  };
  status = '';
  isConnected = true;
  interactions: any;
  rois: any;
  stat: any;
  userEmail: string;
  userName: string;
  startAt = new Subject();
  endAt = new Subject();
  navCtrl: any;
  logged: any;
  medecin: any;
  name: any;
  Appversion: any;
  subscribedParam: any;
  constructor(
    public notificationService: NotificationsService,
    public authService: AuthService,
    private fcm: FCM,
    private appVersion: AppVersion,
    private roiService: RoiService,
    private statusBar: StatusBar,
    public plt: Platform,
    public connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      } else {
        this.status = 'OFFLINE';
      }
    });
  }
  ngOnInit() {
    this.statusBar.overlaysWebView(true);
    this.appVersion.getAppName();
    this.appVersion.getPackageName();
    this.appVersion.getVersionCode();
    this.appVersion.getVersionNumber();
    this.Appversion = this.appVersion.getVersionNumber();
    // tslint:disable-next-line: no-unused-expression
    this.userEmail;
    // tslint:disable-next-line: no-unused-expression
    this.medecin;
    // tslint:disable-next-line: no-unused-expression
    this.logged;
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.logged = true;
      this.userName = this.authService.userDetails().displayName;
    } else {
      this.logged = false;
    }
    // Notifications Service
    this.notificationService
      .getNotification()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(interactions => {
        this.interactions = interactions;
      });
    // Roi
    this.roiService
      .getRoiList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(rois => {
        this.rois = rois;
      });

    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log(data);
            console.log('Received in background');
            this.pushes.push({
              body: data.body,
              title: data.title
            });
            console.log(this.pushes);
          } else {
            console.log(data);
            console.log('Received in foreground');
            this.pushes.push({
              body: data.body,
              title: data.title
            });
            console.log(this.pushes);
          }
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      });
  }
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }
}
