import axios from "axios";
import { login } from "../../src/services/auth.login.service";
import { LoginValues, LoginResponse } from "../../src/types/auth.types";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("login service", () => {
    const loginUrl = "/api/auth/login";

    it("should return token and user data when login is successful", async () => {
        const mockValues: LoginValues = { email: "test@example.com", password: "123456" };
        const mockResponse: LoginResponse = {
            token: "mock-token",
            user: { id: 1, email: "test@example.com", role: "admin" },
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

        const result = await login(mockValues);

        expect(axios.post).toHaveBeenCalledWith(loginUrl, mockValues);
        expect(result).toEqual(mockResponse);
    });

    it("should throw an error when login fails", async () => {
        const mockValues: LoginValues = { email: "test@example.com", password: "wrong-password" };

        mockedAxios.post.mockRejectedValueOnce({
            response: { data: { message: "Invalid credentials" } },
        });

        await expect(login(mockValues)).rejects.toThrow("Invalid credentials");
        expect(axios.post).toHaveBeenCalledWith(loginUrl, mockValues);
    });

    it("should throw a generic error when response is unavailable", async () => {
        const mockValues: LoginValues = { email: "test@example.com", password: "123456" };

        mockedAxios.post.mockRejectedValueOnce(new Error("Network Error"));

        await expect(login(mockValues)).rejects.toThrow("Error during login.");
        expect(axios.post).toHaveBeenCalledWith(loginUrl, mockValues);
    });
});
