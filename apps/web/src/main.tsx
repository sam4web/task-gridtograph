import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "~/components/auth-provider";
import { TooltipProvider } from "~/components/ui/tooltip";
import { env } from "~/config/env";
import { queryClient } from "~/lib/query-client";
import { routeTree } from "~/routeTree.gen";
import "~/index.css";

if (env.VITE_ENV === "production") {
  disableReactDevTools();
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
}
