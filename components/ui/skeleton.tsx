import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('shimmer-bar rounded-2xl', className)} />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-3xl border border-white/10 bg-white/5 p-7', className)}>
      <Skeleton className="h-10 w-10 rounded-2xl" />
      <Skeleton className="mt-6 h-5 w-2/3" />
      <Skeleton className="mt-3 h-3.5 w-full" />
      <Skeleton className="mt-2 h-3.5 w-4/5" />
      <Skeleton className="mt-2 h-3.5 w-3/5" />
    </div>
  )
}

export function SkeletonStepCard({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-3xl border border-white/10 bg-white/5 p-7', className)}>
      <Skeleton className="h-9 w-9 rounded-lg" />
      <Skeleton className="mt-4 h-5 w-1/2" />
      <Skeleton className="mt-3 h-3.5 w-full" />
      <Skeleton className="mt-2 h-3.5 w-4/5" />
    </div>
  )
}
