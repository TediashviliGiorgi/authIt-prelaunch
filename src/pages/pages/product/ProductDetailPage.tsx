import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductDetail, Product } from '@/types/product';
import { productService } from '@/services/productService';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductDetailSkeleton } from '@/components/ui/detail-page-skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { toast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Edit, 
  Plus, 
  Wine, 
  Image,
  QrCode,
  Shield,
  Eye,
  Utensils,
  Thermometer,
  Grape,
  Globe,
  FileText,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(id!);
      setProduct(data);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to load product';
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

  // Format category for display
  const formatCategory = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Loading state with skeleton
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/products')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <Card>
            <EmptyState
              icon={AlertTriangle}
              title="Failed to load product"
              description={error || "The product you're looking for couldn't be loaded. It may have been deleted or you may not have permission to view it."}
              variant="error"
              action={{
                label: "Try Again",
                onClick: fetchProduct,
                icon: RefreshCw,
              }}
              secondaryAction={{
                label: "Back to Products",
                onClick: () => navigate('/dashboard/products'),
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
              onClick={() => navigate('/dashboard/products')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-4">
              {product.imageUrl || product.thumbnailUrl ? (
                <img 
                  src={product.thumbnailUrl || product.imageUrl} 
                  alt={product.name}
                  className="h-16 w-16 rounded-lg object-cover border"
                />
              ) : (
                <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                  <Wine className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{product.name}</h1>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-sm">{product.sku}</span>
                  <span>•</span>
                  <span>{product.brandName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button onClick={() => navigate(`/dashboard/batches/create?productId=${product.id}`)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Batch
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{formatCategory(product.category)}</p>
                      </div>
                      {product.subCategory && (
                        <div>
                          <p className="text-sm text-muted-foreground">Sub-category</p>
                          <p className="font-medium">{product.subCategory}</p>
                        </div>
                      )}
                      {product.vintageYear && (
                        <div>
                          <p className="text-sm text-muted-foreground">Vintage</p>
                          <p className="font-medium">{product.vintageYear}</p>
                        </div>
                      )}
                      {product.volumeML && (
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-medium">{product.volumeML} ml</p>
                        </div>
                      )}
                      {product.alcoholPercentage && (
                        <div>
                          <p className="text-sm text-muted-foreground">Alcohol</p>
                          <p className="font-medium">{product.alcoholPercentage}%</p>
                        </div>
                      )}
                      {product.retailPrice && (
                        <div>
                          <p className="text-sm text-muted-foreground">Retail Price</p>
                          <p className="font-medium">
                            {product.currency || '₾'}{product.retailPrice.toFixed(2)}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                {product.description && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Description
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground whitespace-pre-line">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* QR Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      QR Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Digital Passport</span>
                      <Badge variant={product.qrConfiguration?.digitalPassportEnabled ? 'default' : 'secondary'}>
                        {product.qrConfiguration?.digitalPassportEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">GS1 Standard</span>
                      <Badge variant={product.qrConfiguration?.gs1Enabled ? 'default' : 'secondary'}>
                        {product.qrConfiguration?.gs1Enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dual QR Security</span>
                      <Badge variant={product.qrConfiguration?.dualQREnabled ? 'default' : 'secondary'}>
                        {product.qrConfiguration?.dualQREnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Batches</span>
                      <span className="font-medium">{product.batchCount}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                        {product.status}
                      </Badge>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created</span>
                      <span className="text-sm">
                        {new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Characteristics Tab */}
          <TabsContent value="characteristics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Wine Details */}
              {(product.grapeVariety || product.appellation) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Grape className="h-5 w-5" />
                      Wine Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {product.grapeVariety && (
                      <div>
                        <p className="text-sm text-muted-foreground">Grape Variety</p>
                        <p className="font-medium">{product.grapeVariety}</p>
                      </div>
                    )}
                    {product.appellation && (
                      <div>
                        <p className="text-sm text-muted-foreground">Appellation</p>
                        <p className="font-medium">{product.appellation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Tasting Notes */}
              {product.tastingNotes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Wine className="h-5 w-5" />
                      Tasting Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {product.tastingNotes}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Food Pairing */}
              {product.foodPairing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Food Pairing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line">
                      {product.foodPairing}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Serving */}
              {product.servingTemperature && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Thermometer className="h-5 w-5" />
                      Serving
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Serve at {product.servingTemperature}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Batches Tab */}
          <TabsContent value="batches">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Batches</CardTitle>
                  <CardDescription>
                    {product.batchCount} {product.batchCount === 1 ? 'batch' : 'batches'} created
                  </CardDescription>
                </div>
                <Button 
                  size="sm"
                  onClick={() => navigate(`/dashboard/batches/create?productId=${product.id}`)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Batch
                </Button>
              </CardHeader>
              <CardContent>
                {product.batches && product.batches.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Batch #</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {product.batches.map((batch) => (
                        <TableRow key={batch.id}>
                          <TableCell className="font-mono">
                            {batch.batchNumber}
                          </TableCell>
                          <TableCell>{batch.numberOfUnits.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={batch.status === 'active' ? 'default' : 'secondary'}>
                              {batch.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(batch.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/dashboard/batches/${batch.id}`)}
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
                    <p className="text-muted-foreground mb-4">No batches yet</p>
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/dashboard/batches/create?productId=${product.id}`)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create First Batch
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}