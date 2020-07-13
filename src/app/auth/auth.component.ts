import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  alertType: String = null;
  loginSubscription: Subscription;

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.loginSubscription = this.authService.getLoginListener()
      .subscribe(message => {
        if (message === 'error') {
          this.error='Please Signup First!!';
          this.alertType='alert alert-danger';
        }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.alertType = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const value = form.value;
    if (!this.isLoginMode) {
      this.authService.storeCredentials(value.email, value.password)
        .subscribe(data => {
          this.error = data.message;
          if (this.error === 'error') {
            this.error = 'Oops!An error occured when creating this user';
            this.alertType = 'alert alert-danger';
          }
          else {
            this.alertType = 'alert alert-success';
          }
        });
    } else {
      this.authService.loginUser(value.email, value.password);
    }
    this.alertType = null;
    form.reset();
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

}
