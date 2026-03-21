import { Link } from "@tanstack/react-router";
import { AlertCircle, type LucideIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type ErrorAction =
  | { type: "button"; label: string; onClick: () => void; icon: LucideIcon }
  | { type: "link"; label: string; to: string; icon: LucideIcon };

interface DatasetErrorStateProps {
  title: string;
  description: string;
  action: ErrorAction;
  className?: string;
}

export function DatasetErrorState({
  title,
  description,
  action,
  className,
}: DatasetErrorStateProps) {
  const Icon = action.icon;
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center pt-20 px-4 animate-in fade-in duration-300",
        className,
      )}
    >
      <Alert
        variant="destructive"
        className="max-w-md bg-destructive/5 border-destructive/20 shadow-sm py-4"
      >
        <AlertTitle className="text-base font-semibold flex items-center gap-2">
          <AlertCircle className="size-5" />
          {title}
        </AlertTitle>
        <AlertDescription className="mt-2 text-sm leading-relaxed opacity-90">
          {description}
        </AlertDescription>

        <div className="mt-5 flex justify-center">
          {action.type === "button" ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={action.onClick}
              className="gap-2 border-destructive/30 hover:bg-destructive/10 cursor-pointer"
            >
              {action.label}
              <Icon className="size-3.5" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="gap-2 cursor-pointer transition-all"
            >
              <Link to={action.to}>
                {action.label}
                <Icon className="size-4" />
              </Link>
            </Button>
          )}
        </div>
      </Alert>
    </div>
  );
}
