import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, LogOut, Plus, RefreshCw, Building2, Menu, X, Mail, Clock, Settings, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { organizationService } from '@/services/organizationService';
import { OrganizationStats, MemberSummary, InviteDetails, InviteStats } from '@/types/organization';
import { StatsCards } from '@/components/organization/StatsCards';
import { InviteStatsCards } from '@/components/organization/InviteStatsCards';
import { MembersTable } from '@/components/organization/MembersTable';
import { InvitesTable } from '@/components/organization/InvitesTable';
import { InviteModal } from '@/components/organization/InviteModal';
import { OrganizationBottomNav } from '@/components/organization/OrganizationBottomNav';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { PasswordConfirmModal } from '@/components/ui/password-confirm-modal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function OrganizationDashboardPage() {
  const { user, logout } = useAuth();
  const orgProfile = user?.organizationProfile;

  // State
  const [stats, setStats] = useState<OrganizationStats | null>(null);
  const [members, setMembers] = useState<MemberSummary[]>([]);
  const [invites, setInvites] = useState<InviteDetails[]>([]);
  const [inviteStats, setInviteStats] = useState<InviteStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('members');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Load data
  const loadData = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      else setLoading(true);

      const [statsData, membersData, invitesData] = await Promise.all([
        organizationService.getStats(),
        organizationService.getMembers(),
        organizationService.getInvites(), // ერთი მეთოდი - ყველაფერი
      ]);

      setStats(statsData);
      setMembers(membersData);
      setInvites(invitesData.invites);
      setInviteStats(invitesData.stats);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handlers
  const handleSendInvite = async (data: { email: string; name?: string; message?: string }) => {
    try {
      await organizationService.sendInvite(data);
      toast({
        title: 'Invitation Sent',
        description: `Invitation sent to ${data.email}`,
      });
      loadData(true);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send invitation');
    }
  };

  const handleDeleteAccount = async (password: string) => {
    try {
      await organizationService.deleteAccount(password);
      toast({
        title: 'Account Deleted',
        description: 'Your organization account has been deleted',
      });
      logout();
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete account');
    }
  };

  const handleResendInvite = async (inviteId: string) => {
    try {
      await organizationService.resendInvite(inviteId);
      toast({
        title: 'Invitation Resent',
        description: 'The invitation has been resent',
      });
      loadData(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend invitation',
        variant: 'destructive',
      });
    }
  };

  const handleCancelInvite = async (inviteId: string) => {
    try {
      await organizationService.cancelInvite(inviteId);
      toast({
        title: 'Invitation Cancelled',
        description: 'The invitation has been cancelled',
      });
      loadData(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to cancel invitation',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveMember = async (companyId: string) => {
    try {
      await organizationService.removeMember(companyId);
      toast({
        title: 'Member Removed',
        description: 'The company has been removed and notified via email',
      });
      loadData(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove member',
        variant: 'destructive',
      });
    }
  };

  const handleViewMemberDetails = (companyId: string) => {
    console.log('View details for:', companyId);
  };

  // Filter invites
  const pendingInvites = invites.filter(i => i.status === 'Pending' && !i.isExpired);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">{orgProfile?.organizationName || 'Organization'}</h1>
              <p className="text-xs text-muted-foreground capitalize">
                {orgProfile?.organizationType || 'Consortium'}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => loadData(true)}
              disabled={refreshing}
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <LanguageSelector />
            <ThemeSwitcher />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setDeleteModalOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Account
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 md:hidden flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => loadData(true)} disabled={refreshing}>
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
                <LanguageSelector />
                <ThemeSwitcher />
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Organization Stats */}
          <StatsCards stats={stats} loading={loading} />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
              <TabsTrigger value="members" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Members ({members.length})
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Pending ({inviteStats?.pending || 0})
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                History ({inviteStats?.total || 0})
              </TabsTrigger>
            </TabsList>

            {/* Members Tab */}
            <TabsContent value="members">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Member Companies</CardTitle>
                    <CardDescription>Companies in your organization</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setInviteModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Invite
                  </Button>
                </CardHeader>
                <CardContent>
                  <MembersTable
                    members={members}
                    loading={loading}
                    onViewDetails={handleViewMemberDetails}
                    onRemoveMember={handleRemoveMember}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pending Invites Tab */}
            <TabsContent value="pending">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Pending Invitations</CardTitle>
                    <CardDescription>Waiting for response</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => setInviteModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Send Invite
                  </Button>
                </CardHeader>
                <CardContent>
                  <InvitesTable
                    invites={pendingInvites}
                    loading={loading}
                    onResend={handleResendInvite}
                    onCancel={handleCancelInvite}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              {/* Invite Stats */}
              <InviteStatsCards stats={inviteStats} loading={loading} />

              <Card>
                <CardHeader>
                  <CardTitle>Invitation History</CardTitle>
                  <CardDescription>All sent invitations and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <InvitesTable
                    invites={invites}
                    loading={loading}
                    onResend={handleResendInvite}
                    onCancel={handleCancelInvite}
                    showAllStatuses
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Modals */}
      <InviteModal
        open={inviteModalOpen}
        onOpenChange={setInviteModalOpen}
        onSubmit={handleSendInvite}
      />

      <PasswordConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="This action cannot be undone. This will permanently delete your organization account."
        confirmText="Delete Account"
        variant="destructive"
      >
        {stats && stats.totalMembers > 0 && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-md">
            <p className="text-amber-600 text-sm">
              <strong>Warning:</strong> You have {stats.totalMembers} member companies.
              They will be removed from your organization.
            </p>
          </div>
        )}
      </PasswordConfirmModal>

      <OrganizationBottomNav />
    </div>
  );
}