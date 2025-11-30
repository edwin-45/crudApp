import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';
  private tokenKey = 'auth_token';
  private authenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  public authenticated$ = this.authenticatedSubject.asObservable();

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            this.authenticatedSubject.next(true);
          }
        })
      );
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authenticatedSubject.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    // Verificar si el token está expirado
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convertir a milisegundos
      return Date.now() < expiry;
    } catch (e) {
      return false;
    }
  }
}
