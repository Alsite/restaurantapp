import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../services/restaurant.service';
import { Restaurant } from '../../../models/restaurant.model';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../../../models/Utilisateur.model';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-restaurant-list',
  standalone: true, // <-- Ensure standalone is true
  imports: [CommonModule, FormsModule, RestaurantCardComponent],
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  communeFilter: string = '';
  moughataaFilter: string = '';
  utilisateur:Utilisateur = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '' // Default role
  };
  constructor(private restaurantService: RestaurantService,
   private utilisateurService: UtilisateurService,
    private router:Router) {}

  ngOnInit(): void {
    this.fetchRestaurants();
    this.loadUser()
  }
  navigateToAddRestaurant(): void {
    this.router.navigate([
      { outlets: { client: ['client','restaurant_add'] } } // Navigate to 'restaurant_add' in the 'client' outlet
    ]);
  }
    loadUser(): void {
      this.utilisateurService.getUserByEmail().subscribe({
        next: (user) => {
          this.utilisateur = user;
        },
        error: (err) => {
          console.error('Failed to load user profile:', err);
          alert('Failed to load user profile. Please try again.');
        }
      });
    }
  
  fetchRestaurants(): void {

    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      console.log(data)
      this.filteredRestaurants = data;
    });
  }

  filterRestaurants(): void {
    this.filteredRestaurants = this.restaurants.filter((restaurant) => {
      const matchesCommune = restaurant.commune
        .toLowerCase()
        .includes(this.communeFilter.toLowerCase());
      const matchesMoughataa = restaurant.moughataa
        .toLowerCase()
        .includes(this.moughataaFilter.toLowerCase());
      return matchesCommune && matchesMoughataa;
    });
  }
  onDeleteRestaurant(id: number): void {
    // Remove the deleted restaurant from the list
    this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== id);
    this.restaurantService.deleteRestaurant(id);
    console.log('Restaurant deleted:', id);
  }
}