import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: '../../../../styles/authform.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (res) => {
        const isAdmin = this.auth.isAdmin();
        this.router.navigate([isAdmin ? '/admin/dashboard' : '/confessions']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Login failed';
        this.loading = false;
      },
    });
  }
}
