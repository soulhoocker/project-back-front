import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponseDTO, LoginRequest, RegisterRequest } from '../../../models/auth.model';
import { jwtDecode } from 'jwt-decode';


export interface DecodedToken {
  id: string;
  nom: string;
  prenom: string;
  email: number;
  roles:string[];

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/transporter';

  constructor(private http: HttpClient) {}
  getToken(): string {
    return localStorage.getItem('auth_token') || ''; // Adjust if needed based on your storage method
  }



  getCurrentUser(): DecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response: AuthResponseDTO) => {
        localStorage.setItem('auth_token', response.token); // ✅ Enregistrement du token ici
      }),
      catchError(this.handleError)
    );
  }

  signup(data: RegisterRequest): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.apiUrl}/auth/register`, data).pipe(
      catchError(this.handleError)  // Handle the error for signup too
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/auth/auth/reset-password`,  // Fixed URL (remove duplicate /auth)
      { email },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`),
        responseType: 'text'  // Tell Angular to expect text response
      }
    ).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Full error response:', error); // Log the complete error

    let errorMessage = 'An unknown error occurred!';
    let errorDetails = {};

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
      errorDetails = { isNetworkError: true };
    } else {
      // Server-side error
      errorDetails = {
        status: error.status,
        message: error.error?.message,
        error: error.error,
        headers: error.headers,
        url: error.url
      };

      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Bad request';
          break;
        case 401:
          errorMessage = error.error?.message || 'Unauthorized - Please login again';
          break;
        case 403:
          errorMessage = error.error?.message || 'Forbidden - You lack necessary permissions';
          break;
        case 404:
          errorMessage = error.error?.message || 'Resource not found';
          break;
        case 500:
          errorMessage = error.error?.message || 'Internal server error';
          break;
        default:
          errorMessage = error.error?.message || `HTTP Error: ${error.status}`;
      }
    }

    // Return both the message and details
    return throwError(() => ({
      message: errorMessage,
      details: errorDetails,
      originalError: error
    }));
  }


}
