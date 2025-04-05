import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';
import { UserStorageService } from '../../services/storage/user-storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router,
    private userstorageservice: UserStorageService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required, Validators.email]], // Added email validation
      password: [null, [Validators.required]],
    });
  }


  
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Login form submitted:', this.validateForm.value);
  
      this.authService
        .login(
          this.validateForm.get('userName')!.value,
          this.validateForm.get('password')!.value
        )
        .subscribe(
          (res) => {
            console.log('Login successful:', res.body);
  
            if (res.body && res.body.token) {
              this.userstorageservice.saveUser(res.body);
              this.userstorageservice.saveToken(res.body.token);
            } else {
              console.error('Error: Missing token or user data in response');
              this.notification.error('Login Failed', 'Invalid server response', { nzDuration: 5000 });
              return;
            }
  
            const role = UserStorageService.getUserRole();
            console.log('Retrieved user role:', role);
  
            if (role === 'COMPANY') {
              this.router.navigate(['/company/dashboard']); // ✅ Redirect to Company Dashboard
            } else if (role === 'CLIENT') {
              this.router.navigate(['/client/dashboard']); // ✅ Redirect to Client Dashboard
            } else {
              console.warn('Unknown role, redirecting to home page');
              this.router.navigate(['/']);
            }
          },
          (error) => {
            console.error('Login error:', error);
            this.notification.error('Error', 'Invalid Credentials', { nzDuration: 5000 });
          }
        );
    } else {
      this.notification.error('Error', 'Please fill in the required fields', { nzDuration: 5000 });
    }
  }
  
















}