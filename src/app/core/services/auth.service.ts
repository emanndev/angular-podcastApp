import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../model/podcast.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          if (res.status === 'success') {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        })
      );
  }

  simulateAdminSeed(): void {
    const credentials = [
      {
        name: 'Emmanuel',
        email: 'emmanuel.nsiah@amalitechtraining.org',
        password: 'admin123',
        password_confirmation: 'admin123',
        role: 'admin',
      },
      {
        name: 'Mabel',
        email: 'mabel.hackman@amalitechtraining.org',
        password: 'admin123',
        password_confirmation: 'admin123',
        role: 'admin',
      },
    ];

    credentials.forEach((admin) => {
      this.http.post(`${this.baseUrl}/register`, admin).subscribe({
        next: (res: any) => {
          console.log('Admin registered:', res);
        },
        error: (err) => {
          console.error('Failed to seed admin:', err);
        },
      });
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return (
      user?.email === 'emmanuel.nsiah@amalitechtraining.org' ||
      user?.email === 'mabel.hackman@amalitechtraining.org' ||
      user?.role === 'admin'
    );
  }
}
