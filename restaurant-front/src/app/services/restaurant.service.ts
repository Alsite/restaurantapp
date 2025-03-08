import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8080/restaurants'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<Restaurant[]> {
    const token = localStorage.getItem('jwt'); 
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    return this.http.get<Restaurant[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching restaurants:', error);
        return throwError(() => new Error('Failed to load restaurants.'));
      })
    );
  }
  getRestaurant(id:number): Observable<Restaurant> {
    const token = localStorage.getItem('jwt'); 
    const headers = token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();

    return this.http.get<Restaurant>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching restaurants:', error);
        return throwError(() => new Error('Failed to load restaurant.'));
      })
    );
  }
  getRestaurantsByCommune(commune: string): Observable<Restaurant[]> {
    const token = localStorage.getItem('jwt'); // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Restaurant[]>(`${this.apiUrl}/search/commune?commune=${commune}`,{headers});
  }
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.apiUrl, {name:restaurant.name,commune:restaurant.commune,moughataa:restaurant.moughataa,longitude:restaurant.longitude,latitude:restaurant.latitude,utilisateur:restaurant.utilisateur});
  }
  getRestaurantsByMoughataa(moughataa: string): Observable<Restaurant[]> {
    const token = localStorage.getItem('jwt'); // Retrieve token from local storage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Restaurant[]>(`${this.apiUrl}/search/moughataa?moughataa=${moughataa}`,{headers});
  }
  
  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.apiUrl}/${restaurant.id}`, restaurant);
  }
}