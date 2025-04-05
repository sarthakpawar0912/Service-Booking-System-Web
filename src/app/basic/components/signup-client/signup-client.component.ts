import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup-client',
  standalone: false,
  templateUrl: './signup-client.component.html',
  styleUrl: './signup-client.component.scss'
})
export class SignupClientComponent {
  
  
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      phone: [null, [Validators.pattern(/^[0-9]{10}$/)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      checkPassword: [null, [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('checkPassword')?.value
      ? null
      : { mismatch: true };
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const signupData = {
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        name: this.validateForm.value.name,
        lastname: this.validateForm.value.lastname,
        phone: this.validateForm.value.phone
      };

      this.authService.registerClient(signupData).subscribe({
        next: (res) => {
          this.notification.success('SUCCESS', 'Signup Successful', { nzDuration: 5000 });
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          let errorMessage = 'An error occurred during signup';
          if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message;
          } else if (err.status === 406) {
            errorMessage = err.error || 'Client already exists with this email!';
          } else if (err.error && typeof err.error === 'string') {
            errorMessage = err.error;
          } else if (err.message) {
            errorMessage = err.message;
          }
          
          this.notification.error('ERROR', errorMessage, { nzDuration: 5000 });
          console.error('Signup error:', err);
        }
      });
    }
  }
}