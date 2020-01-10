import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TextSearchService, User } from '../../services/textsearch.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss'],
})
export class SimpleComponent implements OnInit {
  title = 'angular-http-spinner-loader';
  form: FormGroup;
  med: any;
  myResponse;
  medterm: any;
  occurence: any;

  constructor(
    private formBuilder: FormBuilder,
    private textSearchService: TextSearchService) { }
    public votretext: Observable<User>;

  ngOnInit() {
    this.form = this.formBuilder.group({
      votretext: ['', [Validators.required, Validators.minLength(3)]]
    });

  }
  submit() {
    if (this.form.valid) {
      this.medterm = (this.form.value.votretext);
      this.med = this.textSearchService.getCode( this.medterm).subscribe((data) => {
        this.myResponse = data;
        // console.log(this.myResponse.length);
        this.occurence = this.myResponse.length;
        //console.log(this.votretext);
      });
    }
  }L
}
