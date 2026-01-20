import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BatchSuccessScreenProps {
  batchId: string;
  productName: string;
  numberOfUnits: number;
  onNavigateToDashboard: () => void;
  onNavigateToBatches: () => void;
}

export function BatchSuccessScreen({
  batchId,
  productName,
  numberOfUnits,
  onNavigateToDashboard,
  onNavigateToBatches,
}: BatchSuccessScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold mb-2">
            Batch Creation Started Successfully! 🎉
          </CardTitle>
          <p className="text-muted-foreground text-lg">
            Your batch is now being processed in the background
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Batch Details */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Batch ID:</span>
              <code className="text-sm font-mono bg-background px-3 py-1 rounded">
                {batchId}
              </code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Product:</span>
              <span className="font-medium">{productName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Quantity:</span>
              <span className="font-medium">{numberOfUnits.toLocaleString()} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className="inline-flex items-center gap-2 text-blue-600 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Processing
              </span>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <Package className="h-5 w-5" />
                <h3 className="font-semibold">Background Processing</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Product units and QR codes are being generated. This may take a few minutes depending on quantity.
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-semibold">Email Notification</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You'll receive an email when processing is complete with download links for QR codes.
              </p>
            </div>
          </div>

          {/* Next Steps */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Background job generates all product units and QR codes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>You can track progress in real-time on the batch detail page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Once complete, QR codes will be available for download</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>You'll receive a confirmation email with all details</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => navigate(`/dashboard/batches/${batchId}`)}
              className="flex-1"
              size="lg"
            >
              View Batch Details & Progress
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={onNavigateToBatches}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Go to All Batches
            </Button>
            <Button
              onClick={onNavigateToDashboard}
              variant="ghost"
              size="lg"
            >
              Dashboard
            </Button>
          </div>

          {/* Help Text */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            <p>
              Processing typically takes 10-60 seconds depending on batch size.
              You can safely navigate away - we'll notify you when complete.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}