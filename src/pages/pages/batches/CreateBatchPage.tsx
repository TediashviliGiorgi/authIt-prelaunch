/**
 * CreateBatchPage - Simplified Batch Creation
 * 
 * NEW FLOW (2 steps):
 * 1. Select Product (from catalog)
 * 2. Batch Details (units, dates, QR override)
 * 
 * Product-specific info (characteristics, media, story) is now on Product entity,
 * not entered per-batch.
 */

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { productService } from '@/services/productService';
import { batchService, CreateBatchRequest } from '@/services/batchService';
import { ProductOption, QRConfiguration } from '@/types/product';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ProgressIndicator } from '@/components/batches/ProgressIndicator';
import { CostCalculatorSidebar } from '@/components/batches/CostCalculatorSidebar';
import { BatchSuccessScreen } from '@/components/batches/BatchSuccessScreen';
import { 
  ArrowLeft, 
  Loader2, 
  CheckCircle, 
  Wine, 
  Search,
  CalendarIcon,
  Shield,
  QrCode,
  ChevronRight,
  Package,
  Info,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// ==========================================
// VALIDATION SCHEMAS
// ==========================================

const step1Schema = z.object({
  productId: z.string().min(1, 'Please select a product'),
});

const step2Schema = z.object({
  numberOfUnits: z
    .number({ invalid_type_error: 'Please enter a valid number' })
    .min(100, 'Minimum 100 units required')
    .max(1000000, 'Maximum 1,000,000 units'),
  productionDate: z.date({ required_error: 'Production date is required' }),
  bottlingDate: z.date({ required_error: 'Bottling date is required' }),
  vintageYearOverride: z.number().optional().nullable(),
  
  // QR Configuration Override
  overrideQRConfig: z.boolean().default(false),
  digitalPassportEnabled: z.boolean().optional(),
  gs1Enabled: z.boolean().optional(),
  dualQREnabled: z.boolean().optional(),
}).refine((data) => {
  if (data.bottlingDate && data.productionDate) {
    return data.bottlingDate >= data.productionDate;
  }
  return true;
}, {
  message: 'Bottling date must be after production date',
  path: ['bottlingDate'],
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const TOTAL_STEPS = 2;
const stepTitles = ['Select Product', 'Batch Details'];

// ==========================================
// COMPONENT
// ==========================================

export default function CreateBatchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  // Get preselected product from URL
  const preselectedProductId = searchParams.get('productId') || undefined;

  // State
  const [currentStep, setCurrentStep] = useState(preselectedProductId ? 2 : 1);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [productQRConfig, setProductQRConfig] = useState<QRConfiguration | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBatchId, setCreatedBatchId] = useState('');

  // Forms
  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      productId: preselectedProductId || '',
    },
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      numberOfUnits: 1000,
      productionDate: undefined,
      bottlingDate: undefined,
      vintageYearOverride: null,
      overrideQRConfig: false,
      digitalPassportEnabled: false,
      gs1Enabled: false,
      dualQREnabled: false,
    },
  });

  const overrideQRConfig = step2Form.watch('overrideQRConfig');
  const numberOfUnits = step2Form.watch('numberOfUnits') || 0;

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto-select product if preselected
  useEffect(() => {
    if (preselectedProductId && products.length > 0) {
      const product = products.find(p => p.id === preselectedProductId);
      if (product) {
        handleProductSelect(product);
      }
    }
  }, [preselectedProductId, products]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const options = await productService.getProductOptions();
      setProducts(options);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductSelect = async (product: ProductOption) => {
    setSelectedProduct(product);
    step1Form.setValue('productId', product.id);

    // Fetch full product to get QR config
    try {
      const fullProduct = await productService.getProductById(product.id);
      setProductQRConfig(fullProduct.qrConfiguration);
      
      // Set default QR values from product
      step2Form.setValue('digitalPassportEnabled', fullProduct.qrConfiguration?.digitalPassportEnabled || false);
      step2Form.setValue('gs1Enabled', fullProduct.qrConfiguration?.gs1Enabled || false);
      step2Form.setValue('dualQREnabled', fullProduct.qrConfiguration?.dualQREnabled || false);
      
      // Set vintage year if product has default
      if (fullProduct.vintageYear) {
        step2Form.setValue('vintageYearOverride', fullProduct.vintageYear);
      }
    } catch (error) {
      console.error('Failed to fetch product details:', error);
    }
  };

  const handleStep1Next = async () => {
    const isValid = await step1Form.trigger();
    if (isValid && selectedProduct) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(1);
    }
  };

