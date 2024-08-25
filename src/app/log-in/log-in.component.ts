import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  private userService = inject(UserService);
  private router = inject(Router)
  username: string = ''
  password: string = ''
  isVisible = true;
  submitted = false;

  showPassword() {
    this.isVisible = !this.isVisible;
  }


    onSubmit() {
      this.submitted = true;
      if (this.username && this.password) {
        this.userService.login({ username: this.username, password: this.password }).subscribe(
          (response) => {
            localStorage.setItem('token', response.Token);
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            console.error('Login failed', error);
          }
        );
      }
    }
}
