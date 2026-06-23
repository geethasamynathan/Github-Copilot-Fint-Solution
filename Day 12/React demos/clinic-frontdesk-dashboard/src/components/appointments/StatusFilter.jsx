import { memo } from "react";

/**
 * StatusFilter Component
 * Filter appointments by status
 */
const StatusFilter = memo(({ selectedStatus, onStatusChange }) => {
  const statuses = ["All", "Scheduled", "Checked In", "Completed", "Cancelled"];

  const getStatusStyles = (status) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-medium transition-all duration-200 border-2";
    const selected =
      selectedStatus === status
        ? "border-blue-600 bg-blue-600 text-white"
        : "border-gray-300 bg-white text-gray-700 hover:border-blue-300";

    return `${baseStyles} ${selected}`;
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Filter by Status
      </h3>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => onStatusChange(status)}
            className={getStatusStyles(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
});

StatusFilter.displayName = "StatusFilter";

export default StatusFilter;
