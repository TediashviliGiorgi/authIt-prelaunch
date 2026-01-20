import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useDashboardTemplate } from '@/contexts/DashboardTemplateContext';
import { DashboardHeader } from './DashboardHeader';
import { DashboardLeftSidebar } from './DashboardLeftSidebar';
import { DashboardRightSidebar } from './DashboardRightSidebar';
import { DashboardTerminal } from '@/components/dashboard/DashboardTerminal';
import { EmailVerificationBanner } from '@/components/auth/EmailVerificationBanner';
import { DashboardOverlay } from '@/components/dashboard/DashboardOverlay';
import { MobileDashboard } from '@/components/dashboard/MobileDashboard';
import { BottomNav } from '@/components/layout/BottomNav';
import { authService } from '@/services/authService';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen,
  Terminal,
  ChevronUp,
  LogOut,
  Shield,
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const systemStatus = {
  database: { status: 'online', latency: '12ms', connections: 847 },
  api: { status: 'online', requests: '2.4M/day', uptime: '99.97%' },
};

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { template } = useDashboardTemplate();
  const location = useLocation();
  const [resendLoading, setResendLoading] = useState(false);

  // ==========================================
  // SIDEBAR COLLAPSE STATE
  // ==========================================
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  
  // ==========================================
  // TERMINAL STATE
  // ==========================================
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(250);

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

  // ==========================================
  // MOBILE LAYOUT
  // ==========================================
  if (isMobile || template === 'mobile') {
    const isExactDashboard = location.pathname === '/dashboard';
    
    return (
      <>
        <div className="min-h-screen bg-background pb-20">
          {/* Mobile Header - Only show on subpages */}
          {!isExactDashboard && (
            <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
              <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="font-semibold">AuthIt</span>
                </div>
                <div className="flex items-center gap-1">
                  <LanguageSelector />
                  <ThemeSwitcher />
                  <Button variant="ghost" size="icon" onClick={logout}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>
          )}

          {/* Email Verification Banner */}
          {user && !user.isEmailVerified && (
            <div className="container mx-auto px-4 pt-4">
              <EmailVerificationBanner userEmail={user.email} />
            </div>
          )}
          
          {/* Content */}
          <div className={user && !user.isEmailVerified ? 'blur-sm pointer-events-none' : ''}>
            {isExactDashboard ? (
              <MobileDashboard />
            ) : (
              <main>
                <Outlet />
              </main>
            )}
          </div>

          {/* Dashboard Overlay for unverified users */}
          {user && !user.isEmailVerified && (
            <DashboardOverlay
              userEmail={user.email}
              onResendEmail={handleResendEmail}
              isResending={resendLoading}
            />
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </>
    );
  }

  // ==========================================
  // DESKTOP LAYOUT - True App Shell Layout
  // ==========================================
  return (
    <>
      <div className="fixed inset-0 flex flex-col bg-background text-foreground text-xs font-mono">
        
        {/* Email Verification Banner */}
        {user && !user.isEmailVerified && (
          <div className="px-4 pt-2 shrink-0">
            <EmailVerificationBanner userEmail={user.email} />
          </div>
        )}

        {/* Main Content Wrapper */}
        <div className={`flex-1 flex flex-col overflow-hidden ${user && !user.isEmailVerified ? 'blur-sm pointer-events-none select-none' : ''}`}>
          
          {/* ==========================================
              HEADER + NAV BAR
              ========================================== */}
          <div className="shrink-0">
            <DashboardHeader />
          </div>

          {/* ==========================================
              MIDDLE SECTION
              ========================================== */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Sidebar Toggle Button (when collapsed) */}
            {!leftSidebarOpen && (
              <div className="shrink-0 w-10 border-r border-border flex flex-col items-center py-2 bg-card/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setLeftSidebarOpen(true)}
                  title="Open Left Sidebar"
                >
                  <PanelLeftOpen className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Left Sidebar */}
            <aside 
              className={`
                shrink-0 border-r border-border overflow-y-auto bg-card/30
                transition-all duration-300 ease-in-out
                ${leftSidebarOpen ? 'w-56' : 'w-0 overflow-hidden'}
              `}
            >
              {leftSidebarOpen && (
                <DashboardLeftSidebar onCollapse={() => setLeftSidebarOpen(false)} />
              )}
            </aside>

            {/* ==========================================
                MAIN CONTENT - Only This Scrolls!
                ========================================== */}
            <main className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </main>

            {/* Right Sidebar */}
            <aside 
              className={`
                shrink-0 border-l border-border overflow-y-auto bg-card/30
                transition-all duration-300 ease-in-out
                ${rightSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}
              `}
            >
              {rightSidebarOpen && (
                <DashboardRightSidebar onCollapse={() => setRightSidebarOpen(false)} />
              )}
            </aside>

            {/* Right Sidebar Toggle Button (when collapsed) */}
            {!rightSidebarOpen && (
              <div className="shrink-0 w-10 border-l border-border flex flex-col items-center py-2 bg-card/50">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setRightSidebarOpen(true)}
                  title="Open Right Sidebar"
                >
                  <PanelRightOpen className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* ==========================================
              TERMINAL PANEL
              ========================================== */}
          <DashboardTerminal 
            isOpen={terminalOpen}
            onToggle={() => setTerminalOpen(!terminalOpen)}
            height={terminalHeight}
            onHeightChange={setTerminalHeight}
          />

          {/* ==========================================
              FOOTER / STATUS BAR
              ========================================== */}
          <footer className="shrink-0 h-6 bg-card border-t border-border px-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <div className="flex items-center gap-4">
              {/* Terminal Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className={`h-5 px-2 gap-1 text-[10px] ${terminalOpen ? 'text-primary' : ''}`}
                onClick={() => setTerminalOpen(!terminalOpen)}
              >
                <Terminal className="h-3 w-3" />
                Terminal
                <ChevronUp className={`h-3 w-3 transition-transform ${terminalOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                System Online
              </span>
              <span>Database: {systemStatus.database.latency}</span>
              <span>API: {systemStatus.api.uptime}</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Sidebar Toggles */}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                title="Toggle Left Sidebar"
              >
                {leftSidebarOpen ? <PanelLeftClose className="h-3 w-3" /> : <PanelLeftOpen className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 px-1"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                title="Toggle Right Sidebar"
              >
                {rightSidebarOpen ? <PanelRightClose className="h-3 w-3" /> : <PanelRightOpen className="h-3 w-3" />}
              </Button>
              
              <span>Session: {user?.email || 'admin@company.com'}</span>
              <span>AuthIt Enterprise v3.2.1</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Dashboard Overlay */}
      {user && !user.isEmailVerified && (
        <DashboardOverlay
          userEmail={user.email}
          onResendEmail={handleResendEmail}
          isResending={resendLoading}
        />
      )}
    </>
  );
}