import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { SecurityOverview } from '@/components/dashboard/SecurityOverview';
import { BatchStatistics } from '@/components/dashboard/BatchStatistics';
import {
  Plus,
  Layers,
  Wine,
  Package,
  Download,
  Upload,
  Filter,
  Grid3X3,
  List,
  Minus,
} from 'lucide-react';

/**
 * DashboardOverviewPage - Main dashboard page
 * 
 * NOTE: Currently shows placeholders (—) until real API data is connected.
 * QuickStats show structure but no actual numbers.
 */

// Stats structure without mock values
const quickStats = [
  { label: 'Total Batches', value: '—', change: '—', trend: 'neutral' },
  { label: 'Active Codes', value: '—', change: '—', trend: 'neutral' },
  { label: 'Verifications (24h)', value: '—', change: '—', trend: 'neutral' },
  { label: 'Fraud Attempts', value: '—', change: '—', trend: 'neutral' },
  { label: 'API Calls (24h)', value: '—', change: '—', trend: 'neutral' },
  { label: 'Active Sessions', value: '—', change: '—', trend: 'neutral' },
];

export default function DashboardOverviewPage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Quick Stats Bar */}
      <div className="grid grid-cols-6 gap-2 mb-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="p-2 border border-border rounded bg-card">
            <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
            <div className="text-lg font-bold font-mono text-muted-foreground">{stat.value}</div>
            <div className="flex items-center gap-1 text-[10px]">
              <Minus className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-2 p-2 border border-border rounded bg-card mb-4">
        <Button size="sm" className="h-7 text-xs" onClick={() => navigate('/dashboard/batches/create')}>
          <Plus className="h-3 w-3 mr-1" />
          New Batch
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => navigate('/dashboard/brands')}>
          <Layers className="h-3 w-3 mr-1" />
          Brands
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => navigate('/dashboard/products')}>
          <Wine className="h-3 w-3 mr-1" />
          Products
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => navigate('/dashboard/batches')}>
          <Package className="h-3 w-3 mr-1" />
          Batches
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
          <Download className="h-3 w-3 mr-1" />
          Export
        </Button>
        <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
          <Upload className="h-3 w-3 mr-1" />
          Import
        </Button>
        <div className="flex-1" />
        <Button variant="outline" size="sm" className="h-7 text-xs" disabled>
          <Filter className="h-3 w-3 mr-1" />
          Filters
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          <List className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          <Grid3X3 className="h-3 w-3" />
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <AnalyticsOverview />
        <SecurityOverview />
      </div>

      {/* Batch Statistics */}
      <BatchStatistics />
    </>
  );
}