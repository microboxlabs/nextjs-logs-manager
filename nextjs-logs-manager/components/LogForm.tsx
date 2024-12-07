"use client";

import { useState, useEffect } from "react";
import { Button, TextInput, Select, Textarea, Alert } from "flowbite-react";
import { logEntrySchema, LogEntry } from "@/lib/schemas";
import { ZodError } from "zod";

export function LogForm() {
  const [logEntry, setLogEntry] = useState<LogEntry>({
    timestamp: "",
    level: "INFO",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof LogEntry, string>>>(
    {},
  );
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const validateField = (name: keyof LogEntry, value: string) => {
    try {
      logEntrySchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === "timestamp") {
      // Convert the datetime-local value to the required format
      const date = new Date(value);
      const formattedTimestamp = date
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      setLogEntry((prev) => ({ ...prev, [name]: formattedTimestamp }));
      validateField(name, formattedTimestamp);
    } else {
      setLogEntry((prev) => ({ ...prev, [name]: value }));
      validateField(name as keyof LogEntry, value);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === undefined) &&
      Object.values(logEntry).every((value) => value !== "")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setStatus("idle");

    try {
      const validatedData = logEntrySchema.parse(logEntry);
      const response = await fetch("/api/add-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setStatus("success");
        setLogEntry({ timestamp: "", level: "INFO", service: "", message: "" });
        setErrors({});
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Validation error:", error);
      setStatus("error");
    }
  };

  useEffect(() => {
    // Validate all fields on component mount
    Object.entries(logEntry).forEach(([key, value]) => {
      validateField(key as keyof LogEntry, value);
    });
  }, []);

  const getInputColor = (fieldName: keyof LogEntry) => {
    if (errors[fieldName]) return "failure";
    if (logEntry[fieldName]) return "success";
    return undefined;
  };

  // Convert the timestamp back to datetime-local format for the input
  const getDateTimeLocalValue = () => {
    if (!logEntry.timestamp) return "";
    return logEntry.timestamp.replace(" ", "T").slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextInput
        type="datetime-local"
        name="timestamp"
        value={getDateTimeLocalValue()}
        onChange={handleChange}
        color={getInputColor("timestamp")}
        helperText={errors.timestamp}
        required
      />
      <Select
        name="level"
        value={logEntry.level}
        onChange={handleChange}
        color={getInputColor("level")}
        helperText={errors.level}
        required
      >
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="ERROR">ERROR</option>
      </Select>
      <TextInput
        type="text"
        name="service"
        value={logEntry.service}
        onChange={handleChange}
        color={getInputColor("service")}
        helperText={errors.service}
        placeholder="Service Name"
        required
      />
      <Textarea
        name="message"
        value={logEntry.message}
        onChange={handleChange}
        color={getInputColor("message")}
        helperText={errors.message}
        placeholder="Log Message"
        required
      />
      <Button type="submit" disabled={!isFormValid()}>
        Add Log Entry
      </Button>
      {status === "success" && (
        <Alert color="success">Log entry added successfully!</Alert>
      )}
      {status === "error" && (
        <Alert color="failure">Error adding log entry. Please try again.</Alert>
      )}
    </form>
  );
}
