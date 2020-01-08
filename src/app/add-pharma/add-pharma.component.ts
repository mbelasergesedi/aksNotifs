import { Component, OnInit } from '@angular/core';
import { VilleService } from '../services/city.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { OfficineService } from '../services/officine.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-add-pharma',
  templateUrl: './add-pharma.component.html',
  styleUrls: ['./add-pharma.component.scss'],
})
export class AddPharmaComponent implements OnInit {

  votretexte: any;
  date: Date;

  lat: any;
  lng: any;
  uuid: any;
  iddevice: any;

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
  datepostee: any;
  validation_messages = {
    email: [
      { type: 'required', message: 'Un email est obligtoire.' },
      { type: 'pattern', message: 'Entrer une  adresse valide.' }
    ]
  };
  // tslint:disable-next-line: variable-name
  pharma_form: FormGroup;
  villeRef: any;
  ville: any;

  error: any;
  model: any;
  version: any;
  manufacturer: any;
  constructor(private formBuilder: FormBuilder,
    private villeService: VilleService,
    private geolocation: Geolocation,
    private uniqueDeviceID: UniqueDeviceID,
    private officineService: OfficineService,
    private db: AngularFirestore,
    private toastController: ToastController) { }
  ngOnInit() {
    this.initForm();
    this.getVille();
  }
  getVille() {
    this.villeService.getVille().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(ville => {
      this.villeRef = ville;
      this.ville = ville;
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

  initForm() {
    // Validations patterns
    // Validations patterns
    this.pharma_form = this.formBuilder.group({
      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      denomination: new FormControl('', Validators.compose([
        Validators.required
      ])),
      adresse: new FormControl('', Validators.compose([
        Validators.required
      ])),
      autorisation: new FormControl('', Validators.compose([
        Validators.required
      ])),
      gsm: new FormControl('', Validators.compose([
        Validators.required
      ])),
      device: [],
      version: [],
      responsable: [],
      longitude: [],
      latitude: [],
      ge: [],
      frigo: [],
      model: [],
      manufacturer: [],
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }
  async tryRegister() {
    const data = this.pharma_form.value;
    console.log(data);
    this.uniqueDeviceID.get()
      .then((uuid: any) => this.uuid = uuid)
      .catch((error: any) => this.error = error);
    this.uniqueDeviceID.get()
      .then((model: any) => this.model = model)
      .catch((error: any) => this.error = error);
    this.uniqueDeviceID.get()
      .then((version: any) => this.version = version)
      .catch((error: any) => this.error = error);
    this.uniqueDeviceID.get()
      .then((manufacturer: any) => this.manufacturer = manufacturer)
      .catch((error: any) => this.error = error);
    this.officineService.OfficineCreate(data);
    const toast = this.toastController.create({
      message: 'Félicitations ! La pharmacie a été ajoutée.',
      position: 'middle',
      duration: 2000
    });
    (await toast).present();
  }
}
