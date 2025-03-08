import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandService } from '../../../services/command.service';
import { Command } from '../../../models/command.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class CommandEditComponent implements OnInit {
  command: Command = {
    id:0 ,
    name: '',
    tprice: 0,
    repa: []
  };

  isLoading: boolean = true; // For initial loading
  isUpdating: boolean = false; // For update loading

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commandService: CommandService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true; // Show loading spinner

    this.commandService.getCommandById(id).subscribe(
      (data: Command) => {
        this.command = data;
        this.isLoading = false; // Hide loading spinner
      },
      (error) => {
        console.error('Error fetching command:', error);
        this.isLoading = false; // Hide loading spinner
      }
    );
  }

  updateCommand(): void {
    this.isUpdating = true; // Show updating spinner

    this.commandService.updateCommand(this.command.id, this.command).subscribe(
      () => {
        this.isUpdating = false; // Hide updating spinner
        this.router.navigate([
          { outlets: { primary: null, client: ['client', 'command'] } }
        ])      },
      (error) => {
        console.error('Error updating command:', error);
        this.isUpdating = false; // Hide updating spinner
      }
    );
  }
}