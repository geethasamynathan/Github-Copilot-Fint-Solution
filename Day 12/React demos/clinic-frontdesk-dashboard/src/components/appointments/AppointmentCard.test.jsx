import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppointmentCard from "./AppointmentCard";

const baseAppointment = {
  id: 1,
  patientName: "John Smith",
  mobileNumber: "555-0101",
  appointmentTime: "09:00 AM",
  appointmentDate: "2024-06-22",
  status: "Scheduled",
  doctorName: "Dr. Sarah Johnson",
  reason: "General Checkup",
};

describe("AppointmentCard", () => {
  it("renders key appointment details for the user", () => {
    render(
      <AppointmentCard
        appointment={baseAppointment}
        onStatusChange={vi.fn()}
      />,
    );

    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("555-0101")).toBeInTheDocument();
    expect(screen.getByText("2024-06-22")).toBeInTheDocument();
    expect(screen.getByText("09:00 AM")).toBeInTheDocument();
    expect(screen.getByText("Dr. Sarah Johnson")).toBeInTheDocument();
    expect(screen.getByText("General Checkup")).toBeInTheDocument();
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it("shows Scheduled -> Checked In action and calls handler on click", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <AppointmentCard
        appointment={baseAppointment}
        onStatusChange={onStatusChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Mark as Checked In" }),
    );

    expect(onStatusChange).toHaveBeenCalledWith(1, "Checked In");
  });

  it("shows Checked In -> Completed action", () => {
    render(
      <AppointmentCard
        appointment={{ ...baseAppointment, status: "Checked In" }}
        onStatusChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Mark as Completed" }),
    ).toBeInTheDocument();
  });

  it("does not show status action buttons for Completed appointments (negative case)", () => {
    render(
      <AppointmentCard
        appointment={{ ...baseAppointment, status: "Completed" }}
        onStatusChange={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Mark as/i }),
    ).not.toBeInTheDocument();
  });

  it("does not show status action buttons for Cancelled appointments (edge case)", () => {
    render(
      <AppointmentCard
        appointment={{ ...baseAppointment, status: "Cancelled" }}
        onStatusChange={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: /Mark as/i }),
    ).not.toBeInTheDocument();
  });
});
