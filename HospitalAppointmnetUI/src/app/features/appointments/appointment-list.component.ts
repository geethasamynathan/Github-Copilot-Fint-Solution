import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Router } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { AppointmentStatusDialogComponent } from './appointment-status-dialog.component';
import { AppointmentService } from '../../core/services';
import { Appointment } from '../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss'],
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = [
    'appointmentId',
    'doctorName',
    'patientName',
    'date',
    'time',
    'status',
    'reason',
    'actions',
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.appointmentService
      .getAppointments()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.appointments = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading appointments:', error);
          let errorMsg = 'Failed to load appointments';
          if (error.status === 0) {
            errorMsg =
              'Cannot connect to API. Ensure backend is running on http://localhost:5068';
          } else if (error.status === 404) {
            errorMsg = 'API endpoint not found. Check backend endpoints';
          } else if (error.status === 500) {
            errorMsg = 'Backend server error. Check server logs';
          } else if (error.error?.message) {
            errorMsg = error.error.message;
          }
          this.error = errorMsg;
          this.loading = false;
        },
      );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Scheduled':
        return 'primary';
      case 'Completed':
        return 'accent';
      case 'Cancelled':
        return 'warn';
      default:
        return 'primary';
    }
  }

  updateStatus(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentStatusDialogComponent, {
      width: '400px',
      data: { currentStatus: appointment.appointmentStatus },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService
          .updateAppointmentStatus(appointment.appointmentId, {
            appointmentStatus: result,
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open(
                'Appointment status updated successfully',
                'Close',
                {
                  duration: 3000,
                },
              );
              this.loadAppointments();
            },
            (error) => {
              console.error('Error updating appointment:', error);
              this.snackBar.open(
                'Failed to update appointment status',
                'Close',
                {
                  duration: 3000,
                  panelClass: 'error-snackbar',
                },
              );
            },
          );
      }
    });
  }

  deleteAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Appointment',
        message: `Are you sure you want to delete the appointment for ${appointment.patientName} with Dr. ${appointment.doctorName}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService
          .deleteAppointment(appointment.appointmentId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.snackBar.open('Appointment deleted successfully', 'Close', {
                duration: 3000,
              });
              this.loadAppointments();
            },
            (error) => {
              console.error('Error deleting appointment:', error);
              this.snackBar.open('Failed to delete appointment', 'Close', {
                duration: 3000,
                panelClass: 'error-snackbar',
              });
            },
          );
      }
    });
  }

  createAppointment(): void {
    this.router.navigate(['/appointments/create']);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
