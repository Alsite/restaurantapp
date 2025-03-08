import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Repa } from '../models/repa.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<{ restaurantId: number, items: Repa[] } | null>(null);
  cart$ = this.cartSubject.asObservable();

  constructor() {}

  // Add an item to the cart
  addToCart(restaurantId: number, item: Repa): void {
    const currentCart = this.cartSubject.value;

    if (currentCart && currentCart.restaurantId !== restaurantId) {
      alert('You can only order from one restaurant at a time. Please clear your current cart or complete your order.');
      return;
    }

    const updatedCart = currentCart
      ? { restaurantId, items: [...currentCart.items, item] }
      : { restaurantId, items: [item] };

    this.cartSubject.next(updatedCart);
    console.log(this.cart$)
  }

  // Remove an item from the cart
  removeFromCart(item: Repa): void {
    const currentCart = this.cartSubject.value;

    if (currentCart) {
      const updatedItems = currentCart.items.filter(i => i.id !== item.id);
      this.cartSubject.next({ restaurantId: currentCart.restaurantId, items: updatedItems });
    }
  }

  // Clear the cart
  clearCart(): void {
    this.cartSubject.next(null);
  }

  // Get the current cart
  getCart(): { restaurantId: number, items: Repa[] } | null {
    return this.cartSubject.value;
  }
}