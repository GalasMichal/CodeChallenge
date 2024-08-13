import { Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

export const routes: Routes = [
  { path: 'singUp', component: LogInComponent },
  { path: '', component: SingUpComponent },
];
