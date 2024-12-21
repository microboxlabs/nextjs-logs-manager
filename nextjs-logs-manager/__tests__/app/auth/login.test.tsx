import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "@/src/components/auth/forms/LoginForm";
import { useToast } from "@/src/hooks/use-toast";
import { redirect } from "next/navigation";

// Mocks
jest.mock("@/src/hooks/use-toast");

// Mock de redirect de Next.js
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("LoginForm", () => {
  let mockToast: jest.Mock;

  // Definir el mock antes de cada prueba
  beforeEach(() => {
    mockToast = jest.fn();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it("should submit the form with valid inputs and redirect to the homepage on success", async () => {
    // Mock de la respuesta exitosa de la API
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true, // Simula una respuesta de éxito
      json: async () => ({}), // La respuesta JSON vacía
    });

    // Renderizamos el formulario
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /continue/i });

    // Simulamos que el usuario ingresa los datos
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulamos el envío del formulario
    fireEvent.click(submitButton);

    // Esperamos a que se haya llamado a la función redirect
    await waitFor(() => {
      expect(redirect).toHaveBeenCalledWith("/");
    });

    // Verificamos que el toast no se haya mostrado porque el login fue exitoso
    expect(mockToast).not.toHaveBeenCalled();
  });

  it("should show an error message if login fails", async () => {
    // Mock de la respuesta de la API con error
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false, // Simula una respuesta de error
      json: async () => ({ error: "Invalid credentials" }), // El mensaje de error
    });

    // Renderizamos el formulario
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /continue/i });

    // Simulamos que el usuario ingresa los datos
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    // Simulamos el envío del formulario
    fireEvent.click(submitButton);

    // Esperamos a que se haya mostrado el toast con el mensaje de error
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: "destructive",
        title: "Couldn't log you in",
        description: "Invalid credentials",
      });
    });
  });
});
