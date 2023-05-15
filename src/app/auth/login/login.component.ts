import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  saveButtonText: string = 'Login';

  Login = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}
  // to login
  proceedLogin() {
    this.saveButtonText = 'Logging In';
    if (this.Login.valid) {
      this.authService.proceedLogin(this.Login.value).subscribe((res) => {
        localStorage.setItem('access_token', JSON.stringify(res.access_token));
        localStorage.setItem(
          'refresh_token',
          JSON.stringify(res.refresh_token)
        );
        localStorage.setItem('token_type', JSON.stringify(res.token_type));
        localStorage.setItem('expires_in', JSON.stringify(res.expires_in));

        this.getUserInfo();
      });
    } else {
      alert('Login failed');
    }
  }
  // to get user info
  getUserInfo() {
    this.authService.getUserInfo().subscribe((res) => {
      if (res.isSuccess) {
        this.authService.setUserInfo(res.result[0]);
        localStorage.setItem('userInfo', JSON.stringify(res.result[0]));
        this.route.navigateByUrl('/dashboard');
      }
    });
  }
}
