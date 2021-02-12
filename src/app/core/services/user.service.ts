import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { RegisterFormInterface } from '../../shared/interfaces/register-form.interface';
import { LoginFormInterface } from '../../shared/interfaces/login-form.interface';
import { User } from '../../shared/models/user.model';

const { base_url } = environment;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(private http: HttpClient,
              private ngZone: NgZone,
              private router: Router) {
    this.googleInit();
  }

  get userToken(): string {
    return localStorage.getItem('userToken') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get role(): string {
    return this.user.role || '';
  }

  googleInit(): Promise<any> {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '217543604247-q5ttth5jhi8rovq82bpl5sseaepbt4ck.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  checkToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/refresh`, {
      headers: {
        Authorization: this.userToken
      }
    }).pipe(
      map((resp: any) => {
        const { name, email, google, role, img = '', uid } = resp.user;
        this.user = new User(name, email, '', img, google, role, uid);
        localStorage.setItem('userToken', resp.token);
        return true;
      }),
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterFormInterface) {
    return this.http.post(`${ base_url }/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('userToken', resp.token);
        })
      );
  }

  login(formData: LoginFormInterface) {
    return this.http.post(`${ base_url }/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('userToken', resp.token);
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${ base_url }/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('userToken', resp.token);
        })
      );
  }

  updateProfile(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.role
    };
    return this.http.put(`${ base_url }/users/${ this.uid }`, data, {
      headers: {
        Authorization: this.userToken
      }
    });
  }

  logout(): void {
    localStorage.removeItem('userToken');
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
      console.log('User signed out.');
    });
  }

}
