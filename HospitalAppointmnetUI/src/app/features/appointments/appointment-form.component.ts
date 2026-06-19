import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import {
  DoctorService,
  PatientService,
  AppointmentService,
} from '../../core/services';
import { Doctor, Patient } from '../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss'],
})
export class AppointmentFormComponent implements OnInit, OnDestroy {
  appointmentForm!: FormGroup;
  doctors: Doctor[] = [];
  patients: Patient[] = [];
  loading = false;
  submitLoading = false;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadDoctorsAndPatients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.appointmentForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  private loadDoctorsAndPatients(): void {
    this.loading = true;
    this.error = null;

    this.doctorService
      .getDoctors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.doctors = data;
        },
        (error) => {
          console.error('Error loading doctors:', error);
          this.error = 'Failed to load doctors';
        },
      );

    this.patientService
      .getPatients()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.patients = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading patients:', error);
          this.error = 'Failed to load patients';
          this.loading = false;
        },
      );
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.snackBar.open('Please fill all required fields correctly', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    this.submitLoading = true;

    const formValue = this.appointmentForm.value;
    const payload = {
      ...formValue,
      appointmentDate: new Date(formValue.appointmentDate)
        .toISOString()
        .split('T')[0],
    };

    this.appointmentService
      .createAppointment(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (response) => {
          this.submitLoading = false;
          this.snackBar.open('Appointment created successfully', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/appointments']);
        },
        (error) => {
          console.error('Error creating appointment:', error);
          this.submitLoading = false;
          this.snackBar.open('Failed to create appointment', 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
        },
      );
  }

  cancel(): void {
    this.router.navigate(['/appointments']);
  }
}
