import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ResultatVerificationService, User } from '../services/verifcode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { QryValidationService } from '../services/datavalidation.service';
@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit, OnDestroy {
  code: Subscription;
  dataV: any;
  lat: any;
  lng: any;
  two: Subscription;
  UniqueDeviceID: Subscription;
  uuid: any;
  [x: string]: any;
  title = 'angular-http-spinner-loader';
  status = true;
  form: FormGroup;
  formValidation: FormGroup;
  med: any;
  myResponse;
  latitude: number;
  longitude: number;
  cordonnees: number;
  constructor(private formBuilder: FormBuilder,
              private geolocation: Geolocation,
              private qryValidationService: QryValidationService,
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
    this.geolocation.getCurrentPosition(
      {
        maximumAge: 1000, timeout: 5000,
        enableHighAccuracy: true
      }
    ).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      // alert("r succ"+resp.coords.latitude)
      alert(JSON.stringify(resp.coords));

      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }, er => {
      // alert("error getting location")
      alert('Can not retrieve Location');
    }).catch((error) => {
      // alert('Error getting location'+JSON.stringify(error));
      alert('Error getting location - ' + JSON.stringify(error));
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
          //console.log(data);
        this.qryValidationService.ValidationCreate(this.form);
      });
    }
  }
  ngOnDestroy() {
    // We'll throw an error if it doesn't
  }
}

