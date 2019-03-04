import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: UsersService,
    private router: Router
  ) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    return this.authService.isAuthenticated();
  }
}
