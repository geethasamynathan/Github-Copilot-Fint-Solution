import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import {
  DoctorService,
  PatientService,
  AppointmentService,
} from '../../core/services';
import { Doctor, Patient, Appointment } from '../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  loading = true;
  error: string | null = null;

  doctors: Doctor[] = [];
  patients: Patient[] = [];
  appointments: Appointment[] = [];

  totalDoctors = 0;
  totalPatients = 0;
  totalAppointments = 0;
  scheduledAppointments = 0;
  completedAppointments = 0;
  cancelledAppointments = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDashboardData(): void {
    this.loading = true;
    this.error = null;

    Promise.all([
      this.loadDoctors(),
      this.loadPatients(),
      this.loadAppointments(),
    ]).finally(() => {
      this.loading = false;
    });
  }

  private loadDoctors(): Promise<void> {
    return new Promise((resolve) => {
      this.doctorService
        .getDoctors()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.doctors = data;
            this.totalDoctors = data.length;
            resolve();
          },
          (error) => {
            console.error('Error loading doctors:', error);
            let errorMsg = 'Failed to load doctors';
            if (error.status === 0) {
              errorMsg =
                'Cannot connect to API. Backend not running on http://localhost:5068';
            } else if (error.status === 404) {
              errorMsg = 'Doctor endpoint not found';
            }
            this.error = errorMsg;
            resolve();
          },
        );
    });
  }

  private loadPatients(): Promise<void> {
    return new Promise((resolve) => {
      this.patientService
        .getPatients()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.patients = data;
            this.totalPatients = data.length;
            resolve();
          },
          (error) => {
            console.error('Error loading patients:', error);
            this.error = 'Failed to load patients';
            resolve();
          },
        );
    });
  }

  private loadAppointments(): Promise<void> {
    return new Promise((resolve) => {
      this.appointmentService
        .getAppointments()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.appointments = data;
            this.totalAppointments = data.length;
            this.scheduledAppointments = data.filter(
              (a) => a.appointmentStatus === 'Scheduled',
            ).length;
            this.completedAppointments = data.filter(
              (a) => a.appointmentStatus === 'Completed',
            ).length;
            this.cancelledAppointments = data.filter(
              (a) => a.appointmentStatus === 'Cancelled',
            ).length;
            resolve();
          },
          (error) => {
            console.error('Error loading appointments:', error);
            this.error = 'Failed to load appointments';
            resolve();
          },
        );
    });
  }
}
