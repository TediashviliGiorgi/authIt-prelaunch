import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  ArrowRight,
  Shield,
  Home,
  RefreshCw
} from 'lucide-react';
import { authService } from '@/services/authService';

// ==========================================
// TYPES
// ==========================================
type VerificationStatus = 'loading' | 'success' | 'error' | 'no-token';

// ==========================================
// COMPONENT
// ==========================================
export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [message, setMessage] = useState('');
  const [isRetrying, setIsRetrying] = useState(false);

  const token = searchParams.get('token');

  // ==========================================
  // VERIFY EMAIL ON MOUNT
  // ==========================================
  useEffect(() => {
    const verifyEmail = async () => {
      // No token provided
      if (!token) {
        setStatus('no-token');
        setMessage('No verification token provided. Please check your email link.');
        return;
      }

      try {
        setStatus('loading');
        const response = await authService.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email verified successfully!');
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Failed to verify email. The link may have expired.');
      }
    };

    verifyEmail();
  }, [token]);

  // ==========================================
  // RETRY VERIFICATION
  // ==========================================
  const handleRetry = async () => {
    if (!token) return;

    setIsRetrying(true);
    try {
      const response = await authService.verifyEmail(token);
      setStatus('success');
      setMessage(response.message || 'Email verified successfully!');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Verification failed. Please try again.');
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AuthIt</span>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center pb-2">
            {/* Status Icon */}
            <div className="mx-auto mb-4">
              {status === 'loading' && (
                <div className="h-20 w-20 rounded-full bg-blue-500/10 flex items-center justify-center animate-pulse">
                  <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
                </div>
              )}
              {status === 'success' && (
                <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
              )}
              {status === 'error' && (
                <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="h-10 w-10 text-red-500" />
                </div>
              )}
              {status === 'no-token' && (
                <div className="h-20 w-20 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Mail className="h-10 w-10 text-yellow-500" />
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="mb-2">
              {status === 'loading' && (
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600">
                  Verifying...
                </Badge>
              )}
              {status === 'success' && (
                <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                  Verified
                </Badge>
              )}
              {status === 'error' && (
                <Badge variant="secondary" className="bg-red-500/10 text-red-600">
                  Failed
                </Badge>
              )}
              {status === 'no-token' && (
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600">
                  Missing Token
                </Badge>
              )}
            </div>

            {/* Title */}
            <CardTitle className="text-2xl">
              {status === 'loading' && 'Verifying Your Email...'}
              {status === 'success' && 'Email Verified!'}
              {status === 'error' && 'Verification Failed'}
              {status === 'no-token' && 'Invalid Link'}
            </CardTitle>

            {/* Description */}
            <CardDescription className="mt-2 text-base">
              {message}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            {/* Loading State */}
            {status === 'loading' && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground">
                  Please wait while we verify your email address...
                </p>
                <div className="mt-4 flex justify-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Success State */}
            {status === 'success' && (
              <>
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <p className="text-sm text-center text-green-700 dark:text-green-400">
                    🎉 Your email has been verified successfully! You now have full access to all AuthIt features.
                  </p>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    // Update localStorage before navigation
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                      try {
                        const user = JSON.parse(storedUser);
                        user.isEmailVerified = true;
                        localStorage.setItem('user', JSON.stringify(user));
                      } catch (e) {
                        
                      }
                    }
                    // Force page reload to refresh auth state
                    window.location.href = '/dashboard';
                  }}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </>
            )}

            {/* Error State */}
            {status === 'error' && (
              <>
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <p className="text-sm text-center text-red-700 dark:text-red-400">
                    The verification link may have expired or already been used.
                    Please try logging in to request a new verification email.
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleRetry}
                  disabled={isRetrying}
                >
                  {isRetrying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Retrying...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </>
                  )}
                </Button>
                <Button
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </>
            )}

            {/* No Token State */}
            {status === 'no-token' && (
              <>
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm text-center text-yellow-700 dark:text-yellow-400">
                    Please click the verification link in your email.
                    If you can't find it, check your spam folder or request a new one.
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate('/login')}
                >
                  Go to Login
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Need help?{' '}
          <Link to="/contact" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}