import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAppointments } from "./useAppointment";
import { mockAppointments } from "../data/appointment";

describe("useAppointments hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("starts with loading state and default values", () => {
    const { result } = renderHook(() => useAppointments());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.searchText).toBe("");
    expect(result.current.selectedStatus).toBe("All");
    expect(result.current.appointments).toEqual([]);
    expect(result.current.filteredAppointments).toEqual([]);
    expect(result.current.summary).toEqual({
      total: 0,
      scheduled: 0,
      checkedIn: 0,
      completed: 0,
      cancelled: 0,
    });
  });

  it("loads mock appointments after the simulated delay", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.appointments).toHaveLength(mockAppointments.length);
    expect(result.current.summary).toEqual({
      total: 8,
      scheduled: 3,
      checkedIn: 2,
      completed: 2,
      cancelled: 1,
    });
  });

  it("filters appointments by status", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    act(() => {
      result.current.setSelectedStatus("Completed");
    });

    expect(result.current.filteredAppointments).toHaveLength(2);
    expect(
      result.current.filteredAppointments.every(
        (item) => item.status === "Completed",
      ),
    ).toBe(true);
  });

  it("filters appointments by patient name (case-insensitive)", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    act(() => {
      result.current.setSearchText("emma");
    });

    expect(result.current.filteredAppointments).toHaveLength(1);
    expect(result.current.filteredAppointments[0].patientName).toBe(
      "Emma Wilson",
    );
  });

  it("filters appointments by mobile number", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    act(() => {
      result.current.setSearchText("555-0108");
    });

    expect(result.current.filteredAppointments).toHaveLength(1);
    expect(result.current.filteredAppointments[0].mobileNumber).toBe(
      "555-0108",
    );
  });

  it("treats spaces-only search as empty search (edge case)", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    act(() => {
      result.current.setSearchText("   ");
    });

    expect(result.current.filteredAppointments).toHaveLength(8);
  });

  it("updates one appointment status without changing others", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const before = result.current.appointments;
    const target = before.find((item) => item.id === 1);
    const unchanged = before.find((item) => item.id === 2);

    expect(target?.status).toBe("Scheduled");

    act(() => {
      result.current.updateAppointmentStatus(1, "Checked In");
    });

    const after = result.current.appointments;
    const updated = after.find((item) => item.id === 1);
    const stillSame = after.find((item) => item.id === 2);

    expect(updated?.status).toBe("Checked In");
    expect(stillSame?.status).toBe(unchanged?.status);
  });

  it("does nothing when updating a non-existing appointment id (negative case)", () => {
    const { result } = renderHook(() => useAppointments());

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const beforeStatuses = result.current.appointments.map(
      (item) => item.status,
    );

    act(() => {
      result.current.updateAppointmentStatus(9999, "Completed");
    });

    const afterStatuses = result.current.appointments.map(
      (item) => item.status,
    );
    expect(afterStatuses).toEqual(beforeStatuses);
  });
});
