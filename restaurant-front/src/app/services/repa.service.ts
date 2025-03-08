import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Repa } from '../models/repa.model'; // Adjust the path to your Repa model

@Injectable({
  providedIn: 'root'
})
export class RepaService {
  private apiUrl = 'http://localhost:8080/repas'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all Repa
  getAllRepas(): Observable<Repa[]> {
    return this.http.get<Repa[]>(this.apiUrl);
  }

  // Fetch Repa by restaurant ID
  getRepasByRestaurantId(restaurantId: number): Observable<Repa[]> {
    return this.http.get<Repa[]>(this.apiUrl).pipe(
      map((repas: Repa[]) => repas.filter(repa => repa.restaurant.id === restaurantId))
    );
  }
  
  getRepaById(id: number): Observable<Repa> {
    return this.http.get<Repa>(`${this.apiUrl}/${id}`);
  }

  // Update a meal
  updateRepa(id: number, repa: Repa): Observable<Repa> {
    return this.http.put<Repa>(`${this.apiUrl}/${id}`, repa);
  }

  // Create a meal
  createRepa(repa: Repa): Observable<Repa> {
    return this.http.post<Repa>(this.apiUrl, repa);
  }

  // Delete a meal
  deleteRepa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}