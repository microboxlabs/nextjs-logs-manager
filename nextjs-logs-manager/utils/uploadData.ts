import { apiUrl } from "@/constants/routes";

export const uploadData = async (fileContent: any) => {
    try {
        const response = await fetch(`${apiUrl}/log`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(fileContent),
        });

        if (!response.ok) {
            throw new Error("Failed to upload file");
        }

    } catch (error) {
        console.error("Error uploading file:", error);
    }
};