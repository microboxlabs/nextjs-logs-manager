type FormStatus =
  | {
      type: "idle";
    }
  | {
      type: "loading";
    }
  | {
      type: "success";
    };

export default FormStatus;
