import { Component, OnInit } from '@angular/core';
import {User, IUserResponse} from './user.class';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from './app.service';
import {switchMap, debounceTime} from 'rxjs/operators';
import {Observable} from 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  filteredUsers: Observable<IUserResponse>;
  usersForm: FormGroup;
  
  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    })

    this.filteredUsers = this.usersForm.get('userInput').valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => this.appService.search({name: value}, 1))
      );
  }

  displayFn(user: User) {
    if (user) { return user.name; }
  }
  
}
