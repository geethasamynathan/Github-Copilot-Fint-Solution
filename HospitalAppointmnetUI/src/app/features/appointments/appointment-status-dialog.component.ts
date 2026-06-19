import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

export interface AppointmentStatusDialogData {
  currentStatus: string;
}

@Component({
  selector: 'app-appointment-status-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './appointment-status-dialog.component.html',
  styleUrls: ['./appointment-status-dialog.component.scss'],
})
export class AppointmentStatusDialogComponent {
  statusForm: FormGroup;
  statuses = ['Scheduled', 'Completed', 'Cancelled'];

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentStatusDialogData,
  ) {
    this.statusForm = this.formBuilder.group({
      status: [data.currentStatus, Validators.required],
    });
  }

  submit(): void {
    if (this.statusForm.valid) {
      return this.statusForm.value.status;
    }
  }
}
