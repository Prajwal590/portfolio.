/**
 * Skeleton loader components for loading states
 */

export function SkeletonBlock({ className = '' }) {
  return <div className={`skeleton rounded-lg ${className}`} />
}

export function BlogCardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <SkeletonBlock className="h-5 w-3/4" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex items-center justify-between pt-2">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
    </div>
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <SkeletonBlock className="h-6 w-1/2" />
      <SkeletonBlock className="h-4 w-full" />
      <SkeletonBlock className="h-4 w-4/5" />
      <div className="flex gap-2 pt-2">
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-16 rounded-full" />
        <SkeletonBlock className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

export function SingleBlogSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-10">
      <SkeletonBlock className="h-10 w-4/5" />
      <SkeletonBlock className="h-5 w-1/3" />
      <div className="space-y-3 pt-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className={`h-4 ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`} />
        ))}
      </div>
    </div>
  )
}
