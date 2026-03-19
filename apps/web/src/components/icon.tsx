import { icons, type LucideProps } from "lucide-react";
import { memo } from "react";

interface IconProps extends LucideProps {
  name: keyof typeof icons;
  className?: string;
  size?: number;
}

function LucideIcon({
  name,
  color,
  size = 20,
  className,
  ...props
}: IconProps) {
  const Icon = icons[name];
  if (!Icon) {
    return (
      <span className="text-xs text-red-500">Icon "{name}" not found</span>
    );
  }
  return <Icon color={color} size={size} className={className} {...props} />;
}

export const Icon = memo(LucideIcon);
