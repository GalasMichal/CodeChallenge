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

  // Wert-Signal für Eingaben
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  company: Company = new Company('', 0);
  user: User = new User(this.company.companyId);

  sectors: Sector[] = [];


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

  onFirstFormSubmit(ngForm: NgForm): void {
      console.log('Gespeicherte Daten:', this.company);
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

    onSecondFormSubmit(){
      console.log('userData', this.user)
    }


  }

