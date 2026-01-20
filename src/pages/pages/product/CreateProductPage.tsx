import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { productService } from '@/services/productService';
import { CreateProductRequest, QRConfiguration } from '@/types/product';
import {
  productStepSchemas,
  productStepTitles,
  defaultProductFormValues,
  CompleteProduct,
} from '@/lib/productValidators';
import { ProductStep1 } from '@/components/product/steps/ProductStep1';
import { ProductStep2 } from '@/components/product/steps/ProductStep2';
import { ProductStep3 } from '@/components/product/steps/ProductStep3';
import { ProductStep4 } from '@/components/product/steps/ProductStep4';
import { ProgressIndicator } from '@/components/batches/ProgressIndicator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { isWineCategory, ProductCategory } from '@/types/product';

const TOTAL_STEPS = 4;

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  // Get preselected brand from URL
  const preselectedBrandId = searchParams.get('brandId') || undefined;

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<CompleteProduct>>(defaultProductFormValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form
  const form = useForm({
    resolver: zodResolver(productStepSchemas[currentStep - 1]),
    mode: 'onBlur',
    defaultValues: formData,
  });

  // Watch category for conditional step 3
  const category = form.watch('category') as ProductCategory;
  const isWine = category ? isWineCategory(category) : true;

  // Handle next step
  const handleNext = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      const stepData = form.getValues();
      const updatedFormData = { ...formData, ...stepData };
      setFormData(updatedFormData);

      // Save to localStorage as draft
      localStorage.setItem('productDraft', JSON.stringify(updatedFormData));

      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        form.reset(updatedFormData);
      }
    }
  };

  // Handle back
  const handleBack = () => {
    if (currentStep > 1) {
      const stepData = form.getValues();
      const updatedFormData = { ...formData, ...stepData };
      setFormData(updatedFormData);
      setCurrentStep(currentStep - 1);
      form.reset(updatedFormData);
    }
  };

  // Handle save draft
  const handleSaveDraft = () => {
    const stepData = form.getValues();
    const updatedFormData = { ...formData, ...stepData };
    localStorage.setItem('productDraft', JSON.stringify(updatedFormData));
    toast({
      title: 'Draft Saved',
      description: 'Your product has been saved as a draft.',
    });
  };

  // Handle submit
  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      const finalData = { ...formData, ...data };

      // Build QR Configuration
      const qrConfiguration: QRConfiguration = {
        marketingPageEnabled: true, // Always true
        digitalPassportEnabled: finalData.digitalPassportEnabled || false,
        gs1Enabled: finalData.gs1Enabled || false,
        dualQREnabled: finalData.dualQREnabled || false,
      };

      // Build request
      const request: CreateProductRequest = {
        brandId: finalData.brandId!,
        sku: finalData.sku!,
        name: finalData.name!,
        category: finalData.category as ProductCategory,
        subCategory: finalData.subCategory || undefined,
        vintageYear: finalData.vintageYear || undefined,
        volumeML: finalData.volumeML || undefined,
        grapeVariety: finalData.grapeVariety || undefined,
        alcoholPercentage: finalData.alcoholPercentage || undefined,
        appellation: finalData.appellation || undefined,
        description: finalData.description || undefined,
        fullDescription: finalData.fullDescription || undefined,
        tastingNotes: finalData.tastingNotes || undefined,
        foodPairing: finalData.foodPairing || undefined,
        servingTemperature: finalData.servingTemperature || undefined,
        retailPrice: finalData.retailPrice || undefined,
        currency: finalData.currency || 'GEL',
        imageUrl: finalData.imageUrl || undefined,
        thumbnailUrl: finalData.thumbnailUrl || undefined,
        galleryUrls: finalData.galleryUrls || undefined,
        displayOrder: finalData.displayOrder || 0,
        isPublic: finalData.isPublic ?? true,
        qrConfiguration,
      };

      const product = await productService.createProduct(request);

      // Clear draft
      localStorage.removeItem('productDraft');

      toast({
        title: 'Product Created',
        description: `${product.name} has been created successfully.`,
      });

      navigate(`/dashboard/products/${product.id}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('productDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
        form.reset(parsed);
      } catch (e) {
        console.error('Failed to parse draft:', e);
      }
    }
  }, []);

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProductStep1 form={form} preselectedBrandId={preselectedBrandId} />;
      case 2:
        return <ProductStep2 form={form} />;
      case 3:
        return <ProductStep3 form={form} />;
      case 4:
        return <ProductStep4 form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard/products')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Product</h1>
            <p className="text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}: {productStepTitles[currentStep - 1]}
            </p>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
          </CardContent>
        </Card>

        {/* Form */}
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={handleSubmit}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t">
                  <div className="flex gap-2 w-full sm:w-auto">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleSaveDraft}
                      disabled={isSubmitting}
                    >
                      Save Draft
                    </Button>
                  </div>

                  <div className="w-full sm:w-auto">
                    {currentStep < TOTAL_STEPS ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="w-full sm:w-auto"
                      >
                        Next: {productStepTitles[currentStep]}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Create Product
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Step hints */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {currentStep === 3 && !isWine && (
            <p>💡 Pairing options are mainly for wine products. Feel free to skip or add general serving suggestions.</p>
          )}
          {currentStep === 4 && (
            <p>💡 QR configuration will be the default for all batches of this product. You can override per batch if needed.</p>
          )}
        </div>
      </div>
    </div>
  );
}