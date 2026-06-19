# Backend API Integration Guide

## 🔌 CORS Configuration (REQUIRED)

Your ASP.NET Core backend MUST have CORS enabled for the Angular frontend to communicate with it.

### Enable CORS in ASP.NET Core

**In your `Program.cs`:**

```csharp
using Microsoft.AspNetCore.Cors;

var builder = WebApplicationBuilder.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:4200",
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// Add controllers and other services
builder.Services.AddControllers();

var app = builder.Build();

// Use CORS (MUST be before MapControllers)
app.UseCors("AllowAngularApp");

app.MapControllers();
app.Run();
```

---

## 🌐 API Endpoints Required

The frontend expects the following API endpoints at `http://localhost:5068/api`:

### Doctors
```
GET    /api/doctors              → Get all doctors
GET    /api/doctors/{id}         → Get doctor by ID
```

**Expected Response:**
```json
{
  "doctorId": 1,
  "fullName": "Dr. John Smith",
  "specialization": "Cardiology",
  "email": "john@hospital.com",
  "phoneNumber": "555-1234",
  "consultationFee": 150.00,
  "isAvailable": true
}
```

### Patients
```
GET    /api/patients             → Get all patients
GET    /api/patients/{id}        → Get patient by ID
```

**Expected Response:**
```json
{
  "patientId": 1,
  "fullName": "John Doe",
  "email": "john@email.com",
  "phoneNumber": "555-5678",
  "dateOfBirth": "1980-01-15",
  "gender": "Male",
  "address": "123 Main St, City, State 12345"
}
```

### Appointments
```
GET    /api/appointments         → Get all appointments
GET    /api/appointments/{id}    → Get appointment by ID
POST   /api/appointments         → Create new appointment
PUT    /api/appointments/{id}/status    → Update appointment status
DELETE /api/appointments/{id}    → Delete appointment
```

**Appointment Response:**
```json
{
  "appointmentId": 1,
  "doctorId": 1,
  "doctorName": "Dr. John Smith",
  "patientId": 1,
  "patientName": "John Doe",
  "appointmentDate": "2024-06-20",
  "appointmentTime": "10:30",
  "appointmentStatus": "Scheduled",
  "reason": "Regular checkup",
  "createdAt": "2024-06-18T10:00:00"
}
```

**POST /appointments Request Body:**
```json
{
  "doctorId": 1,
  "patientId": 1,
  "appointmentDate": "2024-06-20",
  "appointmentTime": "10:30",
  "reason": "Regular checkup"
}
```

**PUT /appointments/{id}/status Request Body:**
```json
{
  "appointmentStatus": "Completed"
}
```

Status values: `"Scheduled"`, `"Completed"`, `"Cancelled"`

---

## 🔄 API Base URL Configuration

### Default Configuration
The frontend is configured to use:
```
http://localhost:5068/api
```

### To Change API URL
Edit: `src/app/core/constants/api-url.constants.ts`

```typescript
export const API_BASE_URL = 'http://your-api-url:port/api';

export const API_ENDPOINTS = {
  DOCTORS: '/doctors',
  PATIENTS: '/patients',
  APPOINTMENTS: '/appointments',
};
```

---

## ✅ Pre-Flight Checklist

Before running the application:

- [ ] ASP.NET Core backend running on `http://localhost:5068`
- [ ] CORS policy configured in backend
- [ ] All API endpoints returning expected data format
- [ ] API responds with proper HTTP status codes:
  - 200 for successful GET/PUT
  - 201 for successful POST
  - 204 for DELETE
  - 400+ for errors
- [ ] API handles errors gracefully with proper error messages
- [ ] Doctor, Patient, and Appointment data exists in database

---

## 🧪 Testing API Endpoints

### Using Postman

1. **Test GET /api/doctors**
   - URL: `http://localhost:5068/api/doctors`
   - Method: GET
   - Should return array of doctor objects

