export type TSignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type TLog = {
  id?: number;
  date: Date;
  time: Date;
  level: string;
  serviceName: string;
  message: string;
};

export type TEntry = {
  id?: number;
  date: Date;
  user: string;
  details: string;
};
