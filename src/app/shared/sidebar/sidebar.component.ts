import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userInfo: any;
  defaultImgURl: string = 'assets/images/defaultavatar.png';
  userUpdateForm!: FormGroup;
  userData: any;
  updatedInfo: any;
  saveButtonText: string = 'Save';

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userUpdateForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      avatar: [''],
    });

    this.authService.userInfo$.subscribe((userInfo) => {
      this.userInfo = userInfo;
      console.log('Subscribed data: ', this.userInfo);
      this.userUpdateForm.patchValue(userInfo);
    });

    this.userUpdateForm.setValue({
      firstName: this.userInfo.firstName,
      lastName: this.userInfo.lastName,
      avatar: this.userInfo.avatar,
    });
  }

  updateUserInfo() {
    this.saveButtonText = 'Saving'
    this.updatedInfo = this.userUpdateForm.value;
    this.authService.updateUserInfo(this.updatedInfo).subscribe((response) => {
      console.log('Updated data: ', response);
      this.authService.setUserInfo(response.result[0]);
      localStorage.setItem('userInfo', JSON.stringify(response.result[0]));
      this.saveButtonText = 'Saved';
    });
  }

  proceedLogout(event: Event) {
    event.preventDefault();
    this.authService.proceedLogout();
  }
}
