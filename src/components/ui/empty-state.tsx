import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES
// ==========================================

export type EmptyStateVariant = 'default' | 'search' | 'dependency' | 'error';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  icon?: LucideIcon;
}

interface EmptyStateProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Main title */
  title: string;
  /** Description text */
  description: string;
  /** Primary action button */
  action?: EmptyStateAction;
  /** Secondary action button (e.g., "Clear Filters") */
  secondaryAction?: EmptyStateAction;
  /** Helpful tip shown below actions */
  tip?: string;
  /** Visual variant */
  variant?: EmptyStateVariant;
  /** Additional content */
  children?: ReactNode;
  /** Custom className */
  className?: string;
  /** Compact mode for inline usage */
  compact?: boolean;
}

// ==========================================
// VARIANT STYLES
// ==========================================

const variantStyles: Record<EmptyStateVariant, {
  iconBg: string;
  iconColor: string;
}> = {
  default: {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  search: {
    iconBg: 'bg-muted',
    iconColor: 'text-muted-foreground',
  },
  dependency: {
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-600',
  },
  error: {
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
};

// ==========================================
// COMPONENT
// ==========================================

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  secondaryAction,
  tip,
  variant = 'default',
  children,
  className,
  compact = false,
}: EmptyStateProps) {
  const styles = variantStyles[variant];
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center animate-in fade-in-50 duration-500",
        compact ? "py-8 px-4" : "py-16 px-6",
        className
      )}
    >
      {/* Icon */}
      <div 
        className={cn(
          "rounded-full flex items-center justify-center mb-6",
          styles.iconBg,
          compact ? "p-4" : "p-6"
        )}
      >
        <Icon 
          className={cn(
            styles.iconColor,
            compact ? "h-8 w-8" : "h-12 w-12"
          )} 
        />
      </div>
      
      {/* Title */}
      <h3 
        className={cn(
          "font-semibold mb-2",
          compact ? "text-base" : "text-xl"
        )}
      >
        {title}
      </h3>
      
      {/* Description */}
      <p 
        className={cn(
          "text-muted-foreground max-w-md mb-6",
          compact ? "text-sm" : "text-base"
        )}
      >
        {description}
      </p>
      
      {/* Actions */}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <Button 
              onClick={action.onClick}
              variant={action.variant || 'default'}
              size={compact ? 'sm' : 'default'}
            >
              {action.icon && <action.icon className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick}
              variant={secondaryAction.variant || 'outline'}
              size={compact ? 'sm' : 'default'}
            >
              {secondaryAction.icon && <secondaryAction.icon className="mr-2 h-4 w-4" />}
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
      
      {/* Tip */}
      {tip && (
        <div 
          className={cn(
            "flex items-start gap-2 text-muted-foreground bg-muted/50 rounded-lg max-w-md",
            compact ? "mt-4 p-3 text-xs" : "mt-6 p-4 text-sm"
          )}
        >
          <Lightbulb className={cn("flex-shrink-0 text-amber-500", compact ? "h-3.5 w-3.5 mt-0.5" : "h-4 w-4 mt-0.5")} />
          <span>{tip}</span>
        </div>
      )}
      
      {/* Additional Content */}
      {children}
    </div>
  );
}