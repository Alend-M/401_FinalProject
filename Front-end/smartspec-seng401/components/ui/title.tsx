import { cn } from "@/lib/utils"

interface TitleProps {
  children: React.ReactNode
  className?: string
}

// Defining custom Title Component
export function Title({ children, className }: TitleProps) {
  return (
    <h1 
      className={cn(
        "text-7xl leading-loose text-white font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  )
}