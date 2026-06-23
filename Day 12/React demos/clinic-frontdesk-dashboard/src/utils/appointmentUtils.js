/**
 * Filter appointments by search text (patient name or mobile number)
 */
export const filterBySearch = (appointments, searchText) => {
  if (!searchText.trim()) return appointments;

  const lowerSearch = searchText.toLowerCase();
  return appointments.filter(
    (appointment) =>
      appointment.patientName.toLowerCase().includes(lowerSearch) ||
      appointment.mobileNumber.includes(searchText),
  );
};

/**
 * Filter appointments by status
 */
export const filterByStatus = (appointments, status) => {
  if (status === "All") return appointments;
  return appointments.filter((appointment) => appointment.status === status);
};

/**
 * Get appointment status badge color
 */
export const getStatusColor = (status) => {
  const colorMap = {
    Scheduled: "bg-blue-100 text-blue-800",
    "Checked In": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return colorMap[status] || "bg-gray-100 text-gray-800";
};

/**
 * Get available status transitions
 */
export const getAvailableTransitions = (currentStatus) => {
  const transitions = {
    Scheduled: ["Checked In"],
    "Checked In": ["Completed"],
    Completed: [],
    Cancelled: [],
  };
  return transitions[currentStatus] || [];
};

/**
 * Calculate summary statistics
 */
export const calculateSummary = (appointments) => {
  return {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === "Scheduled").length,
    checkedIn: appointments.filter((a) => a.status === "Checked In").length,
    completed: appointments.filter((a) => a.status === "Completed").length,
    cancelled: appointments.filter((a) => a.status === "Cancelled").length,
  };
};
