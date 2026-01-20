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
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Image, 
  QrCode, 
  Shield, 
  FileText, 
  Globe, 
  Lock,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductStep4Props {
  form: UseFormReturn<any>;
}

export const ProductStep4 = ({ form }: ProductStep4Props) => {
  const marketingEnabled = form.watch('marketingPageEnabled');
  const digitalPassportEnabled = form.watch('digitalPassportEnabled');
  const gs1Enabled = form.watch('gs1Enabled');
  const dualQREnabled = form.watch('dualQREnabled');

  // Calculate estimated cost per unit
  const calculateCostPerUnit = () => {
    let cost = 0.03; // Base cost for marketing page
    if (digitalPassportEnabled) cost += 0.02;
    if (gs1Enabled) cost += 0.01;
    if (dualQREnabled) cost += 0.05;
    return cost.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Media & QR Setup</h3>
        <p className="text-sm text-muted-foreground">
          Add product images and configure QR code features
        </p>
      </div>

      {/* Media Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Image className="h-4 w-4" />
            Product Images
          </CardTitle>
          <CardDescription>
            Add images for your product (URLs for now, file upload coming soon)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Image URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/product-image.jpg" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Primary product image (min 800x800px recommended)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/product-thumb.jpg" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Small image for lists (200x200px)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="galleryUrls"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gallery URLs</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://url1.jpg, https://url2.jpg, ..." 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Comma-separated list of additional image URLs
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* QR Configuration Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <QrCode className="h-4 w-4" />
            QR & Authentication Configuration
          </CardTitle>
          <CardDescription>
            Choose what features each bottle will have. These become the defaults for all batches of this product.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* External QR Section */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              External QR Code (Visible on label)
            </h4>
            <div className="space-y-4 pl-6 border-l-2 border-muted">
              {/* Marketing Page - Always enabled */}
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Marketing Page</span>
                    <Badge variant="secondary">Included</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Interactive storytelling experience with product details, brand story, and tasting notes
                  </p>
                </div>
              </div>

              {/* Digital Passport */}
              <FormField
                control={form.control}
                name="digitalPassportEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 p-3 rounded-lg border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-medium cursor-pointer">
                          Digital Product Passport
                        </FormLabel>
                        <Badge variant="outline">+€0.02/unit</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>EU 2027 compliance requirement. Contains detailed product information, ingredients, nutrition, and sustainability data.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormDescription>
                        EU 2027 compliance - detailed product information & traceability
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {/* GS1 Standard */}
              <FormField
                control={form.control}
                name="gs1Enabled"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 p-3 rounded-lg border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-medium cursor-pointer">
                          GS1 Digital Link
                        </FormLabel>
                        <Badge variant="outline">+€0.01/unit</Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p>Allows retail POS systems to scan your QR code for product information and checkout.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <FormDescription>
                        Retail POS scanning compatibility for cashier checkout
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Internal QR Section */}
          <div>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Internal QR Code (Hidden under cork/cap)
            </h4>
            <div className="space-y-4 pl-6 border-l-2 border-primary/50">
              {/* Dual QR Authentication */}
              <FormField
                control={form.control}
                name="dualQREnabled"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 p-3 rounded-lg border border-primary/30 bg-primary/5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="font-medium cursor-pointer">
                          Dual QR Authentication
                        </FormLabel>
                        <Badge variant="default">+€0.05/unit</Badge>
                        <Badge variant="secondary">Recommended</Badge>
                      </div>
                      <FormDescription>
                        Each bottle gets a unique hidden QR under the cork. One-time verification proves authenticity. 
                        <strong className="text-foreground"> N→N Economics</strong> makes counterfeiting economically unfeasible.
                      </FormDescription>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Shield className="h-3 w-3" />
                        <span>Anti-counterfeiting protection for premium products</span>
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Cost Summary */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Estimated Cost per Unit</p>
              <p className="text-sm text-muted-foreground">Based on selected features</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">€{calculateCostPerUnit()}</p>
              <p className="text-xs text-muted-foreground">per bottle</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Visibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="isPublic"
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
                    Public Product
                  </FormLabel>
                  <FormDescription>
                    Make this product visible in public catalogs and search
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayOrder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Order</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min={0}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                  />
                </FormControl>
                <FormDescription>
                  Lower numbers appear first in lists
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};