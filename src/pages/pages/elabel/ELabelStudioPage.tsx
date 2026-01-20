import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tag, Eye, Download, QrCode } from 'lucide-react';
import { toast } from 'sonner';

import { ELabelUploadZone } from '@/components/elabel/ELabelUploadZone';
import { ELabelForm } from '@/components/elabel/ELabelForm';
import { ELabelMobilePreview } from '@/components/elabel/ElabelMobilePreview';
import { 
  eLabelSchema, 
  ELabelFormData, 
  DEFAULT_ELABEL_VALUES,
  EU_LANGUAGES 
} from '@/types/elabel';

export default function ELabelStudioPage() {
  // State
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewLanguage, setPreviewLanguage] = useState('en');

  // Form with watch for live preview
  const form = useForm<ELabelFormData>({
    resolver: zodResolver(eLabelSchema),
    defaultValues: DEFAULT_ELABEL_VALUES,
    mode: 'onChange', // Important for live updates
  });

  // Watch ALL form values for live preview
  const formValues = form.watch();

  // AI Document Processing
  const handleFileAccepted = useCallback(async (file: File) => {
    setUploadedFile(file);
    setIsAiProcessing(true);
    setAiProgress(0);

    const progressInterval = setInterval(() => {
      setAiProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      // Simulate AI processing (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock AI-extracted data
      const mockData: Partial<ELabelFormData> = {
        productName: 'Brunello di Montalcino 2019',
        productCategory: 'wine',
        brandName: 'Tenuta Il Poggione',
        netQuantity: '750',
        netQuantityUnit: 'ml',
        containsAlcohol: true,
        alcoholContent: '14.5',
        ingredients: ['Grapes (Sangiovese Grosso 100%)', 'Sulfites'],
        allergens: ['sulfites'],
        nutritionalInfo: {
          energy: '87',
          fat: '0',
          saturatedFat: '0',
          carbohydrates: '2.7',
          sugars: '0.6',
          protein: '0.1',
          salt: '0',
        },
        countryOfOrigin: 'Italy',
        region: 'Tuscany - Montalcino',
        producerName: 'Tenuta Il Poggione S.r.l.',
        producerAddress: 'Loc. Sant\'Angelo in Colle, 53024 Montalcino (SI), Italy',
        isOrganic: true,
        certifications: ['organic_eu'],
        storageInstructions: 'Store horizontally in a cool, dark place at 12-16°C. Serve at 18°C.',
        responsibleDrinkingMessage: 'Enjoy responsibly. Not for persons under 18.',
      };

      clearInterval(progressInterval);
      setAiProgress(100);

      // Update form with AI data
      Object.entries(mockData).forEach(([key, value]) => {
        if (value !== undefined) {
          form.setValue(key as keyof ELabelFormData, value as any, { 
            shouldValidate: true,
            shouldDirty: true,
          });
        }
      });

      toast.success('Document analyzed!', {
        description: 'Fields auto-filled. Please review.',
      });

    } catch (error) {
      clearInterval(progressInterval);
      toast.error('Processing failed', {
        description: 'Please fill in manually.',
      });
    } finally {
      setTimeout(() => {
        setIsAiProcessing(false);
        setAiProgress(0);
      }, 500);
    }
  }, [form]);

  // Form Submit
  const onSubmit = async (data: ELabelFormData) => {
    console.log('E-Label Data:', data);
    toast.success('E-Label saved!', {
      description: 'Your E-Label is ready for use.',
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 border-b bg-card/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10">
              <Tag className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold">E-Label Studio</h1>
                <Badge className="bg-emerald-500 text-white text-[9px] px-1.5 h-4">FREE</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground">EU-compliant digital labels</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm" className="h-7 text-[10px]">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
            <Button size="sm" className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700">
              <QrCode className="h-3 w-3 mr-1" />
              Generate QR
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full grid lg:grid-cols-[1fr,280px] gap-3 p-3">
          
          {/* Left: Form */}
          <div className="overflow-y-auto space-y-3 pr-1">
            {/* Upload Zone */}
            <ELabelUploadZone
              onFileAccepted={handleFileAccepted}
              isProcessing={isAiProcessing}
              progress={aiProgress}
              uploadedFile={uploadedFile}
            />

            {/* Form */}
            <ELabelForm form={form} onSubmit={onSubmit} />
          </div>

          {/* Right: Preview */}
          <div className="hidden lg:block overflow-y-auto">
            <Card className="sticky top-0">
              <CardHeader className="py-2 px-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    Live Preview
                  </CardTitle>
                  <Select value={previewLanguage} onValueChange={setPreviewLanguage}>
                    <SelectTrigger className="w-20 h-6 text-[10px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EU_LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code} className="text-xs">
                          {lang.flag} {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <ELabelMobilePreview 
                  data={formValues}
                  language={previewLanguage}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}