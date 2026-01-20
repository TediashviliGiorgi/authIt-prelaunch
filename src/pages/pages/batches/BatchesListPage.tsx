import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/ui/empty-state';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { 
  Package, 
  Plus, 
  Search, 
  ArrowLeft,
  Eye, 
  AlertTriangle, 
  GitCompare,
  X,
  Wine,
  ChevronRight,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { batchService } from '@/services/batchService';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/useMediaQuery';


export default function BatchesListPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  // ===== React Query - Real API Call =====
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['batches'],
    queryFn: async () => {
      try {
        const result = await batchService.getMyBatches();
        return result.batches;
      } catch (err: any) {
        toast({
          title: 'Error Loading Batches',
          description: err.response?.data?.message || 'Failed to load batches',
          variant: 'destructive',
        });
        throw err;
      }
    },
  });

  const batches = data || [];

  // Client-side search filter
  const filteredBatches = batches.filter((batch) => {
    const matchesSearch =
      batch.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  // Check if search is active
  const hasActiveSearch = searchQuery !== '';

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Helper: Toggle batch selection
  const toggleBatchSelection = (batchId: string) => {
    setSelectedBatches(prev => 
      prev.includes(batchId)
        ? prev.filter(id => id !== batchId)
        : [...prev, batchId]
    );
  };

  // Helper: Handle compare
  const handleCompare = () => {
    if (selectedBatches.length >= 2) {
      navigate(`/dashboard/batches/compare?batches=${selectedBatches.join(',')}`);
    }
  };

  // Helper: Get status badge
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-600">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper: Get conversion color
  const getConversionColor = (rate: number) => {
    if (rate >= 30) return 'text-green-600';
    if (rate >= 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Render Empty State
  const renderEmptyState = () => {
    if (batches.length === 0) {
      return (
        <Card>
          <EmptyState
            icon={Package}
            title="No batches yet"
            description="Batches represent production runs of your products. Each batch generates unique QR codes for authentication and tracking."
            variant="default"
            action={{
              label: "Create Your First Batch",
              onClick: () => navigate('/dashboard/batches/create'),
              icon: Plus,
            }}
            tip="Tip: You'll need at least one product before creating a batch. Each batch is linked to a specific product."
          />
        </Card>
      );
    }

    return (
      <Card>
        <EmptyState
          icon={Search}
          title="No batches found"
          description={`We couldn't find any batches matching "${searchQuery}". Try adjusting your search terms.`}
          variant="search"
          action={{
            label: "Clear Search",
            onClick: clearSearch,
            variant: 'outline',
            icon: X,
          }}
          secondaryAction={{
            label: "Create New Batch",
            onClick: () => navigate('/dashboard/batches/create'),
            variant: 'default',
            icon: Plus,
          }}
        />
      </Card>
    );
  };

  // Render Error State
  const renderErrorState = () => (
    <Card>
      <EmptyState
        icon={AlertTriangle}
        title="Failed to load batches"
        description="Something went wrong while loading your batches. Please try again."
        variant="error"
        action={{
          label: "Try Again",
          onClick: () => refetch(),
          variant: 'default',
        }}
      />
    </Card>
  );

  // ===== MOBILE CARD VIEW =====
  const renderMobileCard = (batch: any) => (
    <Card 
      key={batch.id} 
      className="cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => navigate(`/dashboard/batches/${batch.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={selectedBatches.includes(batch.id)}
            onCheckedChange={(e) => {
              e.stopPropagation?.();
              toggleBatchSelection(batch.id);
            }}
            onClick={(e) => e.stopPropagation()}
            className="mt-1"
          />
          
          {/* Product Image */}
          <img
            src={batch.mainPhotoUrl}
            alt={batch.productName}
            className="w-12 h-12 rounded-lg object-cover shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
            }}
          />
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-medium truncate">{batch.productName}</h3>
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                  {batch.batchNumber}
                </code>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </div>
            
            {/* Stats Row */}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{batch.numberOfUnits.toLocaleString()} units</span>
              <span>•</span>
              <span>{batch.totalQr1Scans} scans</span>
              <span>•</span>
              <span className={getConversionColor(batch.conversionRate)}>
                {batch.conversionRate.toFixed(1)}%
              </span>
            </div>
            
            {/* Bottom Row */}
            <div className="flex items-center justify-between mt-2">
              {getStatusBadge(batch.status)}
              {batch.suspiciousUnitsCount > 0 && (
                <Badge variant="destructive" className="gap-1 text-xs">
                  <AlertTriangle className="h-3 w-3" />
                  {batch.suspiciousUnitsCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // ===== DESKTOP TABLE VIEW =====
  const renderDesktopTable = () => (
    <Card>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedBatches.length === filteredBatches.length && filteredBatches.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBatches(filteredBatches.map(b => b.id));
                    } else {
                      setSelectedBatches([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Batch Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Units</TableHead>
              <TableHead className="text-right">QR1 Scans</TableHead>
              <TableHead className="text-right">QR2 Verified</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-center">Alerts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => (
              <TableRow key={batch.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox
                    checked={selectedBatches.includes(batch.id)}
                    onCheckedChange={() => toggleBatchSelection(batch.id)}
                  />
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={batch.mainPhotoUrl}
                      alt={batch.productName}
                      className="w-10 h-10 rounded object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100';
                      }}
                    />
                    <div>
                      <div className="font-medium">{batch.productName}</div>
                      <div className="text-sm text-muted-foreground">
                        {batch.brand || batch.category}
                      </div>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                    {batch.batchNumber}
                  </code>
                </TableCell>
                
                <TableCell>
                  {getStatusBadge(batch.status)}
                </TableCell>
                
                <TableCell className="text-right font-medium">
                  {batch.numberOfUnits.toLocaleString()}
                </TableCell>
                
                <TableCell className="text-right">
                  {batch.totalQr1Scans.toLocaleString()}
                </TableCell>
                
                <TableCell className="text-right">
                  {batch.totalQr2Verifications.toLocaleString()}
                </TableCell>
                
                <TableCell className={`text-right font-semibold ${getConversionColor(batch.conversionRate)}`}>
                  {batch.conversionRate.toFixed(1)}%
                </TableCell>
                
                <TableCell className="text-center">
                  {batch.suspiciousUnitsCount > 0 ? (
                    <Badge variant="destructive" className="gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      {batch.suspiciousUnitsCount}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </TableCell>
                
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/dashboard/batches/${batch.id}`)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header - Mobile Responsive */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 -ml-2"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold">Batches</h1>
              <p className="text-sm text-muted-foreground">
                Manage your production batches and QR codes
              </p>
            </div>
          </div>
          <Button 
            className="w-full sm:w-auto sm:self-end"
            onClick={() => navigate('/dashboard/batches/create')}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Batch
          </Button>
        </div>

        {/* Search & Actions - Mobile Responsive */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batches..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              {hasActiveSearch && (
                <Button variant="ghost" size="sm" onClick={clearSearch}>
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
              {selectedBatches.length >= 2 && (
                <Button variant="outline" size="sm" onClick={handleCompare}>
                  <GitCompare className="mr-2 h-4 w-4" />
                  Compare ({selectedBatches.length})
                </Button>
              )}
              {selectedBatches.length > 0 && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {selectedBatches.length} selected
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Content */}
        {isLoading ? (
          isMobile ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 animate-pulse">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <DataTableSkeleton columns={10} rows={5} />
          )
        ) : error ? (
          renderErrorState()
        ) : filteredBatches.length === 0 ? (
          renderEmptyState()
        ) : isMobile ? (
          // Mobile: Card View
          <div className="space-y-3">
            {filteredBatches.map(renderMobileCard)}
          </div>
        ) : (
          // Desktop: Table View
          renderDesktopTable()
        )}
      </div>
    </div>
  );
}