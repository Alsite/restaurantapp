import { Component, OnInit } from '@angular/core';
import { CommandService } from '../../../services/command.service';
import { Command } from '../../../models/command.model';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-command-list',
  standalone:true,
  imports:[CommonModule,RouterLink,NgFor],
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent implements OnInit {
  commands: Command[] = [];

  constructor(private commandService: CommandService) {}

  ngOnInit(): void {
    this.loadCommands();
  }

  loadCommands(): void {
    this.commandService.getAllCommands().subscribe(
      (data: Command[]) => {
        this.commands = data;
      },
      (error) => {
        console.error('Error fetching commands:', error);
      }
    );
  }
  confirmDelete(commandId: number) {
    if (confirm('Are you sure you want to delete this command?')) {
      this.deleteCommand(commandId);
    }
  }

  deleteCommand(id: number): void {
    this.commandService.deleteCommand(id).subscribe(
      () => {
        this.loadCommands(); // Reload the list after deletion
      },
      (error) => {
        console.error('Error deleting command:', error);
      }
    );
  }
}