const handleSubmit = step2Form.handleSubmit(async (data) => {
    if (!selectedProduct) return;

    setIsSubmitting(true);
    try {
      // Determine QR config - use override or inherit from product
      const useOverride = data.overrideQRConfig;
      
      // Build request - simplified, product-based
      const request: CreateBatchRequest = {
        // Required: Product reference
        productId: selectedProduct.id,
        
        // Required: Batch-specific
        numberOfUnits: data.numberOfUnits,
        productionDate: data.productionDate.toISOString(),
        bottlingDate: data.bottlingDate.toISOString(),
        
        // Optional: Overrides
        vintageYearOverride: data.vintageYearOverride || undefined,
        
        // QR Configuration
        digitalPassportEnabled: useOverride 
          ? (data.digitalPassportEnabled || false)
          : (productQRConfig?.digitalPassportEnabled || false),
        gs1Enabled: useOverride 
          ? (data.gs1Enabled || false)
          : (productQRConfig?.gs1Enabled || false),
        dualQREnabled: useOverride 
          ? (data.dualQREnabled || false)
          : (productQRConfig?.dualQREnabled ?? true),
      };

      const batch = await batchService.createBatch(request);

      toast({
        title: 'Batch Created!',
        description: `Batch ${batch.batchNumber} is now being processed.`,
      });

      setCreatedBatchId(batch.id);
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Batch creation error:', error);
      toast({
        title: 'Error',
        description: error.response?.data?.message || error.message || 'Failed to create batch',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  // Filtered products
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate cost
  const calculateCost = () => {
    let costPerUnit = 0.03; // Base
    const config = overrideQRConfig 
      ? {
          digitalPassportEnabled: step2Form.watch('digitalPassportEnabled'),
          gs1Enabled: step2Form.watch('gs1Enabled'),
          dualQREnabled: step2Form.watch('dualQREnabled'),
        }
      : productQRConfig;
    
    if (config?.digitalPassportEnabled) costPerUnit += 0.02;
    if (config?.gs1Enabled) costPerUnit += 0.01;
    if (config?.dualQREnabled) costPerUnit += 0.05;
    
    return {
      perUnit: costPerUnit.toFixed(2),
      total: (costPerUnit * numberOfUnits).toFixed(2),
    };
  };

  const cost = calculateCost();

  // Success screen
  if (showSuccess) {
    return (
      <BatchSuccessScreen
        batchId={createdBatchId}
        productName={selectedProduct?.name || ''}
        numberOfUnits={numberOfUnits}
        onNavigateToDashboard={() => navigate('/dashboard')}
        onNavigateToBatches={() => navigate('/dashboard/batches')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard/batches')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Create Batch</h1>
                <p className="text-muted-foreground">
                  Step {currentStep} of {TOTAL_STEPS}: {stepTitles[currentStep - 1]}
                </p>
              </div>
            </div>

            {/* Progress */}
            <Card>
              <CardContent className="pt-6">
                <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
              </CardContent>
            </Card>

            {/* Step 1: Product Selection */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wine className="h-5 w-5" />
                    Select Product
                  </CardTitle>
                  <CardDescription>
                    Choose a product from your catalog to create a batch
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, SKU, or brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Products Grid */}
                  {loadingProducts ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Wine className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground mb-3">
                        {products.length === 0 
                          ? 'No products in your catalog' 
                          : 'No products match your search'}
                      </p>
                      {products.length === 0 && (
                        <Button 
                          variant="outline"
                          onClick={() => navigate('/dashboard/products/create')}
                        >
                          Create Product First
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                      {filteredProducts.map((product) => {
                        const isSelected = selectedProduct?.id === product.id;
                        return (
                          <div
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                              isSelected 
                                ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                : "hover:border-muted-foreground/50 hover:bg-muted/50"
                            )}
                          >
                            {product.thumbnailUrl ? (
                              <img 
                                src={product.thumbnailUrl} 
                                alt={product.name}
                                className="h-12 w-12 rounded object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded bg-muted flex items-center justify-center">
                                <Wine className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{product.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {product.brandName} • {product.sku}
                              </p>
                              {product.vintageYear && (
                                <Badge variant="secondary" className="mt-1 text-xs">
                                  {product.vintageYear}
                                </Badge>
                              )}
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/dashboard/products/create')}
                    >
                      Create New Product
                    </Button>
                    <Button 
                      onClick={handleStep1Next}
                      disabled={!selectedProduct}
                    >
                      Next: Batch Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Batch Details */}
            {currentStep === 2 && (
              <Form {...step2Form}>
                <form onSubmit={handleSubmit}>
                  {/* Selected Product Info */}
                  <Card className="mb-6">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        {selectedProduct?.thumbnailUrl ? (
                          <img 
                            src={selectedProduct.thumbnailUrl} 
                            alt={selectedProduct.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                            <Wine className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-semibold text-lg">{selectedProduct?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {selectedProduct?.brandName} • {selectedProduct?.sku}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={handleBack}
                        >
                          Change Product
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Batch Details */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Batch Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Number of Units */}
                      <FormField
                        control={step2Form.control}
                        name="numberOfUnits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Units *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={100}
                                max={1000000}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormDescription>
                              How many bottles/units in this batch (min 100)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Dates */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={step2Form.control}
                          name="productionDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Production Date *</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={step2Form.control}
                          name="bottlingDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Bottling Date *</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Vintage Override */}
                      <FormField
                        control={step2Form.control}
                        name="vintageYearOverride"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Vintage Year</FormLabel>
                            <Select
                              onValueChange={(v) => field.onChange(v === "default" ? null : parseInt(v))}
                              value={field.value?.toString() || 'default'}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Use product default" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="default">Use product default</SelectItem>
                                {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Override the product's default vintage if different for this batch
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* QR Configuration */}
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        QR Configuration
                      </CardTitle>
                      <CardDescription>
                        Inherited from product. Override if needed for this batch.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Inherited Config Display */}
                      {productQRConfig && !overrideQRConfig && (
                        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                          <p className="text-sm font-medium flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Inherited from Product:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="default">Marketing Page</Badge>
                            {productQRConfig.digitalPassportEnabled && (
                              <Badge variant="secondary">Digital Passport</Badge>
                            )}
                            {productQRConfig.gs1Enabled && (
                              <Badge variant="secondary">GS1</Badge>
                            )}
                            {productQRConfig.dualQREnabled && (
                              <Badge variant="default" className="gap-1">
                                <Shield className="h-3 w-3" />
                                Dual QR
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Override Toggle */}
                      <FormField
                        control={step2Form.control}
                        name="overrideQRConfig"
                        render={({ field }) => (
                          <FormItem className="flex items-start space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1">
                              <FormLabel className="cursor-pointer">
                                Customize QR configuration for this batch
                              </FormLabel>
                              <FormDescription>
                                Override the product's default QR settings
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />

                      {/* Override Options */}
                      {overrideQRConfig && (
                        <div className="space-y-3 pl-6 border-l-2 border-primary/30">
                          <FormField
                            control={step2Form.control}
                            name="digitalPassportEnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="flex items-center gap-2">
                                  <FormLabel className="cursor-pointer font-normal">
                                    Digital Product Passport
                                  </FormLabel>
                                  <Badge variant="outline">+€0.02/unit</Badge>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={step2Form.control}
                            name="gs1Enabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="flex items-center gap-2">
                                  <FormLabel className="cursor-pointer font-normal">
                                    GS1 Digital Link
                                  </FormLabel>
                                  <Badge variant="outline">+€0.01/unit</Badge>
                                </div>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={step2Form.control}
                            name="dualQREnabled"
                            render={({ field }) => (
                              <FormItem className="flex items-center space-x-3">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="flex items-center gap-2">
                                  <FormLabel className="cursor-pointer font-normal">
                                    Dual QR Authentication
                                  </FormLabel>
                                  <Badge variant="default">+€0.05/unit</Badge>
                                  <Badge variant="secondary">Recommended</Badge>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Create Batch
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>

          {/* Sidebar - Cost Calculator */}
          <div className="hidden lg:block">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-base">Cost Estimate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Units</span>
                    <span>{numberOfUnits.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cost per unit</span>
                    <span>€{cost.perUnit}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>€{cost.total}</span>
                  </div>
                </div>

                {selectedProduct && (
                  <>
                    <Separator />
                    <div className="text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Selected Product:</p>
                      <p>{selectedProduct.name}</p>
                      <p>{selectedProduct.brandName}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}