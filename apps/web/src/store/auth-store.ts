import type { IApiResponse, IAuthResponse, User } from "@repo/shared";
import { create } from "zustand";
import { apiClient } from "~/lib/api-client";
import { queryClient } from "~/lib/query-client";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  actions: {
    initialize: () => Promise<void>;
    setAuth: (user: User, accessToken: string) => void;
    setToken: (token: string) => void;
    fetchUser: () => Promise<User>;
    clearAuth: () => void;
  };
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isInitializing: true,
  actions: {
    initialize: async () => {
      try {
        const data = await apiClient.post<
          IApiResponse<IAuthResponse>,
          IAuthResponse
        >("/auth/refresh");
        get().actions.setToken(data.token);
        await get().actions.fetchUser();
      } catch (error) {
        get().actions.clearAuth();
      } finally {
        set({ isInitializing: false });
      }
    },
    setAuth: (user, accessToken) =>
      set({ user, accessToken, isAuthenticated: true }),
    setToken: (token: string) => set({ accessToken: token }),

    fetchUser: async () => {
      try {
        const userData = await queryClient.fetchQuery({
          queryKey: ["auth", "me"],
          queryFn: async () => {
            return await apiClient.get<IApiResponse<User>, User>("/auth/me");
          },
        });
        set({ user: userData, isAuthenticated: true });
        return userData;
      } catch (error) {
        get().actions.clearAuth();
        queryClient.removeQueries({ queryKey: ["auth", "me"] });
        throw error;
      }
    },

    clearAuth: () =>
      set({ user: null, accessToken: null, isAuthenticated: false }),
  },
}));

export const useAuthUser = () => useAuthStore((s) => s.user);
export const useAccessToken = () => useAuthStore((s) => s.accessToken);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useAuthActions = () => useAuthStore((s) => s.actions);
