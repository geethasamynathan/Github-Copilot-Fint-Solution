# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd "c:\Personal\Fint Solution\Git Fint solution\Github-Copilot-Fint-Solution\HospitalAppointmnetUI"
npm install
```

### Step 2: Start Development Server
```bash
npm start
```
App opens automatically at `http://localhost:4200`

### Step 3: Ensure Backend is Running
- ASP.NET Core API running on `http://localhost:5068`
- CORS enabled in backend (see BACKEND_API_INTEGRATION.md)

---

## ✅ Application Features

### Dashboard (`/dashboard`)
- View total doctors, patients, and appointments
- See appointment status breakdown
- Beautiful stat cards with icons

### Doctors (`/doctors`)
- View all registered doctors
- See specialization, contact info, fees
- Availability status with color indicators

### Patients (`/patients`)
- View all registered patients
- See patient information and demographics
- Contact details

### Appointments (`/appointments`)
- List all appointments with full details
- Create new appointments
- Update appointment status
- Delete appointments with confirmation
- Professional table with action buttons

### Create Appointment (`/appointments/create`)
- Reactive form with validation
- Doctor and patient dropdowns
- Date picker and time input
- Reason for visit textarea
- Success/error notifications

---

## 🎨 UI Highlights

✅ Material Design components
✅ Responsive layout (desktop/tablet/mobile)
✅ Loading spinners and empty states
✅ Snackbar notifications
✅ Confirmation dialogs
✅ Professional color scheme
✅ Smooth animations and transitions

---

## 📱 Responsive Design

- **Desktop:** Full layout with all columns visible
- **Tablet:** Optimized columns, toggleable sidebar
- **Mobile:** Single column, touch-friendly buttons

---

## 🔄 API Integration

| Resource | Methods | Endpoints |
|----------|---------|-----------|
| Doctors | GET | `/api/doctors`, `/api/doctors/{id}` |
| Patients | GET | `/api/patients`, `/api/patients/{id}` |
| Appointments | GET, POST, PUT, DELETE | `/api/appointments` |

All requests go to: `http://localhost:5068/api`

---

## ⚠️ IMPORTANT: CORS Configuration

**Your backend MUST have CORS enabled!**

```csharp
// In Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

app.UseCors("AllowAngularApp");
```

See `BACKEND_API_INTEGRATION.md` for complete setup.

---

## 🎯 Next Steps

1. Run backend API on port 5068
2. Start frontend with `npm start`
3. Test each page using the testing guide
4. Customize colors/branding as needed
5. Deploy to production

---

## 📚 Documentation

- **SETUP_AND_TESTING_GUIDE.md** - Complete testing instructions
- **BACKEND_API_INTEGRATION.md** - API configuration and requirements

---

## 🆘 Troubleshooting

### App won't load
- Check backend is running on port 5068
- Check CORS is enabled
- Open browser console for errors

### Data not showing
- Verify API endpoints return data
- Check browser network tab
- Enable backend logs

### Styling looks wrong
- Clear cache: Ctrl+Shift+Delete
- Rebuild: `npm run build`

---

**Ready to go! Run `npm start` to launch the application.**
