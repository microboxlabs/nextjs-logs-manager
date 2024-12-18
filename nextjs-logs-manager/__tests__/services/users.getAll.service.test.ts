import axios from "axios";
import { fetchUsers } from "../../src/services/users.getAll.service";
import { UserView } from "../../src/types/db.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchUsers service", () => {
    const mockUsers: UserView[] = [
        {
            id: 1,
            email: "admin@example.com",
            role: "Admin",
            permissions: ["READ", "WRITE"],
        },
        {
            id: 2,
            email: "user@example.com",
            role: "User",
            permissions: ["READ"],
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch and return a list of users", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: mockUsers });

        const result = await fetchUsers();

        expect(mockedAxios.get).toHaveBeenCalledWith("/api/users");
        expect(result).toEqual(mockUsers);
    });

    it("should throw an error if the server responds with an error", async () => {
        mockedAxios.get.mockRejectedValueOnce({
            response: {
                data: { error: "Unauthorized access" },
                status: 403,
            },
        });

        await expect(fetchUsers()).rejects.toThrow("Unauthorized access");

        expect(mockedAxios.get).toHaveBeenCalled();
    });

    it("should throw a generic error for unexpected issues", async () => {
        mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

        await expect(fetchUsers()).rejects.toThrow("Failed to fetch users. Please try again later.");

        expect(mockedAxios.get).toHaveBeenCalled();
    });
});
