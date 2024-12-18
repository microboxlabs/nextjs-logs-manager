import axios from "axios";

/**
 * Uploads a log file to the server.
 *
 * @param {File} file - The log file to be uploaded.
 * @returns {Promise<void>} A promise that resolves when the file is successfully uploaded.
 * @throws {Error} Throws an error if the file upload fails.
 *
 * @example
 * ```typescript
 * const file = new File(["log content"], "log.txt", { type: "text/plain" });
 * await uploadLogFile(file);
 * ```
 */
export const uploadLogFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        // Send the file using Axios
        const response = await axios.post("/api/log/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status !== 200) {
            throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        console.log("File uploaded successfully!");
    } catch (error: any) {
        console.error("Error uploading file:", error.message || error);
        throw new Error(error.response?.data?.message || "Failed to upload file.");
    }
};
