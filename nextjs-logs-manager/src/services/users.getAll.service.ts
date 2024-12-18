import axios from "axios";
import { UserView } from "../types/db.types";

/**
 * Fetches a list of users from the API.
 *
 * @returns {Promise<UserView[]>} A promise that resolves to an array of UserView objects.
 * @throws {Error} Throws an error if the request fails, with a message indicating the failure reason.
 */
export const fetchUsers = async (): Promise<UserView[]> => {
    try {
        const response = await axios.get<UserView[]>("/api/users");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching users:", error.message || error);
        throw new Error(
            error.response?.data?.error || "Failed to fetch users. Please try again later."
        );
    }
};
