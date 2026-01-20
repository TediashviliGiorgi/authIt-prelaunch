import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Loader2, RefreshCw } from 'lucide-react';

// ==========================================
// INTERFACE - FIXED: Added isResending prop
// ==========================================
export interface DashboardOverlayProps {
  userEmail: string;
  onResendEmail: () => void;
  isResending?: boolean;  // Added this prop to fix TypeScript error
}

// ==========================================
// DASHBOARD OVERLAY COMPONENT
// Shows when email is not verified - blocks interaction
// ==========================================
export function DashboardOverlay({ 
  userEmail, 
  onResendEmail,
  isResending = false 
}: DashboardOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="max-w-md mx-4 shadow-2xl border-2">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Please verify your email address to access the dashboard.
          </p>
          <p className="text-sm font-medium">
            We sent a verification link to:
          </p>
          <p className="text-primary font-semibold break-all">
            {userEmail}
          </p>
          
          <div className="pt-4 space-y-3">
            <Button 
              onClick={onResendEmail} 
              variant="outline" 
              className="w-full"
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or click above to resend.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}