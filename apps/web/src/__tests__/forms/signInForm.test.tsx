import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { useAuth } from "../../hooks/useAuth";
import SignInForm from "../../components/forms/SignInForm/SignInForm";
import "@testing-library/jest-dom";

jest.mock("../../hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("SignInForm Component", () => {
  let logInMock: jest.Mock;

  beforeEach(() => {
    logInMock = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      logIn: logInMock,
      logOut: jest.fn(),
      isAuthenticated: false,
    });
  });

  test("renders email and password fields", () => {
    render(<SignInForm />);

    expect(screen.getByPlaceholderText("Email*")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password*")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    render(<SignInForm />);

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test("shows validation error for invalid email", async () => {
    render(<SignInForm />);

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    fireEvent.input(screen.getByPlaceholderText("Email*"), {
      target: { value: "invalid-email" },
    });

    await waitFor(() => {
      const error = screen.getByTestId("email-error");
      const errorText = within(error).getByText(/invalid email/i);
      expect(errorText).toBeInTheDocument();
    });
  });

  test("calls logIn with correct data on successful submit", async () => {
    render(<SignInForm />);

    fireEvent.input(screen.getByPlaceholderText("Email*"), {
      target: { value: "prologin@prologin.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password*"), {
      target: { value: "ProLogin123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(logInMock).toHaveBeenCalledWith({
        email: "prologin@prologin.com",
        password: "ProLogin123456",
      });
    });
  });

  test("does not call logIn with invalid data", async () => {
    render(<SignInForm />);

    fireEvent.input(screen.getByPlaceholderText("Email*"), {
      target: { value: "invalid-email" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password*"), {
      target: { value: "short" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(logInMock).not.toHaveBeenCalled();
    });
  });
});
