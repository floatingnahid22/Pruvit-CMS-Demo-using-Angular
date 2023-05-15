import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}
  canActivate() {
    if (this.service.userLoggedInOrNot()) {
      return true;
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }
}
