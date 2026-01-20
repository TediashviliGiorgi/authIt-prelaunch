import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { 
  Shield, 
  Menu, 
  ChevronRight,
  ChevronDown,
  Tag,
  DollarSign,
  Info,
  Mail,
  LogIn,
  UserPlus,
  FileText,
  Globe,
  Bot,
  Search as SearchIcon,
  Link as LinkIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// ==========================================
// SOLUTIONS DATA
// ==========================================
const solutions = [
  {
    category: 'Compliance',
    items: [
      { 
        label: 'E-Labeling', 
        href: '/solutions/e-labeling', 
        icon: Tag,
        description: 'EU-compliant digital labels',
        badge: 'FREE',
        badgeColor: 'bg-emerald-500',
      },
      { 
        label: 'GS1 Compliance', 
        href: '/solutions/gs1-compliance', 
        icon: LinkIcon,
        description: 'Digital Link integration',
      },
      { 
        label: 'DPP Ready', 
        href: '/solutions/dpp-ready', 
        icon: FileText,
        description: 'Digital Product Passport',
      },
    ],
  },
  {
    category: 'Security',
    items: [
      { 
        label: 'Supply Chain', 
        href: '/solutions/supply-chain', 
        icon: Globe,
        description: 'Traceability & management',
      },
      { 
        label: 'Gray Market Detection', 
        href: '/solutions/gray-market', 
        icon: SearchIcon,
        description: 'Unauthorized distribution alerts',
      },
    ],
  },
  {
    category: 'Intelligence',
    items: [
      { 
        label: 'AuthIt AI', 
        href: '/solutions/authit-ai', 
        icon: Bot,
        description: 'AI Agent & Sommelier',
      },
    ],
  },
];

// ==========================================
// NAVIGATION LINKS
// ==========================================
const navLinks = [
  { labelKey: 'nav.pricing', href: '/pricing', icon: DollarSign },
  { labelKey: 'nav.manifesto', href: '/manifesto', icon: FileText },
  { labelKey: 'nav.about', href: '/about', icon: Info },
  { labelKey: 'nav.contact', href: '/contact', icon: Mail },
];

// ==========================================
// PUBLIC HEADER COMPONENT
// ==========================================
export function PublicHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;
  const isSolutionsActive = location.pathname.startsWith('/solutions');

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-hover:bg-primary/90 transition-colors">
              <Shield className="h-6 w-6" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold tracking-tight">AuthIt</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            
            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={`text-sm font-medium gap-1 ${
                    isSolutionsActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Solutions
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80">
                {solutions.map((group, idx) => (
                  <div key={group.category}>
                    {idx > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
                      {group.category}
                    </DropdownMenuLabel>
                    {group.items.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link 
                          to={item.href} 
                          className="flex items-start gap-3 p-2 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{item.label}</span>
                              {item.badge && (
                                <Badge className={`${item.badgeColor} text-white text-[10px] px-1.5 py-0`}>
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Regular Nav Links */}
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.labelKey === 'nav.manifesto' ? 'Manifesto' : t(link.labelKey, link.labelKey.split('.')[1])}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <ThemeSwitcher />
            
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                {t('nav.signIn', 'Log in')}
              </Button>
            </Link>
            
            <Link to="/register">
              <Button size="sm" className="gap-2 shadow-lg shadow-primary/20">
                {t('nav.getStarted', 'Get Started')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-1">
            <LanguageSelector />
            <ThemeSwitcher />
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    AuthIt
                  </SheetTitle>
                </SheetHeader>
                
                <div className="mt-6 flex flex-col gap-1">
                  {/* Solutions Section */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider px-3 mb-2">
                      Solutions
                    </p>
                    {solutions.flatMap(group => group.items).map(item => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">{item.label}</span>
                        {item.badge && (
                          <Badge className={`${item.badgeColor} text-white text-[10px] ml-auto`}>
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>

                  <Separator />

                  {/* Other Links */}
                  <div className="mt-4">
                    {navLinks.map(link => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive(link.href)
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'hover:bg-muted'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {link.labelKey === 'nav.manifesto' ? 'Manifesto' : t(link.labelKey, link.labelKey.split('.')[1])}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  <Separator className="my-4" />

                  {/* Auth Buttons */}
                  <div className="flex flex-col gap-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-center gap-2">
                        <LogIn className="h-4 w-4" />
                        {t('nav.signIn', 'Log in')}
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full justify-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        {t('nav.getStarted', 'Get Started')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}