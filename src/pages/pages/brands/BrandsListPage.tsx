import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Brand } from '@/types/brand';
import { brandService } from '@/services/brandService';
import { BrandCard } from '@/components/brands/BrandCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { CardGridSkeleton } from '@/components/ui/card-grid-skeleton';
import { toast } from '@/hooks/use-toast';
import { 
  Plus, 
  Search, 
  Layers, 
  Loader2, 
  RefreshCw,
  ArrowLeft,
  X,
  AlertTriangle,
} from 'lucide-react';

export default function BrandsListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch brands
  const fetchBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await brandService.getMyBrands();
      setBrands(response.brands);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load brands';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Filtered brands
  const filteredBrands = brands.filter((brand) => {
    const matchesSearch = 
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (brand.code?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    const matchesStatus = statusFilter === 'all' || brand.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Check if filters are active
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all';

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  // Handlers
  const handleEdit = (brand: Brand) => {
    navigate(`/dashboard/brands/${brand.id}/edit`);
  };

  const handleArchive = async (brand: Brand) => {
    try {
      await brandService.archiveBrand(brand.id);
      toast({
        title: 'Brand Archived',
        description: `${brand.name} has been archived.`,
      });
      fetchBrands();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to archive brand',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await brandService.deleteBrand(deleteTarget.id);
      toast({
        title: 'Brand Deleted',
        description: `${deleteTarget.name} has been deleted.`,
      });
      setDeleteTarget(null);
      fetchBrands();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete brand',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  // Render Error State
  const renderErrorState = () => (
    <Card>
      <EmptyState
        icon={AlertTriangle}
        title="Failed to load brands"
        description={error || "Something went wrong while loading your brands. Please try again."}
        variant="error"
        action={{
          label: "Try Again",
          onClick: fetchBrands,
          icon: RefreshCw,
        }}
        secondaryAction={{
          label: "Go to Dashboard",
          onClick: () => navigate('/dashboard'),
          variant: 'outline',
        }}
      />
    </Card>
  );

  // Render Empty State
  const renderEmptyState = () => {
    // Case 1: No brands at all (first time)
    if (brands.length === 0) {
      return (
        <Card>
          <EmptyState
            icon={Layers}
            title="No brands yet"
            description="Brands help you organize your products by label or winery. Create your first brand to start building your product catalog."
            variant="default"
            action={{
              label: "Create Your First Brand",
              onClick: () => navigate('/dashboard/brands/create'),
              icon: Plus,
            }}
            tip="Tip: Each brand can have multiple products. For example, a winery might have 'Reserve' and 'Classic' lines as separate brands."
          />
        </Card>
      );
    }

    // Case 2: Has brands but filters return no results
    return (
      <Card>
        <EmptyState
          icon={Search}
          title="No brands found"
          description={`We couldn't find any brands matching "${searchTerm || 'your filters'}". Try adjusting your search or filters.`}
          variant="search"
          action={{
            label: "Clear Filters",
            onClick: clearFilters,
            variant: 'outline',
            icon: X,
          }}
          secondaryAction={{
            label: "Create New Brand",
            onClick: () => navigate('/dashboard/brands/create'),
            variant: 'default',
            icon: Plus,
          }}
        />
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Brands</h1>
              <p className="text-muted-foreground">
                Manage your wine brands and labels
              </p>
            </div>
          </div>

          <Button onClick={() => navigate('/dashboard/brands/create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Brand
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={fetchBrands} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <CardGridSkeleton count={6} type="brand" />
        ) : error ? (
          renderErrorState()
        ) : filteredBrands.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBrands.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                onEdit={handleEdit}
                onArchive={handleArchive}
                onDelete={(b) => setDeleteTarget(b)}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Brand</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteTarget?.name}"? 
                This action cannot be undone.
                {deleteTarget && deleteTarget.productCount > 0 && (
                  <span className="block mt-2 text-destructive">
                    Warning: This brand has {deleteTarget.productCount} product(s). 
                    You must delete or move them first.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting || (deleteTarget?.productCount ?? 0) > 0}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}