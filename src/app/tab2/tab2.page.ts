import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ResultatVerificationService, User } from '../services/verifcode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  code: Subscription;
  two: Subscription;
  UniqueDeviceID: Subscription;
  uuid: any;
  [x: string]: any;
  title = 'angular-http-spinner-loader';
  status = true;
  form: FormGroup;
  med: any;
  myResponse;
  latitude: number;
  longitude: number;
  cordonnees: number;
  constructor(private formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private statusBar: StatusBar,
              private uniqueDeviceID: UniqueDeviceID,
              private resultatVerificationService: ResultatVerificationService,
  ) { }
  private votretext: Observable<User>;
  validation_messages = {
    votretext: [
      { type: 'required', message: 'Vous devez renseigner un code de 12 chiffres.' },
      { type: 'pattern', message: 'Vous devez renseigner un code de 12 chiffres.' }
    ]
  };
  ngOnInit() {
     this.statusBar.overlaysWebView(true);
     this.form = this.formBuilder.group({
      votretext: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])]
    });
     this.geolocation.getCurrentPosition().then((resp) => {
    }).catch((error) => {
      // console.log('Error getting location', error);
    });

     const watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // console.log(data.coords.latitude);
      // this.latitude = data.coords.latitude;
      // console.log(data.coords.longitude);
      // this.longitude = data.coords.longitude;
       this.cordonnees = this.latitude;
       // console.log(this.cordonnees);
    });
     this.uniqueDeviceID.get()
      .then((uuid: any) => this.uuid = uuid)
      .catch((error: any) => this.error = error);
  }
  submit() {
    if (this.form.valid) {
      const mycode = (this.form.value.votretext);
      this.code = this.resultatVerificationService.getResponse(mycode, this.cordonnees).subscribe((data) => {
        this.myResponse = data;
        // console.log(data);
      });
    }
  }
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}

