import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../../../models/Utilisateur.model';
import { UtilisateurService } from '../../../services/utilisateur.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone:true,
  imports:[FormsModule,NgIf],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Utilisateur = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'ROLE_client' // Default role
  };

  constructor(
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Fetch the current user's profile data
    this.utilisateurService.getUserByEmail().subscribe({
      next: (user) => {
        this.user = user;
        console.log(user)
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
        alert('Failed to load user profile. Please try again.');
      }
    });
  }

  onSubmit(): void {
    // Update the user's profile
    this.utilisateurService.updateUser(this.user).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/']); // Navigate to the home page or another route
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
        alert('Failed to update profile. Please try again.');
      }
    });
  }
}