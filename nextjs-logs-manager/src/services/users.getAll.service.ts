import { UserView } from "../types/db.types";

export const fetchUsers = async (): Promise<UserView[]> => {
    const response = await fetch("/api/users");
    if (!response.ok) throw new Error("Failed to fetch users.");
    return response.json(); // Esto ya devuelve `id`, `email`, `role`, `permissions`
};
