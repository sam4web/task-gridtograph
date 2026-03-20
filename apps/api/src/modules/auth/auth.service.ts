import { userRepository } from "@repo/database/repositories";
import type { LoginUserDTO, RegisterUserDTO, User } from "@repo/shared";
import bcrypt from "bcryptjs";

import { env } from "../../config";
import { ApiError, generateToken, verifyToken } from "../../lib";

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  public async login({
    email,
    password,
  }: LoginUserDTO): Promise<IAuthResponse> {
    const user = await userRepository.existsByEmail(email);
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
    const existingUser = await userRepository.existsByEmail(email);
    if (existingUser) {
      throw ApiError.conflict("An account with this email already exists.");
    }
    const user = await userRepository.create({ email, password });
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

  public async refresh(token: string): Promise<IAuthResponse> {
    const decoded = verifyToken(token, env.REFRESH_TOKEN_SECRET);
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized("User not found or token invalid.");
    }
    const newPayload = { id: user.id, email: user.email };
    const accessToken = generateToken(
      newPayload,
      env.ACCESS_TOKEN_SECRET,
      env.ACCESS_TOKEN_EXPIRY_TIME,
    );
    const refreshToken = generateToken(
      newPayload,
      env.REFRESH_TOKEN_SECRET,
      env.REFRESH_TOKEN_EXPIRY_TIME,
    );
    return { accessToken, refreshToken };
  }

  public async me(userId: string): Promise<User> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.unauthorized("User not found or invalid id.");
    }
    return { email: user.email, id: user.id };
  }
}

export const authService = new AuthService();
