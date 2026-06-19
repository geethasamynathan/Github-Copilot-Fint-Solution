import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  navItems: NavItem[] = [];

  ngOnInit(): void {
    this.navItems = [
      {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
      },
      {
        label: 'Doctors',
        icon: 'local_hospital',
        route: '/doctors',
      },
      {
        label: 'Patients',
        icon: 'people',
        route: '/patients',
      },
      {
        label: 'Appointments',
        icon: 'event_note',
        route: '/appointments',
      },
      {
        label: 'New Appointment',
        icon: 'add_circle',
        route: '/appointments/create',
      },
    ];
  }
}
