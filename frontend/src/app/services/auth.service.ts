import { Injectable, Inject, PLATFORM_ID, InjectionToken, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

// Create a token to represent localStorage
export const LOCAL_STORAGE = new InjectionToken<Storage>('Browser LocalStorage', {
  providedIn: 'root',
  factory: () => {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      return window.localStorage;
    }
    return undefined as any; // Or a mock localStorage object
  }
});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 

  // Method to retrieve the current user's details
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/current`, { headers: this.getHeaders() });
  }

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object, @Inject(LOCAL_STORAGE) private localStorage: Storage) { }

  changePassword(newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, { password: newPassword }, { headers: this.getHeaders() });
  }


  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  getToken(): string | null {
    if (this.localStorage) {
      const token = this.localStorage.getItem('token');
      console.log('🔍 Retrieved Token:', token);
      return token;
    }
    return null;
  }
  
  setToken(token: string): void {
    if (this.localStorage) {
      this.localStorage.setItem('token', token);
    }
  }

  removeToken(): void {
    if (this.localStorage) {
      this.localStorage.removeItem('token');
    }
  }

  isLoggedIn(): boolean {
    if (this.localStorage) {
      return !!this.localStorage.getItem('token');
    }
    return false;
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
}
