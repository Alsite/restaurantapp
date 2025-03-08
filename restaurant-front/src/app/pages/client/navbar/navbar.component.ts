import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
   constructor(
    private router: Router,
     private authService:AuthService
    ) {}
    logout(event: Event) {
      event.preventDefault(); // Prevent default link behavior
    event.stopPropagation(); // Stop event propagation
      console.log("Logging out...");
    
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
