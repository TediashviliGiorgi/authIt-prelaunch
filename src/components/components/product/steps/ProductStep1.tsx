import { UseFormReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BrandOption } from '@/types/brand';
import { brandService } from '@/services/brandService';
import { PRODUCT_CATEGORIES, VOLUME_OPTIONS } from '@/lib/productValidators';
import { Loader2, Wine } from 'lucide-react';

interface ProductStep1Props {
  form: UseFormReturn<any>;
  preselectedBrandId?: string;
}

export const ProductStep1 = ({ form, preselectedBrandId }: ProductStep1Props) => {
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loadingBrands, setLoadingBrands] = useState(true);

  useEffect(() => {
    fetchBrands();
  }, []);

  useEffect(() => {
    if (preselectedBrandId && brands.length > 0) {
      form.setValue('brandId', preselectedBrandId);
    }
  }, [preselectedBrandId, brands]);

  const fetchBrands = async () => {
    try {
      const options = await brandService.getBrandOptions();
      setBrands(options);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoadingBrands(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const vintageYears = Array.from({ length: 50 }, (_, i) => currentYear - i);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter the basic details for your product
        </p>
      </div>

      {/* Brand Selection */}
      <FormField
        control={form.control}
        name="brandId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brand *</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              value={field.value}
              disabled={loadingBrands || !!preselectedBrandId}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={loadingBrands ? "Loading brands..." : "Select a brand"} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {loadingBrands ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : brands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <Wine className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No brands found</p>
                    <p className="text-xs text-muted-foreground">Create a brand first</p>
                  </div>
                ) : (
                  brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      <div className="flex items-center gap-2">
                        {brand.logoUrl ? (
                          <img 
                            src={brand.logoUrl} 
                            alt={brand.name}
                            className="h-5 w-5 rounded object-cover"
                          />
                        ) : (
                          <Wine className="h-5 w-5 text-muted-foreground" />
                        )}
                        {brand.name}
                        {brand.code && (
                          <span className="text-muted-foreground text-xs">
                            ({brand.code})
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* SKU and Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., MUK-RES-2024-750" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Unique product identifier
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., Mukuzani Reserve" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Category */}
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category *</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Sub-category */}
      <FormField
        control={form.control}
        name="subCategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sub-category</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Dry, Semi-sweet, Reserve" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Vintage Year and Volume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="vintageYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Default Vintage Year</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(value === "none" ? null : parseInt(value))} 
                value={field.value?.toString() || 'none'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Non-Vintage</SelectItem>
                  {vintageYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Can be overridden per batch
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="volumeML"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(value ? parseInt(value) : null)} 
                value={field.value?.toString() || '750'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select volume" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {VOLUME_OPTIONS.map((vol) => (
                    <SelectItem key={vol.value} value={vol.value.toString()}>
                      {vol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};