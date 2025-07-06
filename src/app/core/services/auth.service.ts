import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://api.rantsnconfess.com/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAdmin() {
    const user = this.getUser();
    return user?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Observable<any> {
  return this.http.post(`${this.baseUrl}/register`, data);
}
}
