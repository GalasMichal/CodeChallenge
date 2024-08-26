import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);

  message: string = '';

  ngOnInit(): void {
    this.showLoginMessage();
  }

  showLoginMessage(): void {
    this.message = 'You have successfully logged in!';
  }
}
