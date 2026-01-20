import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Wine,
  AlertTriangle,
  Leaf,
  Globe,
  Factory,
  Thermometer,
  Package,
  Shield,
  Check,
} from 'lucide-react';
import { 
  ELabelFormData, 
  ELABEL_TRANSLATIONS, 
  ALLERGEN_TRANSLATIONS,
  CERTIFICATIONS,
} from '@/types/elabel';

interface ELabelMobilePreviewProps {
  data: ELabelFormData;
  language: string;
}

export function ELabelMobilePreview({ data, language }: ELabelMobilePreviewProps) {
  // Get translations
  const t = ELABEL_TRANSLATIONS[language] || ELABEL_TRANSLATIONS.en;
  const allergenT = ALLERGEN_TRANSLATIONS[language] || ALLERGEN_TRANSLATIONS.en;
  
  // Check if we have any content
  const hasContent = Boolean(data.productName || data.brandName);
  
  // Get unit for nutrition
  const unit = data.netQuantityUnit === 'g' || data.netQuantityUnit === 'kg' ? 'g' : 'ml';
  
  // Check if nutrition has data
  const hasNutrition = data.nutritionalInfo && 
    Object.values(data.nutritionalInfo).some(v => v && String(v).trim() !== '');

  // Helper to get allergen label
  const getAllergenLabel = (value: string) => allergenT[value] || value;
  
  // Helper to get certification label
  const getCertLabel = (value: string) => {
    const cert = CERTIFICATIONS.find(c => c.value === value);
    return cert?.label || value;
  };

  return (
    <div className="flex justify-center">
      {/* Phone Frame */}
      <div className="relative w-[240px]">
        {/* Phone Bezel */}
        <div className="relative bg-gray-900 rounded-[1.75rem] p-1.5 shadow-xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-900 rounded-b-xl z-10" />
          
          {/* Screen */}
          <div className="bg-white dark:bg-gray-950 rounded-[1.5rem] overflow-hidden h-[420px]">
            {/* Status Bar */}
            <div className="h-6 bg-gradient-to-r from-emerald-600 to-emerald-500 flex items-center justify-between px-4 text-white text-[9px]">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-1.5 border border-white rounded-sm">
                  <div className="w-2 h-1 bg-white rounded-sm m-[0.5px]" />
                </div>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="h-[394px]">
              {hasContent ? (
                <div className="p-2.5 space-y-2.5">
                  {/* Header */}
                  <div className="text-center space-y-0.5 pb-2 border-b">
                    {data.brandName && (
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">
                        {data.brandName}
                      </p>
                    )}
                    <h1 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {data.productName}
                    </h1>
                    {data.netQuantity && (
                      <p className="text-[10px] text-muted-foreground">
                        {data.netQuantity} {data.netQuantityUnit}
                      </p>
                    )}
                  </div>

                  {/* Quick Badges */}
                  {(data.containsAlcohol || data.isOrganic || data.countryOfOrigin) && (
                    <div className="flex flex-wrap justify-center gap-1">
                      {data.containsAlcohol && data.alcoholContent && (
                        <Badge variant="outline" className="text-[8px] h-4 px-1">
                          🍷 {data.alcoholContent}% vol
                        </Badge>
                      )}
                      {data.isOrganic && (
                        <Badge className="bg-emerald-100 text-emerald-700 text-[8px] h-4 px-1">
                          <Leaf className="h-2 w-2 mr-0.5" />
                          {t.organic}
                        </Badge>
                      )}
                      {data.countryOfOrigin && (
                        <Badge variant="outline" className="text-[8px] h-4 px-1">
                          <Globe className="h-2 w-2 mr-0.5" />
                          {data.countryOfOrigin}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Allergens Warning */}
                  {data.allergens && data.allergens.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded p-1.5">
                      <div className="flex items-center gap-1 text-amber-700 dark:text-amber-400 mb-0.5">
                        <AlertTriangle className="h-2.5 w-2.5" />
                        <span className="font-semibold text-[10px]">{t.allergens}</span>
                      </div>
                      <p className="text-[9px] text-amber-600 dark:text-amber-500">
                        {t.contains}: {data.allergens.map(getAllergenLabel).join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Ingredients */}
                  {data.ingredients && data.ingredients.length > 0 && (
                    <div className="space-y-0.5">
                      <h3 className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">
                        {t.ingredients}
                      </h3>
                      <p className="text-[10px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        {data.ingredients.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Nutritional Information */}
                  {hasNutrition && (
                    <div className="space-y-0.5">
                      <h3 className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">
                        {t.nutritionalInfo} ({t.per100}{unit})
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 rounded overflow-hidden">
                        <table className="w-full text-[9px]">
                          <tbody>
                            {data.nutritionalInfo?.energy && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 font-medium">{t.energy}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.energy} kcal</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.fat && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 font-medium">{t.fat}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.fat}g</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.saturatedFat && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 pl-3 text-muted-foreground">{t.saturatedFat}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.saturatedFat}g</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.carbohydrates && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 font-medium">{t.carbohydrates}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.carbohydrates}g</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.sugars && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 pl-3 text-muted-foreground">{t.sugars}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.sugars}g</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.protein && (
                              <tr className="border-b border-gray-200 dark:border-gray-800">
                                <td className="py-1 px-1.5 font-medium">{t.protein}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.protein}g</td>
                              </tr>
                            )}
                            {data.nutritionalInfo?.salt && (
                              <tr>
                                <td className="py-1 px-1.5 font-medium">{t.salt}</td>
                                <td className="py-1 px-1.5 text-right">{data.nutritionalInfo.salt}g</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Origin & Producer */}
                  {(data.countryOfOrigin || data.producerName) && (
                    <div className="space-y-1.5 text-[9px]">
                      {data.countryOfOrigin && (
                        <div className="flex items-start gap-1.5">
                          <Globe className="h-2.5 w-2.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <span className="text-muted-foreground">{t.origin}: </span>
                            <span className="font-medium">
                              {data.region ? `${data.region}, ` : ''}{data.countryOfOrigin}
                            </span>
                          </div>
                        </div>
                      )}
                      {data.producerName && (
                        <div className="flex items-start gap-1.5">
                          <Factory className="h-2.5 w-2.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <span className="text-muted-foreground">{t.producer}: </span>
                            <span className="font-medium">{data.producerName}</span>
                            {data.producerAddress && (
                              <p className="text-[8px] text-muted-foreground mt-0.5">
                                {data.producerAddress}
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {data.importerInfo && (
                        <div className="flex items-start gap-1.5">
                          <Package className="h-2.5 w-2.5 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <span className="text-muted-foreground">{t.importer}: </span>
                            <span>{data.importerInfo}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Storage & Lot */}
                  {(data.storageInstructions || data.lotNumber || data.bestBefore) && (
                    <div className="space-y-1 text-[8px]">
                      {data.storageInstructions && (
                        <div className="flex items-start gap-1">
                          <Thermometer className="h-2 w-2 text-muted-foreground mt-0.5" />
                          <p className="text-muted-foreground">{data.storageInstructions}</p>
                        </div>
                      )}
                      <div className="flex gap-2 text-muted-foreground">
                        {data.lotNumber && <span>{t.lotNumber}: {data.lotNumber}</span>}
                        {data.bestBefore && <span>{t.bestBefore}: {data.bestBefore}</span>}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {data.certifications && data.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {data.certifications.map((cert) => (
                        <Badge key={cert} variant="secondary" className="text-[8px] h-4 px-1">
                          <Check className="h-2 w-2 mr-0.5" />
                          {getCertLabel(cert)}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Responsible Drinking */}
                  {data.containsAlcohol && (
                    <div className="bg-gray-100 dark:bg-gray-900 rounded p-1.5 text-center">
                      <p className="text-[8px] text-muted-foreground">
                        {data.responsibleDrinkingMessage || t.responsibleDrinking}
                      </p>
                      <p className="text-[7px] text-muted-foreground mt-0.5">🔞 18+</p>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-1.5 border-t text-center">
                    <div className="flex items-center justify-center gap-1 text-[8px] text-muted-foreground">
                      <Shield className="h-2 w-2" />
                      <span>Powered by AuthIt</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Empty State */
                <div className="h-full flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                    <Wine className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-xs text-gray-700 dark:text-gray-300">
                    E-Label Preview
                  </h3>
                  <p className="text-[9px] text-muted-foreground mt-1 max-w-[140px]">
                    Start typing to see your E-Label here
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
}