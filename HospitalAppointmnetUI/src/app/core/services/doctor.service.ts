import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api-url.constants';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private apiUrl = `${API_BASE_URL}${API_ENDPOINTS.DOCTORS}`;

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }
}
