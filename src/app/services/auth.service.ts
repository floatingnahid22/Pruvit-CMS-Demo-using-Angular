import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private domain = environment.domain;

  private loginEndpoint = 'auth/login';
  private tokenEndpoint = 'auth/access-token';
  private userInfoEndpoint = 'user/info';
  private userProfileEndpoint = 'user/profile';

  constructor(private http: HttpClient, private router: Router) {}

  userInfo = new BehaviorSubject<any>(null);
  userInfo$ = this.userInfo.asObservable();

  setUserInfo(userInfo: any) {
    this.userInfo.next(userInfo);
  }

  userLoggedInOrNot() {
    const accessToken = localStorage.getItem('access_token');
    return accessToken !== null ? true : false;
  }

  proceedLogin(userCred: any): Observable<any> {
    const url = `${this.domain}/${this.loginEndpoint}`;
    return this.http.post(url, userCred);
  }

  getAccessToken() {
    const url = `${this.domain}/${this.tokenEndpoint}`;
    return this.http.get(url);
  }

  proceedLogout() {
    let removeAccessToken = localStorage.removeItem('access_token');
    let removeRefreshToken = localStorage.removeItem('refresh_token');
    let removeTokenType = localStorage.removeItem('token_type');
    let removeTokenExpires = localStorage.removeItem('expires_in');
    let removeUserInfo = localStorage.removeItem('userInfo');
    if (
      removeAccessToken == null &&
      removeRefreshToken == null &&
      removeTokenType == null &&
      removeTokenExpires == null &&
      removeUserInfo == null
    ) {
      this.userInfo.next(null);
      this.router.navigateByUrl('/login');
    }
  }

  getUserInfo(): Observable<any> {
    const url = `${this.domain}/${this.userInfoEndpoint}`;
    return this.http.get(url);
  }

  updateUserInfo(updatedInfo: any): Observable<any> {
    const url = `${this.domain}/${this.userProfileEndpoint}`;
    return this.http.patch(url, updatedInfo);
  }
}
