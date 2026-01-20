import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Eye, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Clock,
  ArrowRight,
  Activity,
  Users,
  Zap,
  QrCode,
  Calendar,
  Minus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * AnalyticsOverview - Dashboard analytics widget
 * 
 * NOTE: Currently shows placeholders (—) until real API data is connected.
 * All structure and titles are preserved for future integration.
 */

export const AnalyticsOverview = () => {
  const navigate = useNavigate();

  // Placeholder indicator component
  const PlaceholderValue = ({ size = 'lg' }: { size?: 'sm' | 'lg' }) => (
    <span className={`text-muted-foreground ${size === 'lg' ? 'text-2xl' : 'text-sm'}`}>
      —
    </span>
  );

  // Placeholder trend badge (neutral)
  const PlaceholderTrend = () => (
    <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
      <Minus className="h-3 w-3" />
      <span>—%</span>
    </div>
  );

  return (
    <Card className="border-green-500/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Analytics Overview</CardTitle>
              <CardDescription>Performance by protection method</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1 bg-muted/50 text-muted-foreground border-border">
            <Activity className="h-3 w-3" />
            Awaiting Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Time Range Selector - Disabled until data available */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Time Range:</span>
            <span className="text-foreground">Last 7 Days</span>
          </div>
          <div className="flex gap-1">
            {['24h', '7d', '30d', '90d'].map((range) => (
              <Button
                key={range}
                variant={range === '7d' ? 'default' : 'outline'}
                size="sm"
                disabled
                className="h-7 px-3 text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        {/* Method Tab Header */}
        <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg border border-border/50">
          <QrCode className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Dual QR System</span>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Total Scans */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Total Scans</span>
              </div>
              <PlaceholderTrend />
            </div>
            <div className="text-2xl font-bold">
              <PlaceholderValue />
            </div>
            <div className="text-xs text-muted-foreground">Last 7 Days</div>
          </div>

          {/* Verification Rate */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
              <PlaceholderTrend />
            </div>
            <div className="text-2xl font-bold">
              <PlaceholderValue />
            </div>
            <div className="text-xs text-muted-foreground">— total</div>
          </div>

          {/* Unique Users */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Unique Users</span>
              </div>
              <PlaceholderTrend />
            </div>
            <div className="text-2xl font-bold">
              <PlaceholderValue />
            </div>
            <div className="text-xs text-muted-foreground">Active consumers</div>
          </div>

          {/* Avg Scan Time */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Scan Speed</span>
              </div>
              <PlaceholderTrend />
            </div>
            <div className="text-2xl font-bold">
              <PlaceholderValue />
            </div>
            <div className="text-xs text-muted-foreground">Average time</div>
          </div>

        </div>

        {/* Scan Trend Chart Placeholder */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              Scan Activity Trend
            </h4>
            <span className="text-xs text-muted-foreground">Last 7 Days</span>
          </div>
          <div className="h-24 w-full rounded-lg bg-muted/20 border border-dashed border-border flex items-center justify-center">
            <span className="text-xs text-muted-foreground">Chart data unavailable</span>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Quick Insights</h4>
          
          {/* Geographic Distribution */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <div className="text-xs">
                <div className="font-medium">Top Location</div>
                <div className="text-muted-foreground">— of scans</div>
              </div>
            </div>
            <Progress value={0} className="w-20 h-2" />
          </div>

          {/* Device Distribution */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <div className="text-xs">
                <div className="font-medium">Device Split</div>
                <div className="text-muted-foreground">—% mobile</div>
              </div>
            </div>
            <Progress value={0} className="w-20 h-2" />
          </div>

          {/* Peak Time */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <div className="text-xs">
                <div className="font-medium">Peak Hour</div>
                <div className="text-muted-foreground">Highest activity</div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              —
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/analytics')}
            className="w-full"
          >
            Full Analytics
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled
            className="w-full"
          >
            Export Report
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};