import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as appointmentsHook from "../hooks/useAppointment";
import Dashboard from "./Dashboard";

describe("Dashboard page", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it("renders header and loading state first", () => {
    render(<Dashboard />);

    expect(screen.getByText("Clinic Front Desk Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Manage and track patient appointments efficiently"),
    ).toBeInTheDocument();
    expect(screen.getByText("Loading appointments...")).toBeInTheDocument();
  });

  it("shows appointments after load completes", () => {
    render(<Dashboard />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    expect(
      screen.getByPlaceholderText("Search by patient name or mobile number..."),
    ).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Emma Wilson")).toBeInTheDocument();
  });

  it("filters appointments by search text (user-visible behavior)", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Dashboard />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    await user.type(input, "Emma");

    expect(screen.getByText("Emma Wilson")).toBeInTheDocument();
    expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
  });

  it("filters appointments by status using filter buttons", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Dashboard />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(screen.getByText("Michael Davis")).toBeInTheDocument();
    expect(screen.getByText("Patricia Johnson")).toBeInTheDocument();
    expect(screen.queryByText("John Smith")).not.toBeInTheDocument();
  });

  it("updates appointment status when user clicks action button", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Dashboard />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const beforeCount = screen.queryAllByRole("button", {
      name: "Mark as Checked In",
    }).length;

    await user.click(
      screen.getAllByRole("button", { name: "Mark as Checked In" })[0],
    );

    const afterCount = screen.queryAllByRole("button", {
      name: "Mark as Checked In",
    }).length;

    expect(afterCount).toBe(beforeCount - 1);
  });

  it("shows empty state when search has no match (negative case)", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<Dashboard />);

    act(() => {
      vi.advanceTimersByTime(800);
    });

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    await user.type(input, "No Match 12345");

    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });

  it("handles hook error state without crashing (edge case)", () => {
    vi.spyOn(appointmentsHook, "useAppointments").mockReturnValue({
      appointments: [],
      loading: false,
      error: "Failed to load appointments",
      searchText: "",
      setSearchText: vi.fn(),
      selectedStatus: "All",
      setSelectedStatus: vi.fn(),
      filteredAppointments: [],
      summary: {
        total: 0,
        scheduled: 0,
        checkedIn: 0,
        completed: 0,
        cancelled: 0,
      },
      updateAppointmentStatus: vi.fn(),
    });

    render(<Dashboard />);

    expect(screen.getByText("Clinic Front Desk Dashboard")).toBeInTheDocument();
    expect(screen.getByText("No appointments found")).toBeInTheDocument();
  });
});
