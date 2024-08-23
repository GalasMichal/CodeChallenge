import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  StepperOrientation,
  MatStepperModule,
} from '@angular/material/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../services/user/user.service';

import { Company } from '../models/company.model';
import { Sector } from '../models/sector.model';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { SectorService } from '../services/sector/sector.service';
import { CompanyService } from '../services/company/company.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    CommonModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,

  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent {

  private sectorsService = inject(SectorService);
  private breakpointObserver = inject(BreakpointObserver);
  private userService = inject(UserService);
  private companyService = inject(CompanyService);


  company: Company = new Company('', 0);
  user: User = new User('', '', '', '', '', '', this.company.companyId);
  sectors: Sector[] = [];
  usernameExists: boolean | null = null;
  checking: boolean = false;
  checkingCompany: boolean = false;
  companyExists: boolean = false;

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }




  stepperOrientation$!: Observable<StepperOrientation>;

  ngOnInit(): void {
    this.company.companyId = 1;
    // Initialisieren der `stepperOrientation$` Observable
    this.stepperOrientation$ = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.loadSectors(); // Lade die Sektoren bei Initialisierung der Komponente
  }

  loadSectors(): void {
    this.sectorsService.getSectors().subscribe(
      (data: Sector[]) => {
        this.sectors = data; // Setze die geladenen Sektoren
        console.log('Geladene Sektoren:', this.sectors); // Überprüfen Sie die Daten in der Konsole
      },
      (err: any) => {
        console.error('Fehler beim Laden der Sektoren:', err.message); // Fehlerbehandlung
      }
    );
  }

  checkUsername(username: string): void {
    this.checking = true;
    this.userService.checkUsernameExists(username).subscribe({
      next: (exists) => {
        this.usernameExists = exists;
        this.checking = false;
      },
      error: (error) => {
        console.error('Error checking username existence', error);
        this.checking = false;
      }
  });
  }

  checkCompany(name: string): void {
    this.checkingCompany = true;
    this.companyService.checkCompanyExists(name).subscribe({
      next: (exists) => {
        this.companyExists = exists;
        this.checkingCompany = false;
      },
      error: (error) => {
        console.error('Error checking company existence', error);
        this.checkingCompany = false;
      }
    });
  }

  onFirstFormSubmit(companyForm: NgForm): void {
      console.log('Gespeicherte Daten:', this.company);
      if(companyForm.valid && !this.companyExists) {
      this.companyService.addCompany(this.company).subscribe({
        next: (response) => {
          console.log('Firma erfolgreich hinzugefügt:', response);
        },
        error: (error) => {
          console.error('Fehler beim Hinzufügen der Firma:', error);
        },
        complete: () => console.info('send post complete'),
      });
    }

    }



    onSecondFormSubmit(userForm: NgForm): void {
      if (userForm.valid && !this.usernameExists) {
        console.log('userData', this.user);
        this.userService.addUser(this.user).subscribe({
          next: (response) => {
            console.log('User erfolgreich hinzugefügt', response);
          },
          error: (error) => {
            console.error('Fehler beim hinzufügen den User', error)
          },
          complete: () => {
            console.info('send userData complete')
          },
      })
      } else {
        console.log('Form is not valid or username already exists');
      }
    }

  }

