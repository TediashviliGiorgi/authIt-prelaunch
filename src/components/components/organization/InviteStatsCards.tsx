import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle, XCircle, Clock, Ban, TrendingUp } from 'lucide-react';
import { InviteStats } from '@/types/organization';
import { Skeleton } from '@/components/ui/skeleton';

interface InviteStatsCardsProps {
  stats: InviteStats | null;
  loading: boolean;
}

export function InviteStatsCards({ stats, loading }: InviteStatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <Skeleton className="h-4 w-16 mb-2" />
              <Skeleton className="h-6 w-8" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const items = [
    { label: 'Total', value: stats.total, icon: Mail, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Accepted', value: stats.accepted, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Declined', value: stats.declined, icon: XCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Expired', value: stats.expired, icon: Clock, color: 'text-gray-500', bg: 'bg-gray-500/10' },
    { label: 'Rate', value: `${stats.acceptanceRate}%`, icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${item.bg}`}>
                <item.icon className={`h-3.5 w-3.5 ${item.color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </div>
            <p className="text-xl font-bold mt-1">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}