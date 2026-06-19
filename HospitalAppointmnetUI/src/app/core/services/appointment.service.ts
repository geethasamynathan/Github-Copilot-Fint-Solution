import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Appointment,
  AppointmentCreate,
  AppointmentStatusUpdate,
} from '../models';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api-url.constants';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = `${API_BASE_URL}${API_ENDPOINTS.APPOINTMENTS}`;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrl}/${id}`);
  }

  createAppointment(payload: AppointmentCreate): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, payload);
  }

  updateAppointmentStatus(
    id: number,
    payload: AppointmentStatusUpdate,
  ): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/${id}/status`, payload);
  }

  deleteAppointment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
