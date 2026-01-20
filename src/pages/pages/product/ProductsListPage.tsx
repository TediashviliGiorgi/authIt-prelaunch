import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Product } from '@/types/product';
import { BrandOption } from '@/types/brand';
import { productService } from '@/services/productService';
import { brandService } from '@/services/brandService';
import { ProductCard } from '@/components/product/ProductCard';
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { EmptyState } from '@/components/ui/empty-state';
import { CardGridSkeleton } from '@/components/ui/card-grid-skeleton';
import { toast } from '@/hooks/use-toast';
import { PRODUCT_CATEGORIES } from '@/lib/productValidators';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { 
  Plus, 
  Search, 
  Wine, 
  Loader2, 
  RefreshCw,
  ArrowLeft,
  X,
  Layers,
  AlertTriangle,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';

export default function ProductsListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  // Get brand filter from URL
  const urlBrandId = searchParams.get('brandId');

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [brandFilter, setBrandFilter] = useState<string>(urlBrandId || 'all');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch brands for filter
  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, [brandFilter]);

  // Update brand filter when URL changes
  useEffect(() => {
    if (urlBrandId) {
      setBrandFilter(urlBrandId);
    }
  }, [urlBrandId]);

  const fetchBrands = async () => {
    try {
      const options = await brandService.getBrandOptions();
      setBrands(options);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (brandFilter && brandFilter !== 'all') {
        response = await productService.getProductsByBrand(brandFilter);
      } else {
        response = await productService.getMyProducts();
      }
      setProducts(response.products);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load products';
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

  // Filtered products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get selected brand name for header
  const selectedBrand = brands.find(b => b.id === brandFilter);

  // Check if filters are active
  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all' || categoryFilter !== 'all' || brandFilter !== 'all';
  const activeFilterCount = [
    statusFilter !== 'all',
    categoryFilter !== 'all',
    brandFilter !== 'all',
  ].filter(Boolean).length;

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setBrandFilter('all');
    navigate('/dashboard/products');
  };

  // Handlers
  const handleEdit = (product: Product) => {
    navigate(`/dashboard/products/${product.id}/edit`);
  };

  const handleArchive = async (product: Product) => {
    try {
      await productService.archiveProduct(product.id);
      toast({
        title: 'Product Archived',
        description: `${product.name} has been archived.`,
      });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to archive product',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      await productService.deleteProduct(deleteTarget.id);
      toast({
        title: 'Product Deleted',
        description: `${deleteTarget.name} has been deleted.`,
      });
      setDeleteTarget(null);
      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete product',
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
        title="Failed to load products"
        description={error || "Something went wrong while loading your products. Please try again."}
        variant="error"
        action={{
          label: "Try Again",
          onClick: fetchProducts,
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
    if (products.length === 0 && brands.length === 0) {
      return (
        <Card>
          <EmptyState
            icon={Layers}
            title="Create a brand first"
            description="You need to create at least one brand before you can add products."
            variant="dependency"
            action={{
              label: "Create Brand First",
              onClick: () => navigate('/dashboard/brands/create'),
              icon: Plus,
            }}
          />
        </Card>
      );
    }

    if (products.length === 0) {
      return (
        <Card>
          <EmptyState
            icon={Wine}
            title="No products yet"
            description="Products represent the items you sell and authenticate."
            variant="default"
            action={{
              label: "Create Your First Product",
              onClick: () => navigate(
                brandFilter !== 'all' 
                  ? `/dashboard/products/create?brandId=${brandFilter}`
                  : '/dashboard/products/create'
              ),
              icon: Plus,
            }}
          />
        </Card>
      );
    }

    return (
      <Card>
        <EmptyState
          icon={Search}
          title="No products found"
          description="Try adjusting your search or filters."
          variant="search"
          action={{
            label: "Clear Filters",
            onClick: clearFilters,
            variant: 'outline',
            icon: X,
          }}
        />
      </Card>
    );
  };

  // Mobile Filter Sheet Content
  const FilterContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Brand</label>
        <Select value={brandFilter} onValueChange={setBrandFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {brands.map((brand) => (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {PRODUCT_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      )}
    </div>
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
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {selectedBrand ? `${selectedBrand.name} Products` : 'Products'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedBrand 
                  ? `Manage products for ${selectedBrand.name}`
                  : 'Manage your product catalog'
                }
              </p>
            </div>
          </div>
          
          <Button 
            className="w-full sm:w-auto sm:self-end"
            onClick={() => navigate(
              brandFilter !== 'all' 
                ? `/dashboard/products/create?brandId=${brandFilter}`
                : '/dashboard/products/create'
            )}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Product
          </Button>
        </div>

        {/* Search & Filters - Mobile Responsive */}
        <Card className="mb-6">
          <CardContent className="pt-4 pb-4">
            <div className="flex flex-col gap-3">
              {/* Search Row */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                {/* Mobile: Filter Sheet */}
                {isMobile ? (
                  <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="icon" className="relative shrink-0">
                        <SlidersHorizontal className="h-4 w-4" />
                        {activeFilterCount > 0 && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                            {activeFilterCount}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-auto max-h-[70vh]">
                      <SheetHeader className="pb-4">
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <FilterContent />
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={fetchProducts} 
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  </Button>
                )}
              </div>

              {/* Desktop: Inline Filters */}
              {!isMobile && (
                <div className="flex flex-wrap gap-2">
                  <Select value={brandFilter} onValueChange={setBrandFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              )}

              {/* Mobile: Active Filters Pills */}
              {isMobile && hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {brandFilter !== 'all' && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setBrandFilter('all')}
                    >
                      {brands.find(b => b.id === brandFilter)?.name}
                      <X className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                  {categoryFilter !== 'all' && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setCategoryFilter('all')}
                    >
                      {PRODUCT_CATEGORIES.find(c => c.value === categoryFilter)?.label}
                      <X className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                  {statusFilter !== 'all' && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setStatusFilter('all')}
                    >
                      {statusFilter}
                      <X className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        {loading ? (
          <CardGridSkeleton count={isMobile ? 4 : 6} type="product" />
        ) : error ? (
          renderErrorState()
        ) : filteredProducts.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onArchive={handleArchive}
                onDelete={(p) => setDeleteTarget(p)}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
          <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deleteTarget?.name}"? 
                This action cannot be undone.
                {deleteTarget && deleteTarget.batchCount > 0 && (
                  <span className="block mt-2 text-destructive">
                    Warning: This product has {deleteTarget.batchCount} batch(es). 
                    You must delete them first.
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
              <AlertDialogCancel disabled={deleting} className="w-full sm:w-auto">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={deleting || (deleteTarget?.batchCount ?? 0) > 0}
                className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
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