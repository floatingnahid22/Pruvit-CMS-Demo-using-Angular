import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'pruvit-cms2.0';
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getUserInfo();

    this.authService.userInfo$.subscribe((response) => {
      console.log(response);
      if (response === null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    });
  }

  getUserInfo() {
    const localUserInfo = localStorage.getItem('userInfo');
    if (localUserInfo) {
      this.authService.setUserInfo(JSON.parse(localUserInfo));
    }
  }
}
