import {
  type IUserRepository,
  UserRepository,
} from "@repo/database/repositories";
import bcrypt from "bcryptjs";

import { env } from "../../config";
import { ApiError, generateToken } from "../../lib";
import type {
  IAuthResponse,
  LoginUserDTO,
  RegisterUserDTO,
} from "./auth.types";

class AuthService {
  private userRepository: IUserRepository;
  constructor(userRepository: IUserRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }

  public async login({
    email,
    password,
  }: LoginUserDTO): Promise<IAuthResponse> {
    const user = await this.userRepository.existsByEmail(email);
    if (!user) {
      throw ApiError.conflict("User with provided email does not exists.");
    }
    const doesPassMatch = await bcrypt.compare(password, user.password);
    if (!doesPassMatch) {
      throw ApiError.unauthorized("Invalid credentials.");
    }
    const payload = { id: user.id.toString(), email: user.email };
    const accessToken = generateToken(
      payload,
      env.ACCESS_TOKEN_SECRET,
      env.ACCESS_TOKEN_EXPIRY_TIME,
    );
    const refreshToken = generateToken(
      payload,
      env.REFRESH_TOKEN_SECRET,
      env.REFRESH_TOKEN_EXPIRY_TIME,
    );
    return { accessToken, refreshToken };
  }

  public async register({
    email,
    password,
  }: RegisterUserDTO): Promise<IAuthResponse> {
    const existingUser = await this.userRepository.existsByEmail(email);
    if (existingUser) {
      throw ApiError.conflict("An account with this email already exists.");
    }
    const user = await this.userRepository.create({ email, password });
    const payload = { id: user.id, email: user.email };
    const accessToken = generateToken(
      payload,
      env.ACCESS_TOKEN_SECRET,
      env.ACCESS_TOKEN_EXPIRY_TIME,
    );
    const refreshToken = generateToken(
      payload,
      env.REFRESH_TOKEN_SECRET,
      env.REFRESH_TOKEN_EXPIRY_TIME,
    );
    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
