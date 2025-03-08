import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,RouterModule,RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
