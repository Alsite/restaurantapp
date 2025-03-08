import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Command } from '../models/command.model';
import { Utilisateur } from '../models/Utilisateur.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private apiUrl = 'http://localhost:8080/commend'; // Replace with your API endpoint
  private userApiUrl = 'http://localhost:8080/users'; // Replace with your user API endpoint

  constructor(private http: HttpClient , private authService:AuthService) {}

  // Get all commands
  getAllCommands(): Observable<Command[]> {
    return this.http.get<Command[]>(this.apiUrl);
  }
  getUserByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.userApiUrl}/email/${email}`);
  }
  // Get a command by ID
  getCommandById(id: number): Observable<Command> {
    return this.http.get<Command>(`${this.apiUrl}/${id}`);
  }

  // Add a new command
  addCommand(command: Command): Observable<Command> {
    const token = this.authService.getToken(); // Assuming you have a method to get the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Command>(this.apiUrl, {name:command.
      name,
      tprice:command.tprice,
      repa:command.repa,
      utilisateur:command.utilisateur,
      restaurants:command.restaurants}, { headers });  }

  // Update a command
  updateCommand(id: number, command: Command): Observable<Command> {
    return this.http.put<Command>(`${this.apiUrl}/${id}`, command);
  }

  // Delete a command
  deleteCommand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}