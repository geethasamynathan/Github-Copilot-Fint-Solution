import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "./SearchBox";

describe("SearchBox", () => {
  it("renders the search input with placeholder and value", () => {
    render(<SearchBox searchText="John" onSearchChange={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("John");
  });

  it("calls onSearchChange when user types", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchBox searchText="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    await user.type(input, "Emma");

    expect(onSearchChange).toHaveBeenCalled();
    expect(onSearchChange).toHaveBeenLastCalledWith("Emma");
  });

  it("supports clearing the input (edge case)", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchBox searchText="Initial" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    await user.clear(input);

    expect(onSearchChange).toHaveBeenCalledWith("");
  });

  it("accepts mobile number text input", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchBox searchText="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText(
      "Search by patient name or mobile number...",
    );
    await user.type(input, "555-0101");

    expect(onSearchChange).toHaveBeenLastCalledWith("555-0101");
  });
});
