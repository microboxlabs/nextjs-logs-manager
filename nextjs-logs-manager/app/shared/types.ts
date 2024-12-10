import type { Account, Log, Entry } from "@prisma/client";

export type TSignInForm = {
  email: string;
  password: string;
  remember: boolean;
};

export type BaseCompProps = {
  children?: React.ReactNode;
  className?: string;
};

export enum Role {
  Admin = 1,
  User,
}

export type TLoginResponse = {
  token: string;
  account: Omit<Account, "password">;
};

type PaginatedReponse<T> = {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
  };
};

export type TPaginatedLogsResponse = PaginatedReponse<Log>;

export type TPaginatedEntriesResponse = PaginatedReponse<Entry>;
