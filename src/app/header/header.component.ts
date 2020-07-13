import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  authenticationSubscription: Subscription;
  authorizationSubscription: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    this.isAdmin= this.authService.getIsAdmin();
    this.authenticationSubscription = this.authService.getAuthListener().
      subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.authorizationSubscription = this.authService.getAdminListener()
          .subscribe(isAdmin => {
            this.isAdmin = isAdmin;
          });
      });

  }

  onLogout() {
    this.authService.logoutUser();
  }

  ngOnDestroy() {
    this.authenticationSubscription.unsubscribe();
  }

}
