import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Shield, LogOut, QrCode, Package, BarChart3, Settings, Plus, FileText,
  Wine, Layers,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TemplateSwitcher } from '@/components/dashboard/TemplateSwitcher';
import { BatchStatistics } from '@/components/dashboard/BatchStatistics';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { SecurityOverview } from '@/components/dashboard/SecurityOverview';
import { useState } from 'react';
import { getUserDisplayName } from '@/types/auth';

// Email Verification Components
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';
import { DashboardOverlay } from '@/components/dashboard/DashboardOverlay';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';

export function MobileDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();


  // Email Verification State
  const [resendLoading, setResendLoading] = useState(false);

  // Handle Resend Email
  const handleResendEmail = async () => {
    if (!user?.email) return;

    try {
      setResendLoading(true);
      await authService.resendVerificationEmail(user.email);

      toast({
        title: 'Email Sent!',
        description: 'Verification email has been sent. Please check your inbox.',
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Failed to send email',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Email Verification Banner */}
      {user && !user.isEmailVerified && (
        <div className="container mx-auto px-4 pt-4">
          <EmailVerificationBanner userEmail={user.email} />
        </div>
      )}

      {/* Wrap all content with blur when email not verified */}
      <div className={user && !user.isEmailVerified ? 'blur-sm pointer-events-none' : ''}>

        {/* Header with Glassmorphism */}
        <header className="glass-header sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-foreground">
                    AuthIt
                  </h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    Brand Authentication Platform
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TemplateSwitcher />
                <LanguageSelector />
                <ThemeSwitcher />
                {!isMobile && (
                  <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="glass-button"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 page-transition">

          {/* Welcome Section */}
          <div className="mb-8 slide-up">
            <h2 className="text-3xl font-bold mb-2">
              Welcome, {user ? getUserDisplayName(user) : 'Company'}!
            </h2>
            <p className="text-muted-foreground">
              Manage your product authentication and brand protection
            </p>
          </div>

          {/* Batch Statistics */}
          <BatchStatistics />

          {/* ==========================================
              NEW: Product Catalog Section
              ========================================== */}
          <section className="mb-8 section-fade-in">
            <h3 className="text-xl font-bold mb-4 text-muted-foreground">Product Catalog</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card: Manage Brands */}
              <Card className="glass-card stagger-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-500/10 flex items-center justify-center">
                      <Layers className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle>Brands</CardTitle>
                      <CardDescription>
                        Manage your wine brands
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create and manage your brand portfolio with logos, stories, and awards.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 shadow-lg"
                      onClick={() => navigate('/dashboard/brands/create')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Brand
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 glass-button"
                      onClick={() => navigate('/dashboard/brands')}
                    >
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Card: Manage Products */}
              <Card className="glass-card stagger-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                      <Wine className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Products</CardTitle>
                      <CardDescription>
                        Your product catalog
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Define your products once, then create batches with inherited settings.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 shadow-lg"
                      onClick={() => navigate('/dashboard/products/create')}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New Product
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 glass-button"
                      onClick={() => navigate('/dashboard/products')}
                    >
                      View All
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </section>

          {/* ==========================================
              Batch Production Section
              ========================================== */}
          <section className="mb-8 section-fade-in">
            <h3 className="text-xl font-bold mb-4 text-muted-foreground">Batch Production</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1: Create Batch */}
              <Card className="glass-card border-2 border-primary/30 shadow-xl stagger-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Plus className="w-6 h-6 text-primary icon-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Create Batch</CardTitle>
                      <CardDescription>
                        Generate authentication codes
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a new product batch with our Dual QR system: visible QR for marketing + hidden QR under cork for security.
                  </p>
                  <Button
                    className="w-full shadow-lg"
                    onClick={() => navigate('/dashboard/batches/create')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Batch
                  </Button>
                </CardContent>
              </Card>

              {/* Card 2: Manage Batches */}
              <Card className="glass-card stagger-fade-in">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <Package className="w-6 h-6 text-primary icon-primary" />
                    </div>
                    <div>
                      <CardTitle>Manage Batches</CardTitle>
                      <CardDescription>
                        View all product batches
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    View and manage all your product batches with Dual QR authentication.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full glass-button"
                    onClick={() => navigate('/dashboard/batches')}
                  >
                    View All Batches
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Analytics and Security Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="stagger-fade-in">
              <AnalyticsOverview />
            </div>
            <div className="stagger-fade-in">
              <SecurityOverview />
            </div>
          </div>

          {/* Advanced Tools Section */}
          <Separator className="my-8" />

          <section className="mb-8 section-fade-in">
            <h3 className="text-xl font-bold mb-4 text-muted-foreground">Advanced Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Browse QR Codes */}
              <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/batches')}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <QrCode className="h-5 w-5 icon-primary" />
                    Browse QR Codes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    Search and monitor all QR codes across batches
                  </p>
                  <Button variant="ghost" size="sm" className="w-full glass-button">
                    Browse Codes
                  </Button>
                </CardContent>
              </Card>

              {/* Verification History */}
              <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/security')}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-5 w-5 icon-primary" />
                    Verification History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    View all security QR verifications
                  </p>
                  <Button variant="ghost" size="sm" className="w-full glass-button">
                    View History
                  </Button>
                </CardContent>
              </Card>

              {/* Reports */}
              <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/analytics')}>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-5 w-5 icon-primary" />
                    Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    Generate detailed reports
                  </p>
                  <Button variant="ghost" size="sm" className="w-full glass-button">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Getting Started Guide */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle>Getting Started with AuthIt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Create Your Brand</h4>
                  <p className="text-sm text-muted-foreground">
                    Set up your brand with logo, story, and contact information.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Add Your Products</h4>
                  <p className="text-sm text-muted-foreground">
                    Define your wine products with characteristics, pairing suggestions, and QR settings.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Create Production Batches</h4>
                  <p className="text-sm text-muted-foreground">
                    Select a product and create batches with Dual QR authentication codes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-medium mb-1">Monitor & Protect</h4>
                  <p className="text-sm text-muted-foreground">
                    Track scans and verifications to protect your brand from counterfeiting.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Dashboard Overlay for Unverified Users */}
      {user && !user.isEmailVerified && (
        <DashboardOverlay
          userEmail={user.email}
          onResendEmail={handleResendEmail}
          isResending={resendLoading}
        />
      )}
    </div>
  );
}