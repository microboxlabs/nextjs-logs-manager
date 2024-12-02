"use client";
import { Button, FileInput, Label } from "flowbite-react";

interface FormProps {
  dataUpload: string;
}

const LoadForm: React.FC<FormProps> = ({ dataUpload }) => {
  return (
    <form className="flex max-w-md flex-col gap-4" action={dataUpload}>
      <div className="mb-2 block">
        <Label htmlFor="file-upload" value="Upload log file" />
      </div>
      <FileInput id="file-upload" name="file" />
      <Button type="submit">Upload</Button>
    </form>
  );
};

export default LoadForm;
