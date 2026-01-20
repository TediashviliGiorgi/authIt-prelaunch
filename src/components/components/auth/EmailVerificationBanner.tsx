import { AlertCircle, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EmailVerificationBannerProps {
  userEmail: string;
}

export function EmailVerificationBanner({ userEmail }: EmailVerificationBannerProps) {
  return (
    <Alert variant="destructive" className="mb-4 border-amber-500 bg-amber-50 dark:bg-amber-950/20">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800 dark:text-amber-400">Email Verification Required</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-300">
        Please verify your email address ({userEmail}) to access all features.
        Check your inbox for the verification link.
      </AlertDescription>
    </Alert>
  );
}