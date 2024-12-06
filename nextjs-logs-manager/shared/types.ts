export type TSignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type TLog = {
  id?: number;
  timestamp: string;
  logLevel: string;
  serviceName: string;
  message: string;
};

export type TEntry = {
  id?: number;
  date: string;
  user: string;
  details: string;
};
