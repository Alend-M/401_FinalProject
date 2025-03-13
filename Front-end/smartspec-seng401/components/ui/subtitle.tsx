import { cn } from "@/lib/utils"

interface TitleProps {
  children: React.ReactNode
  className?: string
}

// Defining custom Subtitle Component
export function Subtitle({ children, className }: TitleProps) {
  return (
    <h1 
      className={cn(
        "text-3xl leading-snug text-gray-500 font-light tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  )
}