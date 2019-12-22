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


  constructor(
    private formBuilder: FormBuilder,
    private textSearchService: TextSearchService) { }
    private votretext: Observable<User>;

  ngOnInit() {
    this.form = this.formBuilder.group({
      votretext: ['', [Validators.required, Validators.minLength(3)]]
    });

  }
  submit() {
    if (this.form.valid) {
      const med = (this.form.value.votretext);
      this.med = this.textSearchService.getCode(med).subscribe((data) => {
        this.myResponse = data;
        //console.log(data);
        //console.log(this.votretext);
      });
    }
  }
}
