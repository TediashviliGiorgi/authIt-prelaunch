import { Card, CardContent } from '@/components/ui/card';
import { Users, UserPlus, Mail, Package, Wine, BarChart3, TrendingUp } from 'lucide-react';
import { OrganizationStats } from '@/types/organization';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsCardsProps {
  stats: OrganizationStats | null;
  loading: boolean;
}

export function StatsCards({ stats, loading }: StatsCardsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statItems = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      subtitle: `${stats.activeMembers} active`,
    },
    {
      title: 'Pending Invites',
      value: stats.pendingInvites,
      icon: Mail,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      subtitle: 'awaiting response',
    },
    {
      title: 'Network Batches',
      value: stats.totalBatchesNetwork,
      icon: Package,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      subtitle: `${stats.totalUnitsNetwork.toLocaleString()} units`,
    },
    {
      title: 'New This Month',
      value: stats.newMembersThisMonth,
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      subtitle: 'new members',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <Card key={item.title} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>
                <p className="text-2xl font-bold mt-1">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.subtitle}
                </p>
              </div>
              <div className={`p-3 rounded-full ${item.bgColor}`}>
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
