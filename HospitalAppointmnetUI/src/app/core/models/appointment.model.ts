export interface Appointment {
  appointmentId: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentStatus: string;
  reason: string;
  createdAt: string;
}
