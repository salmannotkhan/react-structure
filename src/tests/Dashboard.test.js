import { render, screen } from "@testing-library/react";
import Dashboard from "components/Dashboard";

test("protected route", () => {
    render(<Dashboard />);
    const dashboardText = screen.getByText(/Dashboard/i);
    expect(dashboardText).toBeInTheDocument();
});
