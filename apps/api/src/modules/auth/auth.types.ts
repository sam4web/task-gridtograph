import type { InsertUser } from "@repo/database/postgres";
import type { ValidatedRequest } from "../../middlewares/validate-request.middleware";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type AuthDTO = Pick<InsertUser, "email" | "password">;
export type RegisterUserDTO = AuthDTO;
export type LoginUserDTO = AuthDTO;
export type RegisterUserReq = ValidatedRequest & {
  validatedBody: RegisterUserDTO;
};
export type LoginUserReq = ValidatedRequest & {
  validatedBody: LoginUserDTO;
};
