import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../../../models/restaurant.model'; // Import the interface
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { RestaurantService } from '../../../services/restaurant.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-restaurant-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, NgFor],
  templateUrl: './restaurant-map.component.html',
  styleUrls: ['./restaurant-map.component.css'],
})
export class RestaurantMapComponent implements OnInit {
  restaurants: Restaurant[] = [];
 constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    console.log('Google Maps API chargé:', google.maps);
    this.fetchRestaurants();
  }

  fetchRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      console.log(data)
  
    });
  }

}