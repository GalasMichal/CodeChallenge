import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from './services/user/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogInComponent, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'MyApp';
  private userService = inject(UserService);
  private router = inject(Router);

  isLoginPage: boolean = false;
  isSignUpPage: boolean = false;
  isDashboardPage: boolean = false;

  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/';
        this.isSignUpPage = event.urlAfterRedirects === '/signUp';
        this.isDashboardPage = event.urlAfterRedirects === '/dashboard';
      }
    });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
