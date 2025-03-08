import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; 
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('Raw Response:', response); // Log the raw response
        localStorage.setItem('jwt', response.token);
        const decodedToken = this.jwtHelper.decodeToken(response.token);
        if (decodedToken && decodedToken.role) {
          localStorage.setItem('role', decodedToken.role);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
  }

  getEmail(): string {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('jwt');
    
    // If the token is not found, return an empty string
    if (!token) {
      console.error('No token found in local storage.');
      return '';
    }
  
    try {
      // Decode the token using jwtHelper
      const decodedToken = this.jwtHelper.decodeToken(token);
      
      // Check if the decoded token contains the sub claim (email)
      if (decodedToken && decodedToken.sub) {
        return decodedToken.sub; // Return the email from the sub claim
      } else {
        console.error('Email (sub claim) not found in token.');
        return ''; // Return an empty string if the sub claim is missing
      }
    } catch (error) {
      // Log any errors that occur during token decoding
      console.error('Error decoding token', error);
      return ''; // Return an empty string in case of an error
    }
  }
  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  hasAnyRole(requiredRoles: string[]): boolean {
    const userRole = this.getRole(); // Récupérer le rôle de l'utilisateur
    return requiredRoles.includes(userRole); // Vérifier si le rôle de l'utilisateur est dans la liste des rôles requis
  }
  
  getRole(): string  { 
    const token = localStorage.getItem('jwt');
    
    if (!token) {
      return '';
    }
    
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      
      if (decodedToken && decodedToken.role) {
        return decodedToken.role;
      } else {
        return '';
      }
    } catch (error) {
      console.error('Error decoding token', error);
      return ''; 
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }
}
