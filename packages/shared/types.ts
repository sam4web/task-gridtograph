import type { InsertUser } from "@repo/database/postgres";

export type AuthDTO = Pick<InsertUser, "email" | "password">;
export type RegisterUserDTO = AuthDTO;
export type LoginUserDTO = AuthDTO;

export interface IAuthResponse {
  accessToken: string;
}

export interface User {
  id: string;
  email: string;
}

export interface IApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
