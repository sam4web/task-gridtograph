import { useEffect } from "react";
import { useAuthActions, useAuthStore } from "../store/auth-store";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize } = useAuthActions();
  const isInitializing = useAuthStore((s) => s.isInitializing);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // show loader when checking cookies
  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading session...
      </div>
    );
  }

  return <>{children}</>;
};
