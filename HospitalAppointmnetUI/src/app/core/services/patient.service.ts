import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api-url.constants';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${API_BASE_URL}${API_ENDPOINTS.PATIENTS}`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }
}
