import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppComponent } from '../app.component';
@Injectable()
export class FcmProvider {

    private dbPath = '/alertes';
    AlertesRef: AngularFireList<AppComponent> = null;

  constructor(
    private db: AngularFireDatabase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

}
