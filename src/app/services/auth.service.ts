import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.apiUrl}/oauth/login/google`;

  constructor(private router: Router, private cookieService: CookieService) {}

  public getLogin(): void {
    window.location.href = this.authUrl;
  }

  public isLogged(): string {
    return this.cookieService.get('JWT');
  }

  public checkIsLogged(): boolean {
    return this.cookieService.check('JWT');
  }

  public logout(): void {
    this.cookieService.delete('JWT', '/');
    this.router.navigateByUrl('/login');
  }
}
