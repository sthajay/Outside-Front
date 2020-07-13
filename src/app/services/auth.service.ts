import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authListener = new Subject<boolean>();
  private tokenTimer: any;
  private token: string;
  private isAuthenticated: boolean = false;
  private isAdmin: boolean = false;
  private adminListener = new Subject<boolean>();
  private loginEmitter = new Subject<String>();

  constructor(private http: HttpClient, private router: Router) { }


  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  getAdminListener() {
    return this.adminListener.asObservable();
  }

  getLoginListener(){
    return this.loginEmitter.asObservable();
  }

  storeCredentials(email: string, password: string) {
    const user: User = { email: email, password: password }
    return this.http.post<{ message: string, user: User }>('http://localhost:3000/api/user/signup', user);


  }

  loginUser(email: string, password: string) {
    const user: User = { email: email, password: password };
    this.http.post<{ email: string, message: string, token: string, expiresIn: number }>('http://localhost:3000/api/user/login', user)
      .subscribe(data => {
        if (data.message === 'error') {
          this.loginEmitter.next('error');
          return;
        }
        this.token = data.token;
        if (this.token) {
          this.isAuthenticated = true;
          this.isAdmin = true;
          this.authListener.next(true);
          const expiresInDuration = data.expiresIn;
          this.setAuthTimer(expiresInDuration);
          const nowDate = new Date();
          const expirationDate = new Date(nowDate.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationDate,data.email);
          if (data.email === 'admin@outsidetech.com') {
            this.adminListener.next(true);


            this.router.navigate(['/stock']);
          } else {
            this.adminListener.next(false);
            this.router.navigate(['/shoppingCart']);
          }
        }
      },
      );
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.authListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);

  }

  autoLoginUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      if (authInformation.email === 'admin@outsidetech.com') {
        this.isAdmin=true;
      }
      this.setAuthTimer(expiresIn / 1000);
      this.authListener.next(true);
    }

  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();

    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const email = localStorage.getItem('email');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      email:email
    };
  }

  private saveAuthData(token: string, expirationDate: Date,email:string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('email',email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('email');
  }


}
