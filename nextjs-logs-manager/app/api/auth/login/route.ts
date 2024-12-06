// Import necessary modules from Next.js and external libraries
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authenticateUser } from "@/lib/db";

// Define the secret key for JWT token generation
const SECRET_KEY = process.env.JWT_SECRET || "S3cR3t";

/**
 * Handles the POST request for user login.
 *
 * @param req - The incoming NextRequest object containing the user's credentials.
 * @returns - A NextResponse object with the appropriate status code and JSON payload.
 *            If the credentials are valid, it returns a JSON object with a success message,
 *            a JWT token, and the user's username. It also sets two cookies: 'token' and 'user'.
 *            If the credentials are invalid, it returns a JSON object with an error message and a 401 status code.
 */
export async function POST(req: NextRequest) {
  // Extract username and password from the request body
  const { username, password } = await req.json();

  // Authenticate the user using the provided username
  const user = await authenticateUser(username);

  // Check if the user exists and the password matches
  if (!user || !bcrypt.compareSync(password, user.password)) {
    // If the credentials are invalid, return an error response with a 401 status code
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });

  // Create a JSON response with a success message, the JWT token, and the user's username
  const response = NextResponse.json({
    message: "Login successful",
    token: token,
    user: username,
  });

  // Set two cookies: 'token' and 'user' with the JWT token and the user's username
  // These cookies are set to be HTTP-only, secure (only sent over HTTPS), and expire after 1 hour
  response.cookies.set("token", token, {
    httpOnly: true, // Prevent access from JavaScript
    secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
    path: "/", // Ensure the cookie is sent on all routes
    maxAge: 3600, // Expire after 1 hour
  });
  response.cookies.set("user", username, {
    httpOnly: true, // Prevent access from JavaScript
    secure: process.env.NODE_ENV === "production", // Use HTTPS only in production
    path: "/", // Ensure the cookie is sent on all routes
    maxAge: 3600, // Expire after 1 hour
  });

  // Return the response
  return response;
}
