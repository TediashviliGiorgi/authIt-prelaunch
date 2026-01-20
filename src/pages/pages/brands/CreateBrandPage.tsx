import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { brandService } from '@/services/brandService';
import { BrandForm } from '@/components/brands/BrandForm';
import { BrandFormData } from '@/lib/brandValidators';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Wine } from 'lucide-react';

export default function CreateBrandPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: BrandFormData) => {
    setIsLoading(true);
    try {
      const brand = await brandService.createBrand({
        name: data.name,
        code: data.code || undefined,
        description: data.description || undefined,
        logoUrl: data.logoUrl || undefined,
        bannerUrl: data.bannerUrl || undefined,
        story: data.story || undefined,
        awards: data.awards || undefined,
        displayOrder: data.displayOrder,
      });

      toast({
        title: 'Brand Created',
        description: `${brand.name} has been created successfully.`,
      });

      navigate(`/dashboard/brands/${brand.id}`);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create brand',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/brands');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard/brands')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Brand</h1>
            <p className="text-muted-foreground">
              Add a new brand to your portfolio
            </p>
          </div>
        </div>

        {/* Form */}
        <BrandForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}