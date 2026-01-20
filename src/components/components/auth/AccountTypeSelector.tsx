import { Building2, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { AccountType } from '@/types/auth';

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
  disabled?: boolean;
}

export function AccountTypeSelector({ value, onChange, disabled }: AccountTypeSelectorProps) {
  const { t } = useTranslation();

  const options: { type: AccountType; icon: React.ElementType; titleKey: string; descKey: string }[] = [
    {
      type: 'company',
      icon: Building2,
      titleKey: 'auth.accountType.company',
      descKey: 'auth.accountType.companyDesc',
    },
    {
      type: 'organization',
      icon: Users,
      titleKey: 'auth.accountType.organization',
      descKey: 'auth.accountType.organizationDesc',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
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
              'relative flex flex-col items-center p-6 rounded-xl border-2 transition-all duration-200',
              'hover:border-primary/50 hover:bg-primary/5',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              isSelected
                ? 'border-primary bg-primary/10 shadow-md'
                : 'border-muted-foreground/20 bg-background',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Selected Indicator */}
            {isSelected && (
              <div className="absolute top-3 right-3">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}

            {/* Icon */}
            <div
              className={cn(
                'w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors',
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              <Icon className="w-7 h-7" />
            </div>

            {/* Text */}
            <h3
              className={cn(
                'font-semibold text-base mb-1 transition-colors',
                isSelected ? 'text-primary' : 'text-foreground'
              )}
            >
              {t(option.titleKey)}
            </h3>
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              {t(option.descKey)}
            </p>
          </button>
        );
      })}
    </div>
  );
}