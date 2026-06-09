import { cn } from '@/lib/utils'

/**
 * Hero-specific ambient layer — adds extra depth and a radial vignette
 * on top of the GlobalBackground that applies site-wide.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10', className)}>
      {/* Extra local cyan bloom behind the hero content */}
      <div
        className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full blur-[160px]"
        style={{
          background: 'radial-gradient(circle, oklch(0.75 0.15 195 / 0.12) 0%, transparent 70%)',
        }}
      />
      {/* Bottom gradient to help text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_80%,transparent_0%,oklch(0.06_0.005_260/0.6)_100%)]" />
    </div>
  )
}
