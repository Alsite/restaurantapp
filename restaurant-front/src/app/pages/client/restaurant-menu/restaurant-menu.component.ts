import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Repa } from '../../../models/repa.model';
import { RepaService } from '../../../services/repa.service';
import { Restaurant } from '../../../models/restaurant.model';
import { RestaurantService } from '../../../services/restaurant.service';
import { CartService } from '../../../services/cart.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Utilisateur } from '../../../models/Utilisateur.model';
import { UtilisateurService } from '../../../services/utilisateur.service';

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor,FormsModule],
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {
  restaurantId: string | null = null;
  repas: Repa[] = [];
  utilisateur:Utilisateur = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '' // Default role
  };
  restaurant: Restaurant | null = null;
  editingRepa: Repa | null = null; // Track the meal being edited

  constructor(
    private route: ActivatedRoute,
    private repaService: RepaService,
    private utilisateurService: UtilisateurService,

    private restaurantService: RestaurantService,
    private cartservice: CartService
  ) {}
  
  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    this.loadUser()
    if (this.restaurantId) {
      const restaurantIdNumber = +this.restaurantId;

      // Fetch Restaurant details
      this.restaurantService.getRestaurant(restaurantIdNumber).subscribe(
        (data: Restaurant) => {
          this.restaurant = data;
          console.log(this.restaurant);
        },
        (error) => {
          console.error('Error fetching Restaurant:', error);
        }
      );

      // Fetch Repa by restaurantId
      this.repaService.getRepasByRestaurantId(restaurantIdNumber).subscribe(
        (data: Repa[]) => {
          this.repas = data;
          console.log(this.repas);
        },
        (error) => {
          console.error('Error fetching Repa:', error);
        }
      );
    }
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
  addToCart(repa: Repa): void {
    if (this.restaurant) {
      this.cartservice.addToCart(this.restaurant.id, repa);
      console.log("add success");
    }
  }

  // Add a new meal
  addRepa(newRepa: Repa): void {
    if (this.restaurant) {
      newRepa.restaurant = this.restaurant;
      this.repaService.createRepa(newRepa).subscribe(
        (data: Repa) => {
          this.repas.push(data); // Add the new meal to the list
          console.log("Meal added successfully");
        },
        (error) => {
          console.error('Error adding meal:', error);
        }
      );
    }
  }

  // Edit a meal
  editRepa(repa: Repa): void {
    this.editingRepa = { ...repa }; // Set the meal to be edited
  }

  // Save the edited meal
  saveRepa(): void {
    if (this.editingRepa) {
      this.repaService.updateRepa(this.editingRepa.id, this.editingRepa).subscribe(
        (data: Repa) => {
          const index = this.repas.findIndex(r => r.id === data.id);
          if (index !== -1) {
            this.repas[index] = data; // Update the meal in the list
          }
          this.editingRepa = null; // Clear the editing state
          console.log("Meal updated successfully");
        },
        (error) => {
          console.error('Error updating meal:', error);
        }
      );
    }
  }

  // Delete a meal
  deleteRepa(id: number): void {
    this.repaService.deleteRepa(id).subscribe(
      () => {
        this.repas = this.repas.filter(repa => repa.id !== id); // Remove the meal from the list
        console.log("Meal deleted successfully");
      },
      (error) => {
        console.error('Error deleting meal:', error);
      }
    );
  }
}