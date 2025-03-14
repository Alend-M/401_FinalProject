import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

// Defining custom Title Component
export function BaseText({ children, className }: TitleProps) {
  return <p className={cn("text-base text-secondaryColor", className)}>{children}</p>;
}
