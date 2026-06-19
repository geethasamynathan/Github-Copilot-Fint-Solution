import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { DoctorListComponent } from './features/doctors/doctor-list.component';
import { DoctorDetailsComponent } from './features/doctors/doctor-details.component';
import { PatientListComponent } from './features/patients/patient-list.component';
import { PatientDetailsComponent } from './features/patients/patient-details.component';
import { AppointmentListComponent } from './features/appointments/appointment-list.component';
import { AppointmentFormComponent } from './features/appointments/appointment-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'doctors',
        component: DoctorListComponent,
      },
      {
        path: 'doctors/:id',
        component: DoctorDetailsComponent,
      },
      {
        path: 'patients',
        component: PatientListComponent,
      },
      {
        path: 'patients/:id',
        component: PatientDetailsComponent,
      },
      {
        path: 'appointments',
        component: AppointmentListComponent,
      },
      {
        path: 'appointments/create',
        component: AppointmentFormComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
