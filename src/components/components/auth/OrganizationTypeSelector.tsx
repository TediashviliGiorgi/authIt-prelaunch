import { Network, Handshake, Users2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { OrganizationType } from '@/types/auth';

interface OrganizationTypeSelectorProps {
  value: OrganizationType | undefined;
  onChange: (value: OrganizationType) => void;
  disabled?: boolean;
}

export function OrganizationTypeSelector({ value, onChange, disabled }: OrganizationTypeSelectorProps) {
  const { t } = useTranslation();

  const options: { type: OrganizationType; icon: React.ElementType; titleKey: string; descKey: string }[] = [
    {
      type: 'consortium',
      icon: Network,
      titleKey: 'auth.orgType.consortium',
      descKey: 'auth.orgType.consortiumDesc',
    },
    {
      type: 'association',
      icon: Handshake,
      titleKey: 'auth.orgType.association',
      descKey: 'auth.orgType.associationDesc',
    },
    {
      type: 'cooperative',
      icon: Users2,
      titleKey: 'auth.orgType.cooperative',
      descKey: 'auth.orgType.cooperativeDesc',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => {
        const Icon = option.icon;
        const isSelected = value === option.type;

        return (
          <button
            key={option.type}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.type)}
            className={cn(
              'relative flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200',
              'hover:border-primary/50 hover:bg-primary/5',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isSelected
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/20 bg-background',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Text */}
            <h4
              className={cn(
                'font-medium text-sm mb-0.5 transition-colors text-center',
                isSelected ? 'text-primary' : 'text-foreground'
              )}
            >
              {t(option.titleKey)}
            </h4>
            <p className="text-[10px] text-muted-foreground text-center leading-tight">
              {t(option.descKey)}
            </p>
          </button>
        );
      })}
    </div>
  );
}