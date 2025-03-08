import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.service';
import { RestaurantMapComponent } from './pages/client/restaurant-map/restaurant-map.component';
import { RestaurantListComponent } from './pages/client/restaurant-list/restaurant-list.component';
import { DashboardComponent } from './pages/client/dashboard/dashboard.component';
import { RestaurantMenuComponent } from './pages/client/restaurant-menu/restaurant-menu.component';
import { CartComponent } from './pages/client/cart/cart.component';
import { CommandListComponent } from './pages/client/command-list/command-list.component';
import { CommandEditComponent } from './pages/client/edit/edit.component';
import { AddRestaurantComponent } from './pages/client/add-restaurant/add-restaurant.component';
import { ProfileComponent } from './pages/client/profile/profile.component';
import { EditRestaurantComponent } from './pages/client/edit-restaurant/edit-restaurant.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'client',
    outlet: 'client',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'command', component: CommandListComponent },
      { path: 'command/edit/:id', component: CommandEditComponent },
      { path: 'restaurant', component: RestaurantListComponent },
      { path: 'restaurant_add', component: AddRestaurantComponent },
      { path: 'restaurant/edit/:id', component: EditRestaurantComponent}, // Add this route

      { path: 'restaurant/:restaurantId', component: RestaurantMenuComponent },
      { path: 'cart', component: CartComponent },
      { path: 'map', component: RestaurantMapComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'restaurant', pathMatch: 'full' }
    ]
  },
];
