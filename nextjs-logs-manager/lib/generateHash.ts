import bcrypt from 'bcrypt';

/**
 * Generates a hashed version of the provided password using bcrypt.
 *
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password string.
 */
async function generateHash(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export default generateHash;