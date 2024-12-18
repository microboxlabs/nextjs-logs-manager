import axios from "axios";
import { userService, UserProfile } from "../../src/services/users.getById.service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("userService", () => {
    const mockUser: UserProfile = {
        id: 1,
        email: "user@example.com",
        role: "Admin",
        permissions: ["READ", "WRITE"],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("fetchOneUser", () => {
        it("should fetch a user by ID successfully", async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

            const result = await userService.fetchOneUser(1);

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/1");
            expect(result).toEqual(mockUser);
        });

        it("should throw an error when the server responds with an error", async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { error: "User not found" },
                    status: 404,
                },
            });

            await expect(userService.fetchOneUser(999)).rejects.toThrow("User not found");

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/999");
        });

        it("should throw a generic error for unexpected exceptions", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(userService.fetchOneUser(1)).rejects.toThrow(
                "Failed to fetch user. Please try again later."
            );

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/1");
        });
    });

    describe("fetchUserProfile", () => {
        it("should fetch the authenticated user's profile successfully", async () => {
            mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

            const result = await userService.fetchUserProfile();

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/profile");
            expect(result).toEqual(mockUser);
        });

        it("should throw an error when the server responds with an error", async () => {
            mockedAxios.get.mockRejectedValueOnce({
                response: {
                    data: { error: "Unauthorized" },
                    status: 403,
                },
            });

            await expect(userService.fetchUserProfile()).rejects.toThrow("Unauthorized");

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/profile");
        });

        it("should throw a generic error for unexpected exceptions", async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

            await expect(userService.fetchUserProfile()).rejects.toThrow(
                "Failed to fetch user profile. Please try again later."
            );

            expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/profile");
        });
    });
});
