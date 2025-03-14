import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

// Defining custom Title Component
export function SmallText({ children, className }: TitleProps) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}
