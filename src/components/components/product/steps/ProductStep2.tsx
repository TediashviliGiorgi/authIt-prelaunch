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
import { GRAPE_VARIETIES } from '@/lib/productValidators';
import { Slider } from '@/components/ui/slider';

interface ProductStep2Props {
  form: UseFormReturn<any>;
}

export const ProductStep2 = ({ form }: ProductStep2Props) => {
  const alcoholPercentage = form.watch('alcoholPercentage') || 0;
  const description = form.watch('description') || '';

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Characteristics</h3>
        <p className="text-sm text-muted-foreground">
          Define the product's characteristics and tasting profile
        </p>
      </div>

      {/* Grape Variety */}
      <FormField
        control={form.control}
        name="grapeVariety"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Grape Variety</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ''}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select grape variety" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {GRAPE_VARIETIES.map((grape) => (
                  <SelectItem key={grape} value={grape}>
                    {grape}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Primary grape variety used
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Alcohol Percentage */}
      <FormField
        control={form.control}
        name="alcoholPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alcohol Content: {alcoholPercentage}%</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={20}
                step={0.5}
                value={[field.value || 0]}
                onValueChange={(value) => field.onChange(value[0])}
                className="py-4"
              />
            </FormControl>
            <FormDescription>
              Alcohol by volume (ABV)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Appellation */}
      <FormField
        control={form.control}
        name="appellation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Appellation / Region</FormLabel>
            <FormControl>
              <Input 
                placeholder="e.g., Kakheti, PDO Mukuzani" 
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Geographic origin or protected designation
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Brief description for product cards and listings..."
                rows={3}
                {...field} 
              />
            </FormControl>
            <div className="flex justify-between">
              <FormDescription>
                Displayed on product cards
              </FormDescription>
              <span className={`text-xs ${description.length > 2000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {description.length}/2000
              </span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Full Description */}
      <FormField
        control={form.control}
        name="fullDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Detailed product description for the product page..."
                rows={5}
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Displayed on the full product page
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tasting Notes */}
      <FormField
        control={form.control}
        name="tastingNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tasting Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe the aroma, color, taste, and finish..."
                rows={4}
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Professional tasting notes for the product
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};