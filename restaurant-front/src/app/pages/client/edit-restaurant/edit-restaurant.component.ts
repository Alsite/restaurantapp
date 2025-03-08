import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../../../models/restaurant.model';
import { RestaurantService } from '../../../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-restaurant',
  standalone: true,
  imports: [FormsModule, GoogleMapsModule,NgIf], // Import FormsModule and GoogleMapsModule
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {
  restaurant: Restaurant = {
    id: 0,
    name: '',
    moughataa: '',
    commune: '',
    latitude: 0,
    longitude: 0,
    utilisateur: null // Replace with appropriate user data
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRestaurant(+id); // Load the restaurant data
    }
  }

  loadRestaurant(id: number): void {
    this.restaurantService.getRestaurant(id).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
      },
      error: (err) => {
        console.error('Failed to load restaurant:', err);
        alert('Failed to load restaurant. Please try again.');
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

    this.restaurantService.updateRestaurant(this.restaurant).subscribe({
      next: () => {
        alert('Restaurant updated successfully!');
        this.router.navigate(['/restaurant']); // Navigate back to the restaurant list
      },
      error: (err) => {
        console.error('Error updating restaurant:', err);
        alert('Failed to update restaurant. Please try again.');
      }
    });
  }
}