import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true, // Mark the component as standalone
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userRole!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.getRole();
    console.log('User Role:', this.userRole); // Debugging
  }

  getRole(): string {
    return this.authService.getRole() 
  }
}