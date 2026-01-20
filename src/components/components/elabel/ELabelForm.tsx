import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Plus, X, AlertTriangle, Leaf, Check } from 'lucide-react';
import { 
  ELabelFormData, 
  PRODUCT_CATEGORIES, 
  COMMON_ALLERGENS, 
  CERTIFICATIONS 
} from '@/types/elabel';

interface ELabelFormProps {
  form: UseFormReturn<ELabelFormData>;
  onSubmit: (data: ELabelFormData) => void;
}

export function ELabelForm({ form, onSubmit }: ELabelFormProps) {
  const [activeTab, setActiveTab] = useState('basic');
  const [newIngredient, setNewIngredient] = useState('');

  // Watch values for conditional rendering
  const containsAlcohol = form.watch('containsAlcohol');
  const ingredients = form.watch('ingredients') || [];
  const allergens = form.watch('allergens') || [];
  const certifications = form.watch('certifications') || [];
  const netQuantityUnit = form.watch('netQuantityUnit');

  // Handlers
  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      form.setValue('ingredients', [...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    form.setValue('ingredients', ingredients.filter((_, i) => i !== index));
  };

  const toggleAllergen = (value: string) => {
    if (allergens.includes(value)) {
      form.setValue('allergens', allergens.filter(a => a !== value));
    } else {
      form.setValue('allergens', [...allergens, value]);
    }
  };

  const toggleCertification = (value: string) => {
    if (certifications.includes(value)) {
      form.setValue('certifications', certifications.filter(c => c !== value));
    } else {
      form.setValue('certifications', [...certifications, value]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 h-8">
            <TabsTrigger value="basic" className="text-[10px]">Basic</TabsTrigger>
            <TabsTrigger value="ingredients" className="text-[10px]">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition" className="text-[10px]">Nutrition</TabsTrigger>
            <TabsTrigger value="origin" className="text-[10px]">Origin</TabsTrigger>
            <TabsTrigger value="compliance" className="text-[10px]">Compliance</TabsTrigger>
          </TabsList>

          {/* BASIC TAB */}
          <TabsContent value="basic" className="mt-3 space-y-3">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">Product Information</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Category *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value} className="text-xs">
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Product Name *</FormLabel>
                      <FormControl>
                        <Input className="h-8 text-xs" placeholder="e.g., Chianti Classico 2020" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Brand Name</FormLabel>
                      <FormControl>
                        <Input className="h-8 text-xs" placeholder="e.g., Villa Antinori" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="netQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Net Quantity</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" type="number" placeholder="750" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="netQuantityUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Unit</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ml">ml</SelectItem>
                            <SelectItem value="l">L</SelectItem>
                            <SelectItem value="cl">cl</SelectItem>
                            <SelectItem value="g">g</SelectItem>
                            <SelectItem value="kg">kg</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between rounded border p-2">
                  <div>
                    <Label className="text-xs">Contains Alcohol</Label>
                    <p className="text-[10px] text-muted-foreground">For alcoholic beverages</p>
                  </div>
                  <FormField
                    control={form.control}
                    name="containsAlcohol"
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>

                {containsAlcohol && (
                  <FormField
                    control={form.control}
                    name="alcoholContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Alcohol % vol</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" type="number" step="0.1" placeholder="13.5" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* INGREDIENTS TAB */}
          <TabsContent value="ingredients" className="mt-3 space-y-3">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">Ingredients & Allergens</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="flex gap-2">
                  <Input
                    className="h-8 text-xs"
                    placeholder="Add ingredient..."
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddIngredient();
                      }
                    }}
                  />
                  <Button type="button" size="sm" className="h-8 px-2" onClick={handleAddIngredient}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 min-h-[32px]">
                  {ingredients.map((ing, idx) => (
                    <Badge key={idx} variant="secondary" className="text-[10px] h-5 gap-1">
                      {ing}
                      <button type="button" onClick={() => handleRemoveIngredient(idx)}>
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </Badge>
                  ))}
                  {ingredients.length === 0 && (
                    <span className="text-[10px] text-muted-foreground">No ingredients added</span>
                  )}
                </div>

                <Separator />

                <div>
                  <Label className="text-xs mb-2 block">Allergens (EU 14)</Label>
                  <div className="grid grid-cols-2 gap-1">
                    {COMMON_ALLERGENS.map((a) => {
                      const selected = allergens.includes(a.value);
                      return (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => toggleAllergen(a.value)}
                          className={`flex items-center gap-1 p-1.5 rounded border text-[10px] text-left transition-all ${
                            selected
                              ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-700'
                              : 'hover:border-muted-foreground/50'
                          }`}
                        >
                          <AlertTriangle className={`h-2.5 w-2.5 shrink-0 ${selected ? 'text-amber-500' : 'text-muted-foreground'}`} />
                          <span className="truncate">{a.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NUTRITION TAB */}
          <TabsContent value="nutrition" className="mt-3 space-y-3">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">Nutritional Information</CardTitle>
                <CardDescription className="text-[10px]">
                  Per 100{netQuantityUnit === 'g' || netQuantityUnit === 'kg' ? 'g' : 'ml'}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'nutritionalInfo.energy', label: 'Energy (kcal)', placeholder: '85' },
                    { name: 'nutritionalInfo.fat', label: 'Fat (g)', placeholder: '0' },
                    { name: 'nutritionalInfo.saturatedFat', label: 'Saturated Fat (g)', placeholder: '0' },
                    { name: 'nutritionalInfo.carbohydrates', label: 'Carbs (g)', placeholder: '2.6' },
                    { name: 'nutritionalInfo.sugars', label: 'Sugars (g)', placeholder: '0.9' },
                    { name: 'nutritionalInfo.protein', label: 'Protein (g)', placeholder: '0.1' },
                    { name: 'nutritionalInfo.salt', label: 'Salt (g)', placeholder: '0' },
                  ].map((field) => (
                    <FormField
                      key={field.name}
                      control={form.control}
                      name={field.name as any}
                      render={({ field: f }) => (
                        <FormItem>
                          <FormLabel className="text-[10px]">{field.label}</FormLabel>
                          <FormControl>
                            <Input className="h-7 text-xs" type="number" step="0.1" placeholder={field.placeholder} {...f} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ORIGIN TAB */}
          <TabsContent value="origin" className="mt-3 space-y-3">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">Origin & Producer</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="countryOfOrigin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Country</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" placeholder="Italy" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Region</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" placeholder="Tuscany" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="producerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Producer Name</FormLabel>
                      <FormControl>
                        <Input className="h-8 text-xs" placeholder="Company S.r.l." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="producerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Address</FormLabel>
                      <FormControl>
                        <Textarea className="text-xs resize-none" rows={2} placeholder="Via Roma 1, 00100 Roma" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="importerInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Importer (if applicable)</FormLabel>
                      <FormControl>
                        <Textarea className="text-xs resize-none" rows={2} placeholder="For products imported into EU" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* COMPLIANCE TAB */}
          <TabsContent value="compliance" className="mt-3 space-y-3">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm">Compliance & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="lotNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Lot Number</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" placeholder="L2024-001" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bestBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Best Before</FormLabel>
                        <FormControl>
                          <Input className="h-8 text-xs" type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="storageInstructions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Storage Instructions</FormLabel>
                      <FormControl>
                        <Textarea className="text-xs resize-none" rows={2} placeholder="Store in cool, dark place..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between rounded border p-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-emerald-600" />
                    <div>
                      <Label className="text-xs">Organic Product</Label>
                      <p className="text-[10px] text-muted-foreground">Certified organic</p>
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="isOrganic"
                    render={({ field }) => (
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    )}
                  />
                </div>

                <div>
                  <Label className="text-xs mb-2 block">Certifications</Label>
                  <div className="grid grid-cols-3 gap-1">
                    {CERTIFICATIONS.map((c) => {
                      const selected = certifications.includes(c.value);
                      return (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => toggleCertification(c.value)}
                          className={`flex items-center gap-1 p-1.5 rounded border text-[10px] text-left transition-all ${
                            selected
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700'
                              : 'hover:border-muted-foreground/50'
                          }`}
                        >
                          <Check className={`h-2.5 w-2.5 shrink-0 ${selected ? 'text-emerald-500' : 'text-transparent'}`} />
                          <span className="truncate">{c.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {containsAlcohol && (
                  <FormField
                    control={form.control}
                    name="responsibleDrinkingMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Responsible Drinking Message</FormLabel>
                        <FormControl>
                          <Textarea className="text-xs resize-none" rows={2} placeholder="Drink responsibly..." {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" size="sm">Save Draft</Button>
              <Button type="submit" size="sm" className="bg-emerald-600 hover:bg-emerald-700">Save E-Label</Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}