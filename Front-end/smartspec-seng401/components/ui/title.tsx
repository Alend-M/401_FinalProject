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
        "text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-tight md:leading-none text-white font-semibold tracking-tighter",
        className
      )}
    >
      {children}
    </h1>
  )
}