import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, ExternalLink, MoreVertical, Package, BarChart3, Shield, Wine, QrCode } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BatchAnalytics } from '@/components/batches/BatchAnalytics';
import { BatchSecurity } from '@/components/batches/BatchSecurity';
import { BatchBottles } from '@/components/batches/BatchBottles';
import { useQuery } from '@tanstack/react-query';
import { batchService } from '@/services/batchService';
import { BatchProcessingProgress } from '@/components/batches/BatchProcessingProgress';

export default function BatchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ===== Fetch batch data from API =====
  const { data: batch, isLoading, error, refetch } = useQuery({
    queryKey: ['batch-detail', id],
    queryFn: () => batchService.getBatchById(id!),
    enabled: !!id,
  });

  // ===== Loading State =====
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading batch details...</p>
        </div>
      </div>
    );
  }

  // ===== Error State =====
  if (error || !batch) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-destructive">Failed to load batch details</p>
            <Button onClick={() => refetch()}>Retry</Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/batches')}>
              Back to Batches
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ===== Check if batch is being processed =====
  const isProcessing = batch.processingStatus === 'pending' || 
                       batch.processingStatus === 'processing';

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/batches')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Button>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{batch.productName}</h1>
                <Badge variant="outline" className="text-base font-mono">
                  {batch.batchNumber}
                </Badge>
                <Badge className={
                  batch.status === 'active' ? 'bg-green-600' :
                  batch.status === 'draft' ? 'bg-gray-600' :
                  'bg-gray-400'
                }>
                  {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Dashboard / Batches / {batch.productName}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" disabled>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" disabled={isProcessing}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Codes
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem disabled>
                    <QrCode className="mr-2 h-4 w-4" />
                    QR #1 - Marketing (Batch Level)
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <QrCode className="mr-2 h-4 w-4" />
                    QR #2 - Security (All Units)
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>All Files (ZIP)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="outline" 
                onClick={() => window.open(`/product/${batch.id}`, '_blank')}
                disabled={isProcessing}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview Page
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem disabled>Archive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" disabled>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">
              <Package className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" disabled={isProcessing}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="security" disabled={isProcessing}>
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="bottles" disabled={isProcessing}>
              <Wine className="mr-2 h-4 w-4" />
              Bottles
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* ===== Processing Status (if batch is being processed) ===== */}
            {isProcessing && (
              <BatchProcessingProgress 
                batchId={batch.id} 
                onComplete={() => refetch()} 
              />
            )}

            {/* ===== Normal Content (shown only when NOT processing) ===== */}
            {!isProcessing && (
              <>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        QR #1 Scans
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{batch.totalQr1Scans?.toLocaleString() || 0}</div>
                      <p className="text-sm text-muted-foreground mt-1">Marketing engagement</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        QR #2 Verifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{batch.totalQr2Verifications?.toLocaleString() || 0}</div>
                      <p className="text-sm text-muted-foreground mt-1">Security verifications</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Conversion Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{batch.conversionRate?.toFixed(1) || 0}%</div>
                      <p className="text-sm text-muted-foreground mt-1">QR2 / QR1 scans</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Product Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={batch.mainPhotoUrl}
                        alt={batch.productName}
                        className="w-full rounded-lg object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
                        }}
                      />
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Product Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Category</p>
                          <p className="font-medium">{batch.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Vintage Year</p>
                          <p className="font-medium">{batch.vintageYear || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Region</p>
                          <p className="font-medium">{batch.region || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Units</p>
                          <p className="font-medium">{batch.numberOfUnits.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Brand</p>
                          <p className="font-medium">{batch.brand || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <p className="font-medium">{batch.status}</p>
                        </div>
                      </div>

                      {batch.organicCertification && (
                        <Badge variant="outline">🌱 Organic Certified</Badge>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Description & Characteristics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{batch.description}</p>
                    
                    {batch.characteristics && (
                      <div>
                        <h4 className="font-semibold mb-2">Characteristics</h4>
                        <p className="text-muted-foreground">{batch.characteristics}</p>
                      </div>
                    )}

                    {batch.servingRecommendation && (
                      <div>
                        <h4 className="font-semibold mb-2">Serving Recommendation</h4>
                        <p className="text-muted-foreground">{batch.servingRecommendation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* QR Codes Download Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="h-5 w-5" />
                      QR Codes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">QR #1 - Marketing (Batch Level)</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          One QR code for the entire batch. Print on outer packaging/labels.
                        </p>
                        <Button variant="outline" className="w-full" disabled>
                          <Download className="mr-2 h-4 w-4" />
                          Download QR1
                        </Button>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">QR #2 - Security (Per Unit)</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          {batch.numberOfUnits.toLocaleString()} unique codes. Apply under cork/seal.
                        </p>
                        <Button variant="outline" className="w-full" disabled>
                          <Download className="mr-2 h-4 w-4" />
                          Download All (PDF)
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Gallery */}
                {batch.galleryPhotosUrls && batch.galleryPhotosUrls.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Photo Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4">
                        {batch.galleryPhotosUrls.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Awards */}
                {batch.awards && batch.awards.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Awards & Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {batch.awards.map((award, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <span className="text-2xl">
                              {award.medalType === 'gold' ? '🥇' : award.medalType === 'silver' ? '🥈' : '🥉'}
                            </span>
                            <div>
                              <p className="font-medium">{award.name}</p>
                              <p className="text-sm text-muted-foreground">{award.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <BatchAnalytics batchId={batch.id} />
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <BatchSecurity batchId={batch.id} />
          </TabsContent>

          {/* Bottles Tab */}
          <TabsContent value="bottles">
            <BatchBottles batchId={batch.id} totalBottles={batch.numberOfUnits} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}