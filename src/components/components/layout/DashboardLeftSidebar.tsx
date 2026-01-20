import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Server,
  Database,
  Activity,
  HardDrive,
  Cpu,
  Bell,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  PanelLeftClose,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const systemStatus = {
  database: { status: 'online', latency: '12ms', connections: 847 },
  api: { status: 'online', requests: '2.4M/day', uptime: '99.97%' },
  storage: { used: 78.4, total: 500, unit: 'GB' },
  memory: { used: 62, total: 100, unit: '%' },
  cpu: { usage: 34, cores: 8 },
};

const recentEvents = [
  { id: 1, type: 'success', message: 'Batch #B-2024-0892 verification completed', time: '2 min ago', code: 'VRF-001' },
  { id: 2, type: 'warning', message: 'High scan volume detected in region EU-WEST', time: '5 min ago', code: 'ALT-003' },
  { id: 3, type: 'success', message: 'New batch created: Premium Reserve 2019', time: '12 min ago', code: 'BCH-NEW' },
  { id: 4, type: 'error', message: 'Failed authentication attempt blocked', time: '18 min ago', code: 'SEC-401' },
  { id: 5, type: 'info', message: 'System backup completed successfully', time: '1 hour ago', code: 'SYS-BKP' },
];

const batchQueue = [
  { id: 'B-2024-0893', name: 'Château Margaux 2020', status: 'processing', progress: 67, bottles: 2400 },
  { id: 'B-2024-0894', name: 'Dom Pérignon Vintage', status: 'queued', progress: 0, bottles: 1200 },
];

// ==========================================
// HELPER FUNCTION
// ==========================================
const getStatusIcon = (type: string) => {
  switch (type) {
    case 'success': return <CheckCircle className="h-3 w-3 text-green-500" />;
    case 'warning': return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
    case 'error': return <XCircle className="h-3 w-3 text-red-500" />;
    default: return <Activity className="h-3 w-3 text-blue-500" />;
  }
};

interface DashboardLeftSidebarProps {
  onCollapse?: () => void;
}

export function DashboardLeftSidebar({ onCollapse }: DashboardLeftSidebarProps) {
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
            title="Collapse Left Sidebar"
          >
            <PanelLeftClose className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* ==========================================
          SYSTEM STATUS - Window Style
          ========================================== */}
      <div className="border border-border rounded bg-card mb-4">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <Server className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">System Status</span>
        </div>
        <div className="p-2 space-y-2">
          {/* Database */}
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1 text-xs">
              <Database className="h-3 w-3" />
              Database
            </span>
            <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
              ONLINE
            </Badge>
          </div>
          <div className="text-[10px] text-muted-foreground pl-4">
            Latency: {systemStatus.database.latency} | Conn: {systemStatus.database.connections}
          </div>

          {/* API */}
          <div className="flex justify-between items-center pt-1">
            <span className="flex items-center gap-1 text-xs">
              <Activity className="h-3 w-3" />
              API Gateway
            </span>
            <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
              ONLINE
            </Badge>
          </div>
          <div className="text-[10px] text-muted-foreground pl-4">
            Uptime: {systemStatus.api.uptime}
          </div>

          {/* Storage */}
          <div className="flex justify-between items-center pt-1">
            <span className="flex items-center gap-1 text-xs">
              <HardDrive className="h-3 w-3" />
              Storage
            </span>
            <span className="text-[10px]">{systemStatus.storage.used}/{systemStatus.storage.total} GB</span>
          </div>
          <Progress value={(systemStatus.storage.used / systemStatus.storage.total) * 100} className="h-1" />

          {/* CPU */}
          <div className="flex justify-between items-center pt-1">
            <span className="flex items-center gap-1 text-xs">
              <Cpu className="h-3 w-3" />
              CPU Usage
            </span>
            <span className="text-[10px]">{systemStatus.cpu.usage}%</span>
          </div>
          <Progress value={systemStatus.cpu.usage} className="h-1" />
        </div>
      </div>

      {/* ==========================================
          RECENT EVENTS - Window Style
          ========================================== */}
      <div className="border border-border rounded bg-card mb-4">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <Bell className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">Recent Events</span>
        </div>
        <ScrollArea className="h-36">
          <div className="p-2 space-y-1">
            {recentEvents.map(event => (
              <div key={event.id} className="p-1.5 rounded bg-muted/30 cursor-pointer hover:bg-muted/50">
                <div className="flex items-start gap-2">
                  {getStatusIcon(event.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] truncate">{event.message}</p>
                    <p className="text-[9px] text-muted-foreground">{event.time} • {event.code}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* ==========================================
          PROCESSING QUEUE - Window Style
          ========================================== */}
      <div className="border border-border rounded bg-card">
        <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          <span className="text-xs font-bold uppercase">Processing Queue</span>
        </div>
        <div className="p-2 space-y-2">
          {batchQueue.map(batch => (
            <div key={batch.id} className="p-2 rounded bg-muted/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium truncate">{batch.id}</span>
                <Badge 
                  variant="outline" 
                  className={`h-4 text-[9px] ${
                    batch.status === 'processing' 
                      ? 'bg-blue-500/10 text-blue-600 border-blue-500/30' 
                      : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30'
                  }`}
                >
                  {batch.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-[10px] text-muted-foreground truncate mb-1">{batch.name}</div>
              {batch.status === 'processing' && (
                <Progress value={batch.progress} className="h-1" />
              )}
              <div className="text-[10px] text-muted-foreground mt-1">{batch.bottles.toLocaleString()} bottles</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}