export type TSignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type TLog = {
  id?: number;
  date: string;
  time: string;
  level: string;
  serviceName: string;
  message: string;
};

export type TEntry = {
  id?: number;
  date: string;
  user: string;
  details: string;
};

export type BaseCompProps = {
  children?: React.ReactNode;
  className?: string;
};

export enum Role {
  Admin = 1,
  User,
}

export type TAccount = {
  id: number;
  email: string;
  username: string;
  roleId: Role;
};

export type TLoginResponse = {
  token: string;
  account: TAccount;
};
