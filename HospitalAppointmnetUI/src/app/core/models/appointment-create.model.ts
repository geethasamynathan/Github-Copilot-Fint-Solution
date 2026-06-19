export interface AppointmentCreate {
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
}
