import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TemplateSwitcher } from '@/components/dashboard/TemplateSwitcher';
import {
  Shield,
  LogOut,
  Package,
  BarChart3,
  Settings,
  Plus,
  Clock,
  Grid3X3,
  Search,
  Wine,
  Layers,
  FileText,
  Bell,
  Tag,
} from 'lucide-react';

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // HELPER: Check if route is active
  // ==========================================
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ==========================================
          HEADER
          ========================================== */}
      <header className="h-10 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm">AUTHIT</span>
            <Badge variant="outline" className="h-4 text-[10px]">v1.0.0</Badge>
            <span className="text-muted-foreground">| Enterprise Edition</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Session: {user?.email || 'ADMIN'}</span>
          <span className="text-muted-foreground">|</span>
          <Clock className="h-3 w-3" />
          <span>{new Date().toLocaleTimeString()}</span>
          <Separator orientation="vertical" className="h-4" />
          <TemplateSwitcher />
          <LanguageSelector />
          <ThemeSwitcher />
          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={logout}>
            <LogOut className="h-3 w-3 mr-1" />
            LOGOUT
          </Button>
        </div>
      </header>

      {/* ==========================================
          NAVIGATION BAR
          ========================================== */}
      <nav className="h-8 border-b border-border bg-muted/30 flex items-center px-4 gap-1">
        {/* E-Label Studio - FIRST */}
        <Button 
          variant={isActive('/dashboard/elabel-studio') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/elabel-studio')}
        >
          <Tag className="h-3 w-3" /> 
          E-Label
          <Badge className="ml-1 h-4 px-1 text-[9px] bg-emerald-500 hover:bg-emerald-500 text-white border-0">
            FREE
          </Badge>
        </Button>

        <Separator orientation="vertical" className="h-4 mx-1" />

        {/* Dashboard Home */}
        <Button 
          variant={isActive('/dashboard') && location.pathname === '/dashboard' ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard')}
        >
          <Grid3X3 className="h-3 w-3" /> Dashboard
        </Button>
        
        {/* Brands */}
        <Button 
          variant={isActive('/dashboard/brands') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/brands')}
        >
          <Layers className="h-3 w-3" /> Brands
        </Button>
        
        {/* Products */}
        <Button 
          variant={isActive('/dashboard/products') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/products')}
        >
          <Wine className="h-3 w-3" /> Products
        </Button>
        
        {/* Batches */}
        <Button 
          variant={isActive('/dashboard/batches') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/batches')}
        >
          <Package className="h-3 w-3" /> Batches
        </Button>
        
        {/* New Batch */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/batches/create')}
        >
          <Plus className="h-3 w-3" /> New Batch
        </Button>
        
        {/* Analytics */}
        <Button 
          variant={isActive('/dashboard/analytics') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/analytics')}
        >
          <BarChart3 className="h-3 w-3" /> Analytics
        </Button>
        
        {/* Security */}
        <Button 
          variant={isActive('/dashboard/security') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/security')}
        >
          <Shield className="h-3 w-3" /> Security
        </Button>
        
        {/* Documents */}
        <Button 
          variant={isActive('/dashboard/documents') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/documents')}
        >
          <FileText className="h-3 w-3" /> Documents
        </Button>
        
        {/* Notifications */}
        <Button 
          variant={isActive('/dashboard/notifications') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/notifications')}
        >
          <Bell className="h-3 w-3" /> Notifications
        </Button>
        
        {/* Settings */}
        <Button 
          variant={isActive('/dashboard/settings') ? 'secondary' : 'ghost'} 
          size="sm" 
          className="h-6 text-xs gap-1" 
          onClick={() => navigate('/dashboard/settings')}
        >
          <Settings className="h-3 w-3" /> Settings
        </Button>
        
        <div className="flex-1" />
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input 
            placeholder="Search batches, codes..." 
            className="h-6 text-xs pl-7 w-48"
          />
        </div>
      </nav>
    </>
  );
}