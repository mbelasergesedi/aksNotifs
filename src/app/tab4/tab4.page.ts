import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { VilleService } from '../services/city.service';
import { QrySignalementService } from '../services/signalement.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customers } from '../model/customers.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  signalement_form: FormGroup;
  profform: FormGroup;
  result;
  latitude: any;
  longitude: any;
  errorMessage = '';
  enr: any;
  itemCollection: any;
  MyData: any;
  items: Observable<[any]>;
  enregistrement: any;
  [x: string]: any;
  list: Customers[];
  progress: number;
  imageDoc: string;
  successMessage: string;
  ville: any;
  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private villeService: VilleService,
              private db: AngularFirestore,
              private camera: Camera,
              private statusBar: StatusBar,
              private geolocation: Geolocation,
              private uniqueDeviceID: UniqueDeviceID,
              private file: File,
              private toastController: ToastController,
              private qrySignalementService: QrySignalementService,
              private router: Router) {

  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.statusBar.overlaysWebView(true);
    this.initForm();
    this.getVille();
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      console.log(resp.coords.latitude);
      this.latitude = resp.coords.latitude;
      // resp.coords.longitude
      console.log(resp.coords.longitude);
      this.longitude = resp.coords.longitude;
    }).catch((error) => {
      //  console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    }
    );
  }
  async pickImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo);
    } catch (e) {
      // console.log(e.message);
    }
  }

  // FILE STUFF
  // tslint:disable-next-line: variable-name
  makeFileIntoBlob(_imagePath: string) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = '';
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          const { name, nativeURL } = fileEntry;

          // get the path..
          const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          // console.log('path', path);
          // console.log('fileName', name);

          fileName = name;
          this.imageDoc = fileName;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          const imgBlob = new Blob([buffer], {
            type: 'image/jpeg'
          });
          // console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob,
          });
        })
        .catch(e => reject(e));
    });
  }

  /**
   *

   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    // console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + _imageBlobInfo.fileName);

      const uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        'state_changed',
        // tslint:disable-next-line: variable-name
        (_snapshot: any) => {
          console.log(
            'snapshot progress ' +
            (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
          this.progress = (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100;
        },
        // tslint:disable-next-line: variable-name
        _error => {
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
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
  }
  initForm() {
    // Validations patterns Signalement
    this.signalement_form = this.formBuilder.group({
      medicament: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      telephone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
      ])),
    });
    // Validations patterns ListProf
    this.profform = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([Validators.required,
      ])),
      categorie: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });
  }
  tryRegister() {
    const data = this.profform.value;
    const lenom = data.nom;
    // console.log(lenom.toUpperCase( ));
    const nomS = lenom.toUpperCase();
    this.nom = data.nom;
    this.categorie = data.categorie;
    this.itemCollection = this.db.collection<any[]>('customers', ref => ref.where('data.profession', '==',
      data.categorie).where('data.nom', '==', nomS));
    this.items = this.itemCollection.valueChanges().subscribe((val: any) => {
      this.enregistrement = val;
    }
    );
  }
  async Signalement() {
    const data = this.signalement_form.value;
    this.qrySignalementService.signalmentCreate(data);
    const toast = await this.toastController.create({
      message: 'Vous signalement a été envoyé.',
      position: 'middle',
      duration: 4000
    });
    toast.present();
    this.navCtrl.navigateForward('tabs/tab1');
  }
}
