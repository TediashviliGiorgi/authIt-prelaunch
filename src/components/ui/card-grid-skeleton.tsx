import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ==========================================
// BRAND CARD SKELETON
// ==========================================

export function BrandCardSkeleton() {
  return (
    <Card className="animate-fade-in overflow-hidden">
      {/* Banner/Logo area */}
      <div className="h-24 bg-muted relative">
        <Skeleton className="absolute bottom-0 left-4 translate-y-1/2 h-16 w-16 rounded-lg" />
      </div>
      
      <CardHeader className="pt-10 pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// PRODUCT CARD SKELETON
// ==========================================

export function ProductCardSkeleton() {
  return (
    <Card className="animate-fade-in overflow-hidden">
      {/* Image area */}
      <Skeleton className="h-48 w-full rounded-t-lg rounded-b-none" />
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Category & Vintage */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        
        {/* Stats row */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-20" />
          <div className="flex gap-1">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// GRID SKELETONS
// ==========================================

interface CardGridSkeletonProps {
  count?: number;
  type?: 'brand' | 'product';
}

export function CardGridSkeleton({ count = 6, type = 'brand' }: CardGridSkeletonProps) {
  const CardSkeleton = type === 'brand' ? BrandCardSkeleton : ProductCardSkeleton;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// ==========================================
// SIMPLE CARD SKELETON (Generic)
// ==========================================

export function SimpleCardSkeleton() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}