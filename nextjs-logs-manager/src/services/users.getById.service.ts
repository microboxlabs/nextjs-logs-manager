export interface UserProfile {
    id: number;
    email: string;
    role: string;
    permissions: string[];
}

export const fetchOneUser = async (id: number): Promise<UserProfile> => {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("Failed to fetch user.");
    return response.json();
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
    const response = await fetch("/api/users/profile");

    if (!response.ok) {
        throw new Error("Failed to fetch user profile.");
    }

    return response.json();
};