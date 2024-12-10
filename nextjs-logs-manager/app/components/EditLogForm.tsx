"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Datepicker, TextInput, Label, Button, Select } from "flowbite-react";
import type { Log } from "@prisma/client";

import Heading from "./Heading";
import ErrorMessage from "./ErrorMessage";

export default function EditLogForm({ log }: { log?: Log }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Log>({
    defaultValues: { ...log },
  });
  const [isEditing, setIsEditing] = useState(false);

  const submit = async (data: Log) => {
    setIsEditing(false);

    try {
      await axios.put("/api/manage-logs", data);
      alert("Log updated successfully");
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <header className="mb-4 flex flex-col gap-6 sm:mb-8 sm:flex-row sm:justify-between">
        <Heading className="text-teal-700">{`Log #${log!.id}`}</Heading>
        {isEditing || isSubmitting ? (
          <Button
            type="submit"
            color="success"
            pill
            isProcessing={isSubmitting}
          >
            Save changes
          </Button>
        ) : (
          <Button type="button" onClick={handleEdit} pill>
            Update
          </Button>
        )}
      </header>

      <div className="max-w-screen-sm">
        <div className="flex flex-col sm:flex-row sm:gap-8">
          <div className="mb-6">
            <Label htmlFor="date">Date</Label>
            <Controller
              control={control}
              name="date"
              rules={{ required: "Date required" }}
              render={({ field: { value, onChange } }) => (
                <Datepicker
                  id="date"
                  disabled={!isEditing}
                  defaultDate={new Date(value)}
                  onSelectedDateChanged={(e) => {
                    const dateStr = e.toJSON();
                    const i = dateStr.indexOf("T");
                    const selectedDateStr = dateStr.slice(0, i);
                    // console.log(date);
                    onChange(selectedDateStr);
                  }}
                />
              )}
            />
            {errors && errors.date && (
              <ErrorMessage>{errors.date.message}</ErrorMessage>
            )}
          </div>

          <div className="mb-6">
            <Label htmlFor="time">Time:</Label>
            <Controller
              control={control}
              name="time"
              rules={{ required: "Time required" }}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  type="time"
                  disabled={!isEditing}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors && errors.time && (
              <ErrorMessage>{errors.time.message}</ErrorMessage>
            )}
          </div>
        </div>

        <div className="mb-6">
          <Label htmlFor="level">Serverity</Label>
          <Controller
            control={control}
            name="level"
            rules={{ required: "Severity required" }}
            render={({ field: { value, onChange } }) => (
              <Select disabled={!isEditing} value={value} onChange={onChange}>
                <option value="INFO">INFO</option>
                <option value="ERROR">ERROR</option>
                <option value="WARNING">WARNING</option>
              </Select>
            )}
          />
          {errors && errors.level && (
            <ErrorMessage>{errors.level.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="serviceName">Service</Label>
          <Controller
            control={control}
            name="serviceName"
            rules={{
              required: "Service required",
            }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                disabled={!isEditing}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && errors.serviceName && (
            <ErrorMessage>{errors.serviceName.message}</ErrorMessage>
          )}
        </div>

        <div className="mb-6">
          <Label htmlFor="message">Message</Label>
          <Controller
            control={control}
            name="message"
            rules={{ required: "Message required" }}
            render={({ field: { value, onChange } }) => (
              <TextInput
                disabled={!isEditing}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {errors && errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}
        </div>
      </div>
    </form>
  );
}
