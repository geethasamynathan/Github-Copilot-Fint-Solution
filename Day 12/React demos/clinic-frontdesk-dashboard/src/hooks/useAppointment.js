import { useState, useEffect, useMemo, useCallback } from "react";
import { mockAppointments } from "../data/appointment";
import {
  filterBySearch,
  filterByStatus,
  calculateSummary,
} from "../utils/appointmentUtils";

/**
 * Custom hook for managing appointments with search, filter, and status updates
 */
export const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Simulate loading appointments
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Simulate API delay
    const timer = setTimeout(() => {
      try {
        setAppointments(mockAppointments);
        setLoading(false);
      } catch (err) {
        setError("Failed to load appointments");
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Calculate filtered appointments - memoized to prevent unnecessary recalculations
  const filteredAppointments = useMemo(() => {
    let filtered = appointments;
    filtered = filterByStatus(filtered, selectedStatus);
    filtered = filterBySearch(filtered, searchText);
    return filtered;
  }, [appointments, selectedStatus, searchText]);

  // Calculate summary statistics - memoized
  const summary = useMemo(() => {
    return calculateSummary(appointments);
  }, [appointments]);

  // Update appointment status
  const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: newStatus }
          : appointment,
      ),
    );
  }, []);

  return {
    appointments,
    loading,
    error,
    searchText,
    setSearchText,
    selectedStatus,
    setSelectedStatus,
    filteredAppointments,
    summary,
    updateAppointmentStatus,
  };
};
