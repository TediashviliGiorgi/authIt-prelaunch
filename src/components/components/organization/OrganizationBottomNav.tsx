import { NavLink } from '@/components/NavLink';
import { Home, Users, Mail, Settings, BarChart3 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const navItems = [
  {
    label: 'Dashboard',
    icon: Home,
    path: '/organization/dashboard',
  },
  {
    label: 'Members',
    icon: Users,
    path: '/organization/members',
  },
  {
    label: 'Invites',
    icon: Mail,
    path: '/organization/invites',
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    path: '/organization/analytics',
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/organization/settings',
  },
];

export function OrganizationBottomNav() {
  const location = useLocation();

  // Only show on organization routes
  if (!location.pathname.startsWith('/organization')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/organization/dashboard' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors hover:bg-muted/50 min-w-[60px]"
                activeClassName="text-primary font-medium"
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}