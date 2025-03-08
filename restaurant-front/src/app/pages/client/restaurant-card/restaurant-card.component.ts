import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from '../../../models/restaurant.model';
import { RouterLink } from '@angular/router';
import { RestaurantService } from '../../../services/restaurant.service';
import { Utilisateur } from '../../../models/Utilisateur.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-restaurant-card',
  standalone: true, // Mark the component as standalone
  imports: [RouterLink,NgIf], // Import RouterLink for routing
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent {
  @Input() restaurant!: Restaurant; 
  @Input()  utilisateur!:Utilisateur;// Input property to receive restaurant data
  @Output() delete = new EventEmitter<number>(); // Event emitter for delete

  constructor(private restaurantService: RestaurantService) {}

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      this.restaurantService.deleteRestaurant(id).subscribe({
        next: () => {
          this.delete.emit(id); // Notify the parent component that the restaurant was deleted
        },
        error: (err) => {
          console.error('Failed to delete restaurant:', err);
          alert('Failed to delete restaurant. Please try again.');
        }
      });
    }
  }
}