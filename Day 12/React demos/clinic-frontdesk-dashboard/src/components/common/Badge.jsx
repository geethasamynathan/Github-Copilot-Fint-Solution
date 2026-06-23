import { getStatusColor } from "../../utils/appointmentUtils";

/**
 * Badge Component
 * Display status badges with appropriate colors
 */
const Badge = ({ status, className = "" }) => {
  const colorClasses = getStatusColor(status);

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${colorClasses} ${className}`}
    >
      {status}
    </span>
  );
};

export default Badge;
