import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Activity,
  Lock,
  AlertOctagon,
  Eye,
  ArrowRight,
  ShieldCheck,
  Skull,
  QrCode,
  Calendar,
  Minus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * SecurityOverview - Dashboard security widget
 * 
 * NOTE: Currently shows placeholders (—) until real API data is connected.
 * All structure and titles are preserved for future integration.
 */

export const SecurityOverview = () => {
  const navigate = useNavigate();

  return (
    <Card className="border-red-500/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Overview</CardTitle>
              <CardDescription>Threat detection & protection</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1 bg-muted/50 text-muted-foreground border-border">
            <Activity className="h-3 w-3" />
            Awaiting Data
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Time Range Selector - Disabled */}
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

        {/* Security Health Score - Placeholder */}
        <div className="p-4 rounded-lg border-2 bg-muted/20 border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Security Health Score</div>
              <div className="text-3xl font-bold text-muted-foreground">
                —/100
              </div>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-muted/30">
              <ShieldCheck className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
          <Progress value={0} className="h-2" />
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
            <Minus className="h-3 w-3" />
            <span>Awaiting data</span>
          </div>
        </div>

        {/* Active Alerts Summary - Placeholder */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-1.5 text-destructive">
              <AlertOctagon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Critical</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">—</div>
          </div>

          <div className="space-y-1 p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-center gap-1.5 text-warning">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Warning</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">—</div>
          </div>

          <div className="space-y-1 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-1.5 text-blue-500">
              <Activity className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Info</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">—</div>
          </div>
        </div>

        {/* Key Security Metrics - Placeholder */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Eye className="h-4 w-4 text-red-500" />
            Security Metrics
          </h4>
          
          {/* Verification Success Rate */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <div className="text-xs">
                <div className="font-medium">Authentic Verifications</div>
                <div className="text-muted-foreground">— / —</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-muted/30 text-muted-foreground border-border">
              —%
            </Badge>
          </div>

          {/* Suspicious Activity */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Skull className="h-4 w-4 text-warning" />
              <div className="text-xs">
                <div className="font-medium">Suspicious Scans</div>
                <div className="text-muted-foreground">Flagged for review</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-muted/30 text-muted-foreground border-border">
              —
            </Badge>
          </div>

          {/* Blocked Attempts */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-destructive" />
              <div className="text-xs">
                <div className="font-medium">Blocked Attempts</div>
                <div className="text-muted-foreground">— in last 24h</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-muted/30 text-muted-foreground border-border">
              —
            </Badge>
          </div>
        </div>

        {/* Recent Incidents - Placeholder */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Recent Incidents
            </h4>
          </div>
          
          <div className="rounded-lg border border-dashed border-border p-4 text-center">
            <p className="text-xs text-muted-foreground">No incidents to display</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/security')}
            className="w-full"
          >
            Security Center
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled
            className="w-full"
          >
            View Alerts
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};