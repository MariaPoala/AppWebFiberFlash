import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private LOGIN_URL = 'http://127.0.0.1:8000/api/';
  private tokenKey = 'authToken';
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(usuario: string, password: string): Observable<any> {
    console.log(this.httpClient.post<any>(this.LOGIN_URL + 'token/', { usuario, password }))
    return this.httpClient.post<any>(this.LOGIN_URL + 'token/', { usuario, password }).pipe(
      tap(response => {
        if (response.token) {
          console.log('Este es el token: ', response.token)
        }
      })
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    return Date.now() < exp;
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
