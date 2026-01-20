import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SERVING_TEMPERATURES, CURRENCY_OPTIONS } from '@/lib/productValidators';
import { isWineCategory, ProductCategory } from '@/types/product';
import { Utensils, Thermometer, DollarSign, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProductStep3Props {
  form: UseFormReturn<any>;
}

export const ProductStep3 = ({ form }: ProductStep3Props) => {
  const category = form.watch('category') as ProductCategory;
  const isWine = category ? isWineCategory(category) : true;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Pairing & Pricing</h3>
        <p className="text-sm text-muted-foreground">
          {isWine 
            ? 'Define food pairings, serving recommendations, and pricing'
            : 'Set pricing for this product'
          }
        </p>
      </div>

      {/* Wine-specific section */}
      {isWine ? (
        <>
          {/* Food Pairing Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                Food Pairing
              </CardTitle>
              <CardDescription>
                Suggest dishes that complement this wine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="foodPairing"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g., Grilled lamb, aged cheese, dark chocolate, traditional Georgian cuisine like mtsvadi..."
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      List recommended food pairings separated by commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Serving Temperature Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Serving Recommendations
              </CardTitle>
              <CardDescription>
                Optimal serving temperature for this wine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="servingTemperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serving Temperature</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value || ''}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select temperature range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVING_TEMPERATURES.map((temp) => (
                          <SelectItem key={temp} value={temp}>
                            {temp}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </>
      ) : (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Food pairing and serving temperature are typically used for wine products. 
            You can skip these for non-wine products.
          </AlertDescription>
        </Alert>
      )}

      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Pricing
          </CardTitle>
          <CardDescription>
            Set the retail price for this product
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="retailPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retail Price</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0}
                      step={0.01}
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                    />
                  </FormControl>
                  <FormDescription>
                    Suggested retail price
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || 'GEL'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CURRENCY_OPTIONS.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          {curr.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};