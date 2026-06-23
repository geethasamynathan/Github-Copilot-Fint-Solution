import { memo } from "react";
import AppointmentCard from "./AppointmentCard";
import EmptyState from "../common/EmptyState";
import LoadingSpinner from "../common/LoadingSpinner";

/**
 * AppointmentList Component
 * Display list of appointments with loading and empty states
 */
const AppointmentList = memo(({ appointments, loading, onStatusChange }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (appointments.length === 0) {
    return <EmptyState message="No appointments found" />;
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
});

AppointmentList.displayName = "AppointmentList";

export default AppointmentList;
