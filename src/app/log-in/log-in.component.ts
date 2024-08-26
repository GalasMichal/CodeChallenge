import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
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
    RouterModule,
    MatError
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  userName: string = '';
  password: string = '';
  isVisible = true;
  submitted = false;
  errorMessage: string | null = null;

  showPassword() {
    this.isVisible = !this.isVisible;
  }

  onSubmit() {
    this.submitted = true; // Markiert das Formular als eingereicht

    this.userService.checkUsernameExists(this.userName).subscribe({
      next: (response) => {
        // Benutzer existiert, nun anmelden
        this.userService.login({ username: this.userName, password: this.password }).subscribe({
          next: (loginResponse) => {
            console.log('Login erfolgreich', loginResponse);
            // Speichern des Tokens oder anderer relevanter Daten
            localStorage.setItem('authToken', loginResponse.token); // Beispiel für Token-Speicherung
            // Weiterleitung nach erfolgreichem Login
            this.router.navigate(['/dashboard']); // Ersetzen Sie '/dashboard' mit Ihrer Zielseite
          },
          error: (error) => {
            console.error('Login fehlgeschlagen', error);
            this.errorMessage = 'Benutzername oder Passwort ist falsch'; // Fehlermeldung anzeigen
          }
        });
      },
      error: () => {
        console.error('Benutzer existiert nicht');
        this.errorMessage = 'Benutzer existiert nicht'; // Fehlermeldung anzeigen
      }
    });
  }
}
