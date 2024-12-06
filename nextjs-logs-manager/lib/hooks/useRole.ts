import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";

export const useRole = (requiredRole: string) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

    if (!token) {
      setRole(null);
      return;
    }

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as { role: string };
      setRole(decoded.role);
    } catch {
      setRole(null);
    }
  }, []);

  return role === requiredRole;
};
