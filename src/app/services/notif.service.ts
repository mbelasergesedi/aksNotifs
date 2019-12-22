import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Firebase } from '@ionic-native/firebase';

@Injectable()
export class NotifService {

  constructor(
    private angularFirestore: AngularFirestore,
    private platform: Platform) { }

}