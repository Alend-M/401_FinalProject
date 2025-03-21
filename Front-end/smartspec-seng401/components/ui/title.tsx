import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

// Defining custom Title Component
export function Title({ children, className }: TitleProps) {
  return (
    <h1
      className={cn(
        "md:text-7xl sm:text-5xl text-4xl leading-none text-white font-semibold tracking-tighter",
        className
      )}
    >
      {children}
    </h1>
  );
}
