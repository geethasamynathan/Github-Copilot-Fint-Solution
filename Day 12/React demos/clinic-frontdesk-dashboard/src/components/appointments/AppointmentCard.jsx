import { memo } from "react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { getAvailableTransitions } from "../../utils/appointmentUtils";

/**
 * AppointmentCard Component
 * Display individual appointment details
 */
const AppointmentCard = memo(({ appointment, onStatusChange }) => {
  const availableTransitions = getAvailableTransitions(appointment.status);

  const handleStatusChange = (newStatus) => {
    onStatusChange(appointment.id, newStatus);
  };

  return (
    <Card className="border-l-4 border-l-blue-600">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        {/* Appointment Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {appointment.patientName}
              </h3>
              <p className="text-gray-600 text-sm">
                {appointment.mobileNumber}
              </p>
            </div>
            <Badge status={appointment.status} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                Date & Time
              </p>
              <p className="text-gray-900 font-medium mt-1">
                {appointment.appointmentDate}
              </p>
              <p className="text-gray-700">{appointment.appointmentTime}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
                Doctor
              </p>
              <p className="text-gray-900 font-medium mt-1">
                {appointment.doctorName}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
              Reason for Visit
            </p>
            <p className="text-gray-700 mt-1">{appointment.reason}</p>
          </div>
        </div>

        {/* Status Change Actions */}
        {availableTransitions.length > 0 && (
          <div className="flex flex-col gap-2 md:min-w-max">
            {availableTransitions.map((status) => (
              <Button
                key={status}
                variant="success"
                onClick={() => handleStatusChange(status)}
                className="whitespace-nowrap text-sm"
              >
                Mark as {status}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
});

AppointmentCard.displayName = "AppointmentCard";

export default AppointmentCard;
