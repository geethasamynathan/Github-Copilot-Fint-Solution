import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { DoctorService } from '../../core/services';
import { Doctor } from '../../core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterModule,
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit, OnDestroy {
  doctors: Doctor[] = [];
  loading = true;
  error: string | null = null;
  displayedColumns: string[] = [
    'fullName',
    'specialization',
    'email',
    'phoneNumber',
    'consultationFee',
    'availability',
    'actions',
  ];

  private destroy$ = new Subject<void>();

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadDoctors(): void {
    this.loading = true;
    this.error = null;

    this.doctorService
      .getDoctors()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.doctors = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error loading doctors:', error);
          let errorMsg = 'Failed to load doctors';
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

  viewDetails(doctor: Doctor): void {
    console.log('View doctor details:', doctor);
    // Navigate to details page
  }
}
