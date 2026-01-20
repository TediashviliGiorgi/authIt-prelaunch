import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BrandDetail, Brand } from '@/types/brand';
import { brandService } from '@/services/brandService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BrandDetailSkeleton } from '@/components/ui/detail-page-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  Wine, 
  Image,
  Award,
  Eye,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function BrandDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [brand, setBrand] = useState<BrandDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBrand();
    }
  }, [id]);

  const fetchBrand = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await brandService.getBrandById(id!);
      setBrand(data);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load brand';
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

  // Loading state with skeleton
  if (loading) {
    return <BrandDetailSkeleton />;
  }

  // Error state
  if (error || !brand) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/brands')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Brands
          </Button>
          <Card>
            <EmptyState
              icon={AlertTriangle}
              title="Failed to load brand"
              description={error || "The brand you're looking for couldn't be loaded. It may have been deleted or you may not have permission to view it."}
              variant="error"
              action={{
                label: "Try Again",
                onClick: fetchBrand,
                icon: RefreshCw,
              }}
              secondaryAction={{
                label: "Back to Brands",
                onClick: () => navigate('/dashboard/brands'),
                variant: 'outline',
              }}
            />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard/brands')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              {brand.logoUrl ? (
                <img 
                  src={brand.logoUrl} 
                  alt={brand.name}
                  className="h-16 w-16 rounded-lg object-cover border"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Wine className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{brand.name}</h1>
                  <Badge variant={brand.status === 'active' ? 'default' : 'secondary'}>
                    {brand.status}
                  </Badge>
                </div>
                {brand.code && (
                  <p className="text-muted-foreground font-mono">
                    {brand.code}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/dashboard/brands/${brand.id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button onClick={() => navigate(`/dashboard/products/create?brandId=${brand.id}`)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Banner */}
        {brand.bannerUrl && (
          <div className="mb-6 rounded-lg overflow-hidden">
            <img 
              src={brand.bannerUrl} 
              alt={`${brand.name} banner`}
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {brand.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{brand.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Story */}
            {brand.story && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Brand Story
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {brand.story}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Products</CardTitle>
                  <CardDescription>
                    {brand.productCount} {brand.productCount === 1 ? 'product' : 'products'} in this brand
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/dashboard/products?brandId=${brand.id}`)}
                >
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {brand.products && brand.products.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brand.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {product.imageUrl ? (
                                <img 
                                  src={product.imageUrl} 
                                  alt={product.name}
                                  className="h-8 w-8 rounded object-cover"
                                />
                              ) : (
                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                  <Wine className="h-4 w-4 text-muted-foreground" />
                                </div>
                              )}
                              {product.name}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {product.sku}
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                              {product.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/dashboard/products/${product.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Wine className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No products yet</p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/dashboard/products/create?brandId=${brand.id}`)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add First Product
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Products</span>
                  <span className="font-medium">{brand.productCount}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={brand.status === 'active' ? 'default' : 'secondary'}>
                    {brand.status}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-sm">
                    {new Date(brand.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            {brand.awards && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-line text-sm">
                    {brand.awards}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}