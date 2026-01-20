import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Settings,
  Layers,
  Wine,
  Plus,
  BarChart3,
  Shield,
  Lock,
  Eye,
  Calendar,
  Clock,
  PanelRightClose,
} from 'lucide-react';

interface DashboardRightSidebarProps {
  onCollapse?: () => void;
}

export function DashboardRightSidebar({ onCollapse }: DashboardRightSidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="w-full h-full p-2">
      {/* ==========================================
          HEADER WITH COLLAPSE BUTTON
          ========================================== */}
      {onCollapse && (
        <div className="flex items-center justify-end mb-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-60 hover:opacity-100"
            onClick={onCollapse}
            title="Collapse Right Sidebar"
          >
            <PanelRightClose className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Batch Queue Status */}
      <div className="border border-border rounded bg-card mb-4">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <Package className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">Queue Status</span>
        </div>
        <div className="p-2 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Jobs</span>
            <Badge variant="outline" className="h-4 text-[10px]">2</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Queued</span>
            <span>5</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed (24h)</span>
            <span>147</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="border border-border rounded bg-card mb-4">
        <div className="p-2 border-b border-border bg-muted/50">
          <span className="text-xs font-bold uppercase flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Quick Actions
          </span>
        </div>
        <div className="p-3 grid grid-cols-2 gap-2">
          {/* Brand Actions */}
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/brands/create')}>
            <Layers className="h-4 w-4 text-amber-600" />
            <span className="text-xs">New Brand</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/brands')}>
            <Layers className="h-4 w-4" />
            <span className="text-xs">View Brands</span>
          </Button>
          
          {/* Product Actions */}
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/products/create')}>
            <Wine className="h-4 w-4 text-purple-600" />
            <span className="text-xs">New Product</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/products')}>
            <Wine className="h-4 w-4" />
            <span className="text-xs">View Products</span>
          </Button>
          
          {/* Batch Actions */}
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/batches/create')}>
            <Plus className="h-4 w-4 text-primary" />
            <span className="text-xs">New Batch</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/batches')}>
            <Package className="h-4 w-4" />
            <span className="text-xs">View Batches</span>
          </Button>
          
          {/* Other Actions */}
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/analytics')}>
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">Analytics</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/security')}>
            <Shield className="h-4 w-4" />
            <span className="text-xs">Security</span>
          </Button>
        </div>
      </div>

      {/* Security Status */}
      <div className="border border-border rounded bg-card mb-4">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <Lock className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">Security Status</span>
        </div>
        <div className="p-2 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Threat Level</span>
            <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
              LOW
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs">Last Audit</span>
            <span className="text-xs text-muted-foreground">2h ago</span>
          </div>
          <Button variant="outline" size="sm" className="w-full h-7 text-xs mt-2">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
        </div>
      </div>

      {/* Scheduled Tasks */}
      <div className="border border-border rounded bg-card">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">Scheduled Tasks</span>
        </div>
        <div className="p-2 space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="flex-1">Database Backup</span>
            <span className="text-muted-foreground">02:00</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="flex-1">Report Generation</span>
            <span className="text-muted-foreground">06:00</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="flex-1">Certificate Check</span>
            <span className="text-muted-foreground">12:00</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="flex-1">Analytics Sync</span>
            <span className="text-muted-foreground">18:00</span>
          </div>
        </div>
      </div>
    </aside>
  );
}