import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StatusFilter from "./StatusFilter";

describe("StatusFilter", () => {
  it("renders all status filter options", () => {
    render(<StatusFilter selectedStatus="All" onStatusChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Scheduled" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Checked In" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Completed" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancelled" }),
    ).toBeInTheDocument();
  });

  it("calls onStatusChange when a status is clicked", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <StatusFilter selectedStatus="All" onStatusChange={onStatusChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(onStatusChange).toHaveBeenCalledWith("Completed");
  });

  it("allows switching between multiple statuses (edge case)", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <StatusFilter selectedStatus="All" onStatusChange={onStatusChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Scheduled" }));
    await user.click(screen.getByRole("button", { name: "Checked In" }));
    await user.click(screen.getByRole("button", { name: "Cancelled" }));

    expect(onStatusChange).toHaveBeenNthCalledWith(1, "Scheduled");
    expect(onStatusChange).toHaveBeenNthCalledWith(2, "Checked In");
    expect(onStatusChange).toHaveBeenNthCalledWith(3, "Cancelled");
  });

  it("still works when clicking the currently selected status (negative case)", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      <StatusFilter
        selectedStatus="Completed"
        onStatusChange={onStatusChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Completed" }));

    expect(onStatusChange).toHaveBeenCalledWith("Completed");
  });
});
