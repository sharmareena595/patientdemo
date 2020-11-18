import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { SessionStorageService } from 'angular-web-storage';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = true;
  message;
  token;
  remember: boolean = false;

  constructor(
    private loginService: LoginService,
  //  private localStorage: SessionStorageService,
    private router: Router,
    private route: ActivatedRoute, 
    public dialog: MatDialog,

  ) {

    
    //this.translate.setDefaultLang('en');

  //   if (this.localStorage.get('username')) {

  //     this.router.navigate(['/dashboard']);
  //  }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, Validators.required)
    })

    this.getRememberData();

  }

  checkLogin() {
    ////console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.submitted = true;
      //console.log(response);

      if (this.remember) {
        this.setItem(this.loginForm.value.username, this.loginForm.value.password);
      } else {
        this.setItem(null, null);
      }
      
    } else {
      this.submitted = false;
    }
  }

  async getRememberData() {

    const username = await Storage.get({ key: 'username' });
    const password = await Storage.get({ key: 'password' });
    ////console.log(username.value + '/....' + password.value);
    if (username.value && username.value !== 'null' && password.value && password.value !== 'null') {
      this.remember = true;
      this.loginForm.controls['username'].setValue(username.value);
      this.loginForm.controls['password'].setValue(password.value);
    }
  }

  rememberMe($event) {
    ////console.log($event);
    if ($event.checked) {
      this.remember = true;
    } else {
      this.remember = false;
    }
  }

  async setItem(username, password) {
    await Storage.set({
      key: 'loginUsername',
      value: this.loginForm.value.username
    });
    await Storage.set({
      key: 'loginPassword',
      value: this.loginForm.value.password
    });
    await Storage.set({
      key: 'username',
      value: username
    });
    await Storage.set({
      key: 'password',
      value: password
    });

    this.router.navigate(['/dashboard']);
  }
}
