import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { CommandService } from '../../../services/command.service';
import { Repa } from '../../../models/repa.model';
import { Utilisateur } from '../../../models/Utilisateur.model';
import { switchMap } from 'rxjs/operators'; // Import switchMap for chaining API calls
import { AuthService } from '../../../services/auth.service';
import { Command } from '../../../models/command.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, CurrencyPipe, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$; // Declare cart$ without initialization
  orderName: string = ''; // Property to store the order name
  utilisateur: Utilisateur | null = null; // Property to store the user data

  constructor(
    private cartService: CartService, // Inject CartService
    private commandService: CommandService,
    private authService: AuthService // Inject CommandService
  ) {
    // Initialize cart$ inside the constructor
    this.cart$ = this.cartService.cart$;
  }

  // Remove an item from the cart
  removeFromCart(item: Repa): void {
    this.cartService.removeFromCart(item);
  }
  placeOrder(): void {
    const cart = this.cartService.getCart();
    if (!cart || !this.orderName) {
      console.error('Cart is empty or order name is missing.');
      return;
    }
  
    // Get the user's email from the token
    const userEmail = this.authService.getEmail();
    if (!userEmail) {
      console.error('Email not found in token.');
      return;
    }
  
    // Fetch the user by email and place the order
    this.commandService.getUserByEmail(userEmail).pipe(
      switchMap((user: Utilisateur) => {
        this.utilisateur = user; // Store the fetched user
  
        // Create the order object with the correct structure
        const order: Command = {
          id: 0, 
          name: this.orderName,
          tprice: cart.items.reduce((total, item) => total + item.price, 0), //   
          restaurants: { 
            id: cart.restaurantId,
            name: '', // Optional fields
            moughataa: '',
            commune: '',
            latitude: 0,
            longitude: 0
          },
          utilisateur: { // Match the structure expected by the backend
            id: user.id,
            name: user.name, // Optional fields
            email: user.email,
            password: user.password,
            role: user.role
          },
          repa: cart.items.map(item => ({ // Match the structure expected by the backend
            id: item.id,
            name: item.name, // Optional fields
            price: item.price,
          }))
        };
  
        console.log('Order Payload:', order);
  
        // Call the CommandService to create the order
        return this.commandService.addCommand(order);
      })
    ).subscribe({
      next: (response) => {
        console.log('Order placed successfully:', response);
        this.cartService.clearCart(); // Clear the cart after placing the order
        this.orderName = ''; // Reset the order name
      },
      error: (error) => {
        console.error('Error placing order:', error);
      }
    });
  }
}