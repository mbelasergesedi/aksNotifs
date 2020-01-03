import { Component } from '@angular/core';
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
export class Tab1Page {
  pushes: any = [];
  constructor(private fcm: FCM, public plt: Platform) {
    this.plt.ready()
      .then(() => {
        this.fcm.onNotification().subscribe(data => {
          if (data.wasTapped) {
            console.log(data)
            console.log("Received in background");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          } else {
            console.log(data)
            console.log("Received in foreground");
            this.pushes.push({
              body: data.body,
              title: data.title
            })
            console.log(this.pushes)
          };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
          // Register your new token in your back-end if you want
          // backend.registerToken(token);
        });
      })
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