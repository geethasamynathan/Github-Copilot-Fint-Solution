import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppointmentList from "./AppointmentList";

const appointments = [
  {
    id: 1,
    patientName: "John Smith",
    mobileNumber: "555-0101",
    appointmentTime: "09:00 AM",
    appointmentDate: "2024-06-22",
    status: "Scheduled",
    doctorName: "Dr. Sarah Johnson",
    reason: "General Checkup",
  },
  {
    id: 2,
    patientName: "Emma Wilson",
    mobileNumber: "555-0102",
    appointmentTime: "10:30 AM",
    appointmentDate: "2024-06-22",
    status: "Checked In",
    doctorName: "Dr. Michael Brown",
    reason: "Dental Cleaning",
  },
];

describe("AppointmentList", () => {
  it("shows loading state when loading is true", () => {
    render(
      <AppointmentList
        appointments={appointments}
        loading={true}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Loading appointments...")).toBeInTheDocument();
    expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
  });

  it("shows empty state when there are no appointments and not loading", () => {
    render(
      <AppointmentList
        appointments={[]}
        loading={false}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("No appointments found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search or filters"),
    ).toBeInTheDocument();
  });

  it("renders appointment cards when data is available", () => {
    render(
      <AppointmentList
        appointments={appointments}
        loading={false}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Emma Wilson")).toBeInTheDocument();
  });

  it("forwards status update action from card to parent handler", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <AppointmentList
        appointments={appointments}
        loading={false}
        onStatusChange={onStatusChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Mark as Checked In" }),
    );

    expect(onStatusChange).toHaveBeenCalledWith(1, "Checked In");
  });

  it("keeps loading state priority even when appointments exist (edge case)", () => {
    render(
      <AppointmentList
        appointments={appointments}
        loading={true}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Loading appointments...")).toBeInTheDocument();
    expect(screen.queryByText("No appointments found")).not.toBeInTheDocument();
  });
});
