import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant.model';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { CommandService } from '../../../services/command.service';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [GoogleMapsModule, FormsModule, NgIf],
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  restaurant: Restaurant = {
    id: 0,
    name: '',
    moughataa: '',
    commune: '',
    latitude: 0,
    longitude: 0,
    utilisateur: null // Replace with appropriate user data
  };
  email: string = '';

  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService,
    private auth: AuthService,
    private command: CommandService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.auth.getEmail(); // Ensure getEmail is a method or property
    this.loadUserByEmail(this.email);
  }

  loadUserByEmail(email: string): void {
    this.command.getUserByEmail(email).subscribe({
      next: (user) => {
        this.restaurant.utilisateur = user; // Assign the user to the restaurant object
      },
      error: (err) => {
        console.error('Failed to load user:', err);
        alert('Failed to load user data. Please try again.');
      }
    });
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.restaurant.latitude = event.latLng.lat();
      this.restaurant.longitude = event.latLng.lng();
    }
  }

  onSubmit(): void {
    if (!this.restaurant.name || !this.restaurant.moughataa || !this.restaurant.commune || !this.restaurant.latitude || !this.restaurant.longitude) {
      alert('Please fill all fields and select a location on the map.');
      return;
    }

    if (!this.restaurant.utilisateur) {
      alert('User data is missing. Please try again.');
      return;
    }

    this.restaurantService.addRestaurant(this.restaurant).subscribe({
      next: () => {
        alert('Restaurant added successfully!');
        this.router.navigate(['/restaurant']);
      },
      error: (err) => {
        console.error('Error adding restaurant:', err);
        alert('Failed to add restaurant. Please try again.');
      }
    });
  }
}