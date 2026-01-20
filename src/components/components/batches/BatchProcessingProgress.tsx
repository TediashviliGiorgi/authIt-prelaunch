import { useQuery } from '@tanstack/react-query';
import { batchService } from '@/services/batchService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Package 
} from 'lucide-react';

interface BatchProcessingProgressProps {
  batchId: string;
  onComplete?: () => void;
}

export function BatchProcessingProgress({ 
  batchId, 
  onComplete 
}: BatchProcessingProgressProps) {
  
  // Poll every 2 seconds while processing
  const { data: progress, isLoading } = useQuery({
    queryKey: ['batch-progress', batchId],
    queryFn: () => batchService.getBatchProgress(batchId),
    refetchInterval: (query) => {
      // ===== FIXED: Use query.state.data instead of just data =====
      const data = query.state.data;
      
      // Stop polling when completed or failed
      if (data?.processingStatus === 'completed' || 
          data?.processingStatus === 'failed') {
        if (data?.processingStatus === 'completed' && onComplete) {
          onComplete();
        }
        return false; // Stop polling
      }
      
      // Adaptive polling based on progress
      if (!data || data.processingStatus === 'pending') {
        return 5000; // Slow: 5s
      }
      if (data.progress < 10) {
        return 5000; // Starting: 5s
      }
      if (data.progress >= 90) {
        return 1000; // Almost done: 1s
      }
      return 2000; // Active: 2s
    },
    enabled: true,
  });

  if (isLoading || !progress) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Format ETA
  const formatETA = (eta?: { totalSeconds: number }) => {
    if (!eta || !eta.totalSeconds) return 'Calculating...';
    
    const seconds = Math.floor(eta.totalSeconds);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    
    if (minutes > 0) {
      return `~${minutes}m ${secs}s remaining`;
    }
    return `~${secs}s remaining`;
  };

  // Status badges
  const getStatusBadge = () => {
    switch (progress.processingStatus) {
      case 'pending':
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case 'processing':
        return (
          <Badge className="gap-1 bg-blue-600">
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="gap-1 bg-green-600">
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Processing Status</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Pending State */}
        {progress.processingStatus === 'pending' && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              Your batch is queued for processing. It will start shortly...
            </AlertDescription>
          </Alert>
        )}

        {/* Processing State */}
        {progress.processingStatus === 'processing' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Generating Product Units & QR Codes
                </span>
                <span className="font-medium">
                  {progress.progress.toFixed(1)}%
                </span>
              </div>
              <Progress value={progress.progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>
                  {progress.processedUnits.toLocaleString()} / {progress.totalUnits.toLocaleString()} units
                </span>
                <span>
                  {formatETA(progress.estimatedTimeRemaining)}
                </span>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Package className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-900">
                You can safely navigate away. We'll email you when processing is complete.
              </AlertDescription>
            </Alert>
          </>
        )}

        {/* Completed State */}
        {progress.processingStatus === 'completed' && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-900">
              <strong>Processing complete!</strong> All {progress.totalUnits.toLocaleString()} units 
              and QR codes have been generated. Your batch is now active.
            </AlertDescription>
          </Alert>
        )}

        {/* Failed State */}
        {progress.processingStatus === 'failed' && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Processing failed:</strong> {progress.processingError || 'Unknown error'}
              <br />
              <span className="text-sm">Please contact support or try creating the batch again.</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Processing info */}
        {progress.processingStartedAt && (
          <div className="pt-4 border-t text-xs text-muted-foreground space-y-1">
            <div>Started: {new Date(progress.processingStartedAt).toLocaleString()}</div>
            {progress.processingCompletedAt && (
              <div>Completed: {new Date(progress.processingCompletedAt).toLocaleString()}</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}