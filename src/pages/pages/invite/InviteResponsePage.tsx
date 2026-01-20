import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle, Building2, AlertTriangle } from 'lucide-react';
import { organizationService } from '@/services/organizationService';
import { InviteValidation } from '@/types/organization';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

export default function InviteResponsePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const token = searchParams.get('token');
  const action = searchParams.get('action'); // 'accept' or 'decline'

  const [validation, setValidation] = useState<InviteValidation | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState<'accepted' | 'declined' | null>(null);

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const result = await organizationService.validateInviteToken(token!);
      setValidation(result);

      // Auto-decline if action=decline
      if (action === 'decline' && result.isValid) {
        await handleDecline();
      }
    } catch (error) {
      setValidation({
        isValid: false,
        message: 'Failed to validate invitation',
        hasExistingAccount: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate(`/login?redirect=/invite/accept?token=${token}`);
      return;
    }

    try {
      setProcessing(true);
      const result = await organizationService.acceptInvite(token!);
      setCompleted('accepted');
      toast({
        title: 'Welcome!',
        description: `You've joined ${result.organization.name}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to accept invitation',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleDecline = async () => {
    try {
      setProcessing(true);
      await organizationService.declineInvite(token!);
      setCompleted('declined');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to decline invitation',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Invalid Link</h2>
            <p className="text-muted-foreground">
              This invitation link is invalid or incomplete.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            {completed === 'accepted' ? (
              <>
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
                <p className="text-muted-foreground mb-6">
                  You've successfully joined {validation?.organizationName}.
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <XCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Invitation Declined</h2>
                <p className="text-muted-foreground mb-6">
                  You've declined the invitation from {validation?.organizationName}.
                </p>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Go Home
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!validation?.isValid) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
            <p className="text-muted-foreground">
              {validation?.message || 'This invitation is no longer valid.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>You're Invited!</CardTitle>
          <CardDescription>
            <strong>{validation.organizationName}</strong> ({validation.organizationType}) 
            has invited you to join their organization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {validation.hasExistingAccount && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md">
              <p className="text-sm text-green-600">
                ✓ We found your account: <strong>{validation.existingCompanyName}</strong>
              </p>
            </div>
          )}

          {!isAuthenticated && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
              <p className="text-sm text-amber-600">
                Please log in to accept this invitation.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDecline}
              disabled={processing}
            >
              {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Decline'}
            </Button>
            <Button
              className="flex-1"
              onClick={handleAccept}
              disabled={processing}
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isAuthenticated ? (
                'Accept & Join'
              ) : (
                'Login to Accept'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}