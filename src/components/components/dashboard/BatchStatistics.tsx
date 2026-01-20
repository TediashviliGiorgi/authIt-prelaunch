import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Radio, Shield, Package, Minus } from 'lucide-react';

/**
 * BatchStatistics - Dashboard batch statistics widget
 * 
 * NOTE: Currently shows placeholders (—) until real API data is connected.
 * All structure and titles are preserved for future integration.
 */

export const BatchStatistics = () => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Batch Statistics</h3>
          <p className="text-sm text-muted-foreground">Overview of your authentication methods and costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Batches by Method */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Batches</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">—</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <QrCode className="h-3 w-3 text-primary" />
                  <span>QR Only</span>
                </div>
                <Badge variant="outline" className="text-muted-foreground">—</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Radio className="h-3 w-3 text-amber-600" />
                  <span>NFC Only</span>
                </div>
                <Badge variant="outline" className="text-muted-foreground">—</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  <span>Both</span>
                </div>
                <Badge variant="outline" className="text-muted-foreground">—</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Cost Per Bottle */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Cost Per Bottle</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">— ₾</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Minus className="h-3 w-3" />
                <span>Awaiting data</span>
              </div>
              <div className="mt-2 pt-2 border-t space-y-1">
                <div>QR: — ₾/bottle</div>
                <div>NFC: — ₾/bottle</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Method */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Most Popular Method</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2 text-muted-foreground">
              <QrCode className="h-6 w-6" />
              —
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Package className="h-3 w-3" />
                <span>— batches (—%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-3 w-3" />
                <span>Awaiting data</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Analytics */}
        <Card className="border-border bg-muted/20">
          <CardHeader className="pb-3">
            <CardDescription>Estimated ROI</CardDescription>
            <CardTitle className="text-3xl text-muted-foreground">
              —%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Minus className="h-3 w-3" />
                <span>Total investment: — ₾</span>
              </div>
              <div className="flex items-center gap-2">
                <Minus className="h-3 w-3" />
                <span>— consumer scans</span>
              </div>
              <div className="text-xs mt-2">
                Authentication protecting — bottles
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};