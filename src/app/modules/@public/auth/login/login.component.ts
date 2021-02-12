import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import Swal from 'sweetalert2';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('emailRemember') || '', [ Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$') ] ],
    password: [ null, Validators.required ],
    remember: [ true, Validators.required ]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.renderButton();
  }

  login(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value)
      .subscribe(resp => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('emailRemember', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('emailRemember');
        }
        this.router.navigateByUrl('/dashboard');
      }, (err) => {
        Swal.fire('Error', err.error.message, 'error');
        this.formSubmitted = false;
      });
  }

  fieldNotValid(field: string): boolean {
    return this.loginForm.get(field).invalid && this.formSubmitted;
  }

  onSuccess(googleUser): void {
    console.log('Logged in as: ' + googleUser.getAuthResponse().id_token);
  }

  onFailure(error): void {
    console.log(error);
  }

  renderButton(): void {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
  }

  async startApp() {
    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    this.attachSignIn(document.getElementById('my-signin2'));
  }

  attachSignIn(element): void {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const id_token = googleUser.getAuthResponse().id_token;
      this.userService.loginGoogle(id_token)
        .subscribe(resp => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('/dashboard');
          });
        });
    }, (error) => {
      console.log(JSON.stringify(error, undefined, 2));
    });
  }


}
