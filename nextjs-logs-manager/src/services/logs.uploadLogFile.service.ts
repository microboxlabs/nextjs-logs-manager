export const uploadLogFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/log/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to upload file: ${errorText}`);
        }

        console.log("File uploaded successfully!");
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};
