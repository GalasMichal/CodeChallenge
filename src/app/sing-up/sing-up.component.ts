import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
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
  selectedSectorName: string = '';

  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  stepperOrientation$!: Observable<StepperOrientation>;

  ngOnInit(): void {
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
      },
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
      },
    });
  }

  onSectorChange(sectorId: number): void {
    const selectedSector = this.sectors.find(
      (sector) => sector.sectorId === sectorId
    );
    this.selectedSectorName = selectedSector ? selectedSector.bezeichnung : '';
  }

  onFirstFormSubmit(companyForm: NgForm): void {
    if (companyForm.valid && !this.companyExists) {
      this.companyService.addCompany(this.company).subscribe({
        next: (response: Company) => {
          console.log('Firma erfolgreich hinzugefügt:', response);

          // Die Company-ID aus der Antwort holen und im User-Objekt speichern
          this.user.companyId = response.companyId;

          console.log('Updated User with companyId:', this.user);
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

      // Überprüfe, ob die companyId gesetzt ist
      if (!this.user.companyId) {
        console.error('Company ID is missing!');
        return;
      }

      this.userService.addUser(this.user).subscribe({
        next: (response) => {
          console.log('User erfolgreich hinzugefügt', response);
        },
        error: (error) => {
          console.error('Fehler beim Hinzufügen des Users', error);
        },
        complete: () => {
          console.info('User-Daten erfolgreich gesendet');
        },
      });
    } else {
      console.log('Form is not valid or username already exists');
    }
  }
}
