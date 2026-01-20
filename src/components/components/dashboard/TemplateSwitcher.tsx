import { useDashboardTemplate, DashboardTemplate } from '@/contexts/DashboardTemplateContext';
import { Monitor, Smartphone, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/useMediaQuery';

// ==========================================
// TEMPLATE OPTIONS
// ==========================================
const templates: { 
  id: DashboardTemplate; 
  name: string; 
  description: string; 
  icon: typeof Monitor 
}[] = [
  {
    id: 'desktop',
    name: 'Desktop',
    description: 'Enterprise interface for desktop',
    icon: Monitor,
  },
  {
    id: 'mobile',
    name: 'Mobile',
    description: 'Simplified mobile-friendly view',
    icon: Smartphone,
  },
];

// ==========================================
// COMPONENT
// ==========================================
export function TemplateSwitcher() {
  const { template, setTemplate } = useDashboardTemplate();
  const isMobile = useIsMobile();
  const currentTemplate = templates.find((t) => t.id === template) || templates[0];

  // ✅ Hide on mobile - no switching allowed
  if (isMobile) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <currentTemplate.icon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentTemplate.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Dashboard View</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {templates.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={template === t.id ? 'bg-accent' : ''}
          >
            <t.icon className="h-4 w-4 mr-2" />
            <div className="flex flex-col flex-1">
              <span className="font-medium">{t.name}</span>
              <span className="text-xs text-muted-foreground">{t.description}</span>
            </div>
            {template === t.id && <Check className="h-4 w-4 ml-2 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}