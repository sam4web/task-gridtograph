import type {
  IAuthResponse,
  LoginUserDTO,
  RegisterUserDTO,
} from "@repo/shared";
import type { ValidatedRequest } from "../../middlewares/validate-request.middleware";

export type RegisterUserReq = ValidatedRequest & {
  validatedBody: RegisterUserDTO;
};

export type LoginUserReq = ValidatedRequest & {
  validatedBody: LoginUserDTO;
};

export interface IAuthServiceRes extends IAuthResponse {
  refreshToken: string;
}