2. **Test POST /api/appointments**
   - URL: `http://localhost:5068/api/appointments`
   - Method: POST
   - Headers: `Content-Type: application/json`
   - Body:
   ```json
   {
     "doctorId": 1,
     "patientId": 1,
     "appointmentDate": "2024-06-20",
     "appointmentTime": "10:30",
     "reason": "Regular checkup"
   }
   ```

---

## 🚨 Common Issues & Solutions

### Issue: CORS Error
```
Access to XMLHttpRequest at 'http://localhost:5068/api/...' 
has been blocked by CORS policy
```

**Solution:**
- Verify CORS middleware added to Pipeline in Program.cs
- Check CORS policy includes the correct origins
- Ensure UseCors() is called before MapControllers()

### Issue: 404 Not Found
```
GET http://localhost:5068/api/doctors 404 (Not Found)
```

**Solution:**
- Verify API endpoints exist in backend
- Check URL spelling matches exactly
- Ensure backend is running and listening on port 5068

### Issue: 500 Internal Server Error
```
GET http://localhost:5068/api/doctors 500 (Internal Server Error)
```

**Solution:**
- Check backend logs for exception details
- Verify database connection string
- Check that models match response format

### Issue: Empty Response
Backend returns empty arrays even though data exists

**Solution:**
- Check database queries are correct
- Verify data actually exists in database
- Check authorization/permissions if any

---

## 📊 Response Format Validation

The frontend services expect responses to match these interfaces:

### Doctor Response Format
```typescript
interface Doctor {
  doctorId: number;
  fullName: string;
  specialization: string;
  email: string;
  phoneNumber: string;
  consultationFee: number;
  isAvailable: boolean;
}
```

### Patient Response Format
```typescript
interface Patient {
  patientId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;  // Format: "1980-01-15"
  gender: string;
  address: string;
}
```

### Appointment Response Format
```typescript
interface Appointment {
  appointmentId: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  appointmentDate: string;  // Format: "2024-06-20"
  appointmentTime: string;  // Format: "10:30"
  appointmentStatus: string; // "Scheduled", "Completed", "Cancelled"
  reason: string;
  createdAt: string;  // ISO format: "2024-06-18T10:00:00"
}
```

---

## 🔐 Production Deployment

### Change API URL for Production
Edit `src/app/core/constants/api-url.constants.ts`:

```typescript
// Development
export const API_BASE_URL = 'http://localhost:5068/api';

// Production (use environment variable if available)
export const API_BASE_URL = process.env['API_URL'] || 'https://api.yourdomain.com/api';
```

### CORS Configuration for Production
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy
            .WithOrigins(
                "https://yourdomain.com",
                "https://www.yourdomain.com"
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
```

---

## 📝 Example Backend Response

### Sample GET /api/doctors Response
```json
[
  {
    "doctorId": 1,
    "fullName": "Dr. Sarah Johnson",
    "specialization": "Cardiology",
    "email": "sarah.johnson@hospital.com",
    "phoneNumber": "+1-555-0101",
    "consultationFee": 150.00,
    "isAvailable": true
  },
  {
    "doctorId": 2,
    "fullName": "Dr. Michael Brown",
    "specialization": "Neurology",
    "email": "michael.brown@hospital.com",
    "phoneNumber": "+1-555-0102",
    "consultationFee": 200.00,
    "isAvailable": true
  }
]
```

### Sample GET /api/appointments Response
```json
[
  {
    "appointmentId": 1,
    "doctorId": 1,
    "doctorName": "Dr. Sarah Johnson",
    "patientId": 1,
    "patientName": "John Doe",
    "appointmentDate": "2024-06-20",
    "appointmentTime": "10:30",
    "appointmentStatus": "Scheduled",
    "reason": "Routine cardiac checkup",
    "createdAt": "2024-06-18T09:15:00"
  }
]
```

---

**All systems ready! Backend API integration complete.**
