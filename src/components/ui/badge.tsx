import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'neonCyan' | 'neonPurple' | 'neonGreen'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
    neonCyan: "border-cyan-500 bg-cyan-500/10 text-cyan-400 neon-cyan",
    neonPurple: "border-purple-500 bg-purple-500/10 text-purple-400 neon-purple",
    neonGreen: "border-green-500 bg-green-500/10 text-green-400 neon-green",
  }
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
