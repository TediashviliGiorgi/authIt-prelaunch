import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Percent, Calendar, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';

interface MembershipCardProps {
  organizationName: string;
  organizationType?: string;
  joinedAt?: string;
  discount?: number;
  onLeave?: () => Promise<void>;
}

export function MembershipCard({
  organizationName,
  organizationType,
  joinedAt,
  discount = 20,
  onLeave,
}: MembershipCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const handleLeave = async () => {
    if (!onLeave) return;
    
    try {
      setLeaving(true);
      await onLeave();
      setConfirmOpen(false);
    } catch (error) {
      console.error('Failed to leave organization:', error);
    } finally {
      setLeaving(false);
    }
  };

  return (
    <>
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{organizationName}</h4>
                {organizationType && (
                  <p className="text-sm text-muted-foreground capitalize">{organizationType}</p>
                )}
              </div>
            </div>
            
            {discount && discount > 0 && (
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                <Percent className="h-3 w-3 mr-1" />
                {discount}% Discount
              </Badge>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {joinedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Joined {format(new Date(joinedAt), 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>

            {onLeave && (
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => setConfirmOpen(true)}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Leave
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave Organization?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to leave <strong>{organizationName}</strong>?
              <br /><br />
              You will lose:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>{discount}% membership discount</li>
                <li>Access to consortium benefits</li>
                <li>Organization network visibility</li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={leaving}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLeave}
              disabled={leaving}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {leaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Leaving...
                </>
              ) : (
                'Leave Organization'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}