import { NavLink } from '@/components/NavLink';
import { Home, Package, Tag, BarChart3, Menu, Monitor } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Shield, Settings, FileText, Bell, Sparkles, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

/**
 * BottomNav - Mobile navigation for dashboard
 * 
 * Features:
 * - Uses useIsMobile() for proper detection
 * - E-Label Studio shows "Desktop Required" modal
 * - More menu with sheet for additional options
 */

const navItems = [
  {
    labelKey: 'nav.dashboard',
    label: 'Home',
    icon: Home,
    path: '/dashboard',
    exact: true,
  },
  {
    labelKey: 'E-Label',
    label: 'E-Label',
    icon: Tag,
    path: '/dashboard/elabel-studio',
    badge: 'FREE',
    badgeColor: 'bg-emerald-500',
    desktopOnly: true,
  },
  {
    labelKey: 'nav.batches',
    label: 'Batches',
    icon: Package,
    path: '/dashboard/batches',
  },
  {
    labelKey: 'nav.analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/dashboard/analytics',
  },
];

const moreNavItems = [
  { label: 'Brands', icon: Sparkles, path: '/dashboard/brands' },
  { label: 'Products', icon: Wine, path: '/dashboard/products' },
  { label: 'Security', icon: Shield, path: '/dashboard/security' },
  { label: 'Documents', icon: FileText, path: '/dashboard/documents' },
  { label: 'Notifications', icon: Bell, path: '/dashboard/notifications' },
  { label: 'Settings', icon: Settings, path: '/dashboard/settings' },
];

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [moreOpen, setMoreOpen] = useState(false);
  const [desktopOnlyModalOpen, setDesktopOnlyModalOpen] = useState(false);

  // Only show on dashboard-related routes
  const showBottomNav = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/settings');

  // Don't show on desktop
  if (!showBottomNav || !isMobile) return null;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg safe-area-pb">
        <div className="container mx-auto px-2">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = item.exact
                ? location.pathname === item.path
                : location.pathname.startsWith(item.path);

              // Desktop-only items show modal instead of navigating
              if (item.desktopOnly) {
                return (
                  <button
                    key={item.path}
                    onClick={() => setDesktopOnlyModalOpen(true)}
                    className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[56px] relative"
                  >
                    <div className="relative">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      {item.badge && (
                        <span className={`absolute -top-1 -right-2 text-[8px] px-1 rounded ${item.badgeColor} text-white font-bold`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[56px] relative"
                  activeClassName="text-primary font-medium"
                >
                  <div className="relative">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    {item.badge && (
                      <span className={`absolute -top-1 -right-2 text-[8px] px-1 rounded ${item.badgeColor} text-white font-bold`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}

            {/* More Menu */}
            <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[56px]">
                  <Menu className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">More</span>
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto rounded-t-xl">
                <SheetHeader className="text-left pb-4">
                  <SheetTitle>More Options</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-3 pb-6">
                  {moreNavItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMoreOpen(false)}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-colors ${
                          isActive
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <item.icon className="w-6 h-6" />
                        <span className="text-xs font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Desktop-Only Feature Modal */}
      <Dialog open={desktopOnlyModalOpen} onOpenChange={setDesktopOnlyModalOpen}>
        <DialogContent className="max-w-[90vw] sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
              <Monitor className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <DialogTitle className="text-xl">Desktop Required</DialogTitle>
            <DialogDescription className="text-center pt-2">
              E-Label Studio works best on larger screens. Please open AuthIt on a desktop or laptop computer to use this feature.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Tag className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-sm">
                <p className="font-medium">E-Label Studio is FREE</p>
                <p className="text-muted-foreground text-xs">Create EU-compliant digital labels at no cost</p>
              </div>
              <Badge className="bg-emerald-500 text-white ml-auto shrink-0">FREE</Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setDesktopOnlyModalOpen(false)}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};