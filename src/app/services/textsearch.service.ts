import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface User {
  total: number;
  results: Array<object>;
}
const CodeObject = {
  votretexte: '',
};
@Injectable()
export class TextSearchService {
  baseURL = 'http://www.aksantimed.com/sms/remotepharma.cfc?';
  HttpClient: any;
  constructor(
    private http: HttpClient) { }
  getCode(med): Observable<User[]> {
    return this.http.get<User[]>(this.baseURL + 'method=' + 'findmedAngular' + '&med=' + med);
  }
}

