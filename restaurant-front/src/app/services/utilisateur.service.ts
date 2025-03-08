import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/Utilisateur.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8080/users'; // Replace with your API URL

  constructor(private http: HttpClient,private auth:AuthService) {}

  getUserById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }
  
  getUserByEmail(): Observable<Utilisateur> {
    const email = this.auth.getEmail()
    return this.http.get<Utilisateur>(`${this.apiUrl}/email/${email}`);
  }
  updateUser(user: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.apiUrl}/${user.id}`, user);
  }
}