type ValueObject<T> =
  | {
      valid?: false;
      error: string;
      field?: undefined;
    }
  | {
      valid: true;
      error?: undefined;
      field: T;
    };

export default ValueObject;
