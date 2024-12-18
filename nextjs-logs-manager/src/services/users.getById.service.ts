import axios from "axios";
import { UserProfile } from "../types/users.types";

export const userService = {
    /**
     * Fetch a user by their ID.
     * @param id The ID of the user.
     * @returns Promise<UserProfile> The user profile details.
     * @throws Error if the request fails.
     */
    async fetchOneUser(id: number): Promise<UserProfile> {
        try {
            const response = await axios.get<UserProfile>(`/api/users/${id}`);
            return response.data;
        } catch (error: any) {
            console.error(`Error fetching user with ID ${id}:`, error.message || error);
            throw new Error(
                error.response?.data?.error || "Failed to fetch user. Please try again later."
            );
        }
    },

    /**
     * Fetch the profile of the currently authenticated user.
     * @returns Promise<UserProfile> The profile of the authenticated user.
     * @throws Error if the request fails.
     */
    async fetchUserProfile(): Promise<UserProfile> {
        try {
            const response = await axios.get<UserProfile>("/api/users/profile");
            return response.data;
        } catch (error: any) {
            console.error("Error fetching user profile:", error.message || error);
            throw new Error(
                error.response?.data?.error || "Failed to fetch user profile. Please try again later."
            );
        }
    },
};
