import axios from "axios";
import { UserView } from "../types/db.types";

/**
 * Service to fetch all users.
 * @returns Promise<UserView[]> A list of users with their roles and permissions.
 * @throws Error if the request fails.
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
