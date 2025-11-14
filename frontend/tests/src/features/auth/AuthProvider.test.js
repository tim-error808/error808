import { render, screen, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../../../src/features/auth/AuthProvider";
import React from "react";

// Helper component to access context inside tests
const TestComponent = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="email">{user?.email || ""}</p>
      <p data-testid="username">{user?.username || ""}</p>
      <button
        onClick={() =>
          login({ email: "user@example.com", username: "testuser" })
        }
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  test("provides default user values", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("email").textContent).toBe("");
    expect(screen.getByTestId("username").textContent).toBe("");
  });

  test("updates user data when login is called", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText("Login");

    act(() => {
      loginButton.click();
    });

    expect(screen.getByTestId("email").textContent).toBe("user@example.com");
    expect(screen.getByTestId("username").textContent).toBe("testuser");
  });

  test("clears user data when logout is called", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText("Login");
    const logoutButton = screen.getByText("Logout");

    act(() => {
      loginButton.click(); // user logs in
    });

    expect(screen.getByTestId("email").textContent).toBe("user@example.com");

    act(() => {
      logoutButton.click(); // user logs out
    });

    expect(screen.getByTestId("email").textContent).toBe("");
    expect(screen.getByTestId("username").textContent).toBe("");
  });
});
