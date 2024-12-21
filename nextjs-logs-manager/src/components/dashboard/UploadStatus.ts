type UploadStatus =
  | {
      type: "idle";
    }
  | {
      type: "waiting to upload";
      lines: string[];
    }
  | {
      type: "loading";
    }
  | {
      type: "success";
    }
  | {
      type: "error";
      message: string;
      unsaved: {
        raw: string;
        error: string;
      }[];
    };

export default UploadStatus;
