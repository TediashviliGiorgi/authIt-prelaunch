import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, RefreshCw, XCircle, Mail, UserPlus } from 'lucide-react';
import { InviteSummary, InviteDetails } from '@/types/organization';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow, format } from 'date-fns';

interface InvitesTableProps {
  invites: (InviteSummary | InviteDetails)[];
  loading: boolean;
  onResend: (inviteId: string) => void;
  onCancel: (inviteId: string) => void;
  showAllStatuses?: boolean;
}

export function InvitesTable({
  invites,
  loading,
  onResend,
  onCancel,
  showAllStatuses = false,
}: InvitesTableProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (invites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Mail className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No invitations</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {showAllStatuses ? 'No invitations have been sent yet' : 'No pending invitations'}
        </p>
      </div>
    );
  }

  const getStatusBadge = (invite: InviteSummary | InviteDetails) => {
    const isExpired = invite.isExpired || (invite.status === 'Pending' && new Date(invite.expiresAt) <= new Date());
    
    if (isExpired && invite.status === 'Pending') {
      return <Badge variant="outline" className="text-gray-500">Expired</Badge>;
    }

    switch (invite.status) {
      case 'Pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending</Badge>;
      case 'Accepted':
        return <Badge variant="outline" className="text-green-500 border-green-500">Accepted</Badge>;
      case 'Declined':
        return <Badge variant="outline" className="text-red-500 border-red-500">Declined</Badge>;
      case 'Expired':
        return <Badge variant="outline" className="text-gray-500">Expired</Badge>;
      case 'Cancelled':
        return <Badge variant="outline" className="text-gray-400">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{invite.status}</Badge>;
    }
  };

  const canResend = (invite: InviteSummary | InviteDetails) => {
    const isExpired = invite.isExpired || invite.status === 'Expired' || 
                      (invite.status === 'Pending' && new Date(invite.expiresAt) <= new Date());
    return invite.status === 'Pending' || isExpired;
  };

  const canCancel = (invite: InviteSummary | InviteDetails) => {
    return invite.status === 'Pending' && !invite.isExpired && new Date(invite.expiresAt) > new Date();
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invitee</TableHead>
            <TableHead>Sent</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites.map((invite) => (
            <TableRow key={invite.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{invite.inviteeName || 'Unknown'}</p>
                  <p className="text-sm text-muted-foreground">{invite.inviteeEmail}</p>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(invite.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(invite.expiresAt) <= new Date() 
                  ? <span className="text-red-500">Expired</span>
                  : format(new Date(invite.expiresAt), 'MMM d, yyyy')
                }
              </TableCell>
              <TableCell>{getStatusBadge(invite)}</TableCell>
              <TableCell>
                {(canResend(invite) || canCancel(invite)) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canResend(invite) && (
                        <DropdownMenuItem onClick={() => onResend(invite.id)}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Resend Invite
                        </DropdownMenuItem>
                      )}
                      {canCancel(invite) && (
                        <DropdownMenuItem
                          onClick={() => onCancel(invite.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Invite
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}