import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ResultatVerificationService, User } from '../services/verifcode.service';
import { QryValidationService } from '../services/datavalidation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  code: Subscription;
  lat: any;
  lng: any;
  uuid: any;
  iddevice: any;
  two: Subscription;
  UniqueDeviceID: Subscription;
  [x: string]: any;
  title = 'angular-http-spinner-loader';
  status = true;
  form: FormGroup;
  formValidation: FormGroup;
  med: any;
  myResponse;
  latitude: number;
  longitude: number;
  device: number;
  cordonnees: number;
  date: Date;
  datepostee: Date;
  constructor(private formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private qryValidationService: QryValidationService,
              private statusBar: StatusBar,
              private uniqueDeviceID: UniqueDeviceID,
              private resultatVerificationService: ResultatVerificationService,
  ) { }
  // tslint:disable-next-line: variable-name
  validation_messages = {
    votretext: [
      { type: 'required', message: 'Vous devez renseigner un code de 12 chiffres.' },
      { type: 'pattern', message: 'Vous devez renseigner un code de 12 chiffres.' }
    ]
  };
  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.date = new Date();
    this.statusBar.overlaysWebView(false);
    this.form = this.formBuilder.group({
      votretext: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      latitude: [],
      device: [],
      datepostee: [],
      longitude: []
    });
    this.geolocation.getCurrentPosition(
      {
        maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true
      }
    ).then((resp) => {
      // alert(JSON.stringify(resp.coords));
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }, er => {
    }).catch((error) => {
    });
    this.uniqueDeviceID.get()
      .then((uuid: any) => this.uuid = uuid)
      .catch((error: any) => this.error = error);
  }
  submit() {
    if (this.form.valid) {
      const data = this.form.value;
      const mycode = (data.votretext);
      this.code = this.resultatVerificationService.getResponse(mycode, this.lat).subscribe((MYdata) => {
        this.myResponse = MYdata;
        console.log(data);
        this.qryValidationService.ValidationCreate(data);
      });
    }
  }
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}

