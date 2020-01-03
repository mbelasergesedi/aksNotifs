import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  code: string;
  latitude: string;
  longitude: string;
  device: string;
  datepostee: string;
  cordonnees: string;
  mycode: string;
  lat: string;
  lng: string;
  uuid: string;
}
const CodeObject = {
  votrecode: '',
};
@Injectable()
// tslint:disable-next-line: class-name
export class ResultatVerificationService {


  baseURL = 'https://www.aksantimed.com/ionic/remotepharma.cfc?';
  HttpClient: any;
  constructor(

    private http: HttpClient) { }
  getResponse(code, cordonnees): Observable<User[]> {
    return this.http.get<User[]>
      (this.baseURL + 'method=' + 'choosepharma' + '&medcode=' + code + '&coordonees=' + cordonnees );

  }
}
//medcode:medcode,latitude:latitude,phoneNumber:phoneNumber,deviceid:deviceid