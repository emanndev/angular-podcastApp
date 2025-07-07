import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../shared/utils/services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          const user = res.data.user;
          const role = user?.role;
          this.toast.show("You've successfully Logged In", 'success');
          this.router.navigate([
            role === 'admin' ? '/admin/dashboard' : '/confessions',
          ]);
        } else {
          // alert('Login failed: ' + res.message);
          this.toast.show('Log In failed, try again', 'error');
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid credentials.');
      },
    });
  }
}
