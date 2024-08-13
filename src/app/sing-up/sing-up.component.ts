import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  StepperOrientation,
  MatStepperModule,
} from '@angular/material/stepper';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';

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
  ],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss',
})
export class SingUpComponent {
  private _formBuilder = inject(FormBuilder);
  private breakpointObserver = inject(BreakpointObserver);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  stepperOrientation$!: Observable<StepperOrientation>;

  ngOnInit(): void {
    // Initialisieren der `stepperOrientation$` Observable
    this.stepperOrientation$ = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(
        map(({ matches }) => (matches ? 'horizontal' : 'vertical'))
      );
  }

}
