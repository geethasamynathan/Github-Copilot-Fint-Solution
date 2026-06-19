import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PatientService } from '../../core/services';
import { Patient } from '../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit, OnDestroy {
  patients: Patient[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'phoneNumber',
    'gender',
    'dateOfBirth',
    'address',
    'actions',
  ];

  private destroy$ = new Subject<void>();

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPatients(): void {
    this.loading = true;
    this.error = null;

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
          let errorMsg = 'Failed to load patients';
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

  viewDetails(patient: Patient): void {
    console.log('View patient details:', patient);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
