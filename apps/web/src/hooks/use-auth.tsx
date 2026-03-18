import type {
  IApiResponse,
  IAuthResponse,
  LoginUserDTO,
  RegisterUserDTO,
} from "@repo/shared";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { apiClient } from "~/lib/api-client";
import { useAuthActions } from "~/store/auth-store";

export const useRegister = () => {
  const { setToken, fetchUser } = useAuthActions();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterUserDTO) => {
      return apiClient.post<IApiResponse<IAuthResponse>, IAuthResponse>(
        "/auth/register",
        data,
      );
    },
    onSuccess: async (data) => {
      setToken(data.accessToken);
      await fetchUser();
      navigate({ to: "/dashboard" });
    },
  });
};

export const useLogin = () => {
  const { setToken, fetchUser } = useAuthActions();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginUserDTO) => {
      return apiClient.post<IApiResponse<IAuthResponse>, IAuthResponse>(
        "/auth/login",
        data,
      );
    },
    onSuccess: async (data) => {
      setToken(data.accessToken);
      await fetchUser();
      navigate({ to: "/dashboard" });
    },
  });
};
