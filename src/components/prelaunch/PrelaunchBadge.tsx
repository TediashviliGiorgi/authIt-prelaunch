import { useState, useEffect } from 'react';
import { 
  Rocket, 
  ChevronUp, 
  Construction,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const PrelaunchBadge = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`fixed z-[100] transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'bottom-0 right-0 left-0 top-0 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4' 
          : 'bottom-6 right-6 w-auto'
      }`}
    >
      {/* =========================================================
          MODAL VIEW (Expanded)
         ========================================================= */}
      <div 
        className={`transition-all duration-500 ${
          isExpanded 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-50 translate-y-20 absolute pointer-events-none'
        }`}
      >
        <Card className="w-full max-w-md bg-background border border-primary/20 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500" />
          
          <div className="p-8 text-center space-y-6">
            {/* Simple Icon */}
            <div className="mx-auto w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-2">
              <Construction className="w-8 h-8 text-orange-500" />
            </div>

            {/* Text Content */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">System Under Construction</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You are viewing the <strong className="text-foreground">AuthIt Pre-launch</strong> page. 
                The full platform features and registration will be available soon.
              </p>
            </div>

            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full border border-border">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Launch Target: <span className="text-foreground font-bold ml-1">Q2 2026</span>
              </span>
            </div>

            {/* Close Button */}
            <Button 
              size="lg" 
              className="w-full font-bold mt-4"
              onClick={() => setIsExpanded(false)}
            >
              Got it
            </Button>
          </div>
        </Card>
      </div>

      {/* =========================================================
          BADGE VIEW (Collapsed)
         ========================================================= */}
      <div 
        onClick={() => setIsExpanded(true)}
        className={`cursor-pointer group flex items-center gap-3 bg-background border border-orange-500/30 shadow-2xl rounded-full p-2 pr-5 transition-all duration-500 hover:scale-105 hover:border-orange-500 ${
          !isExpanded 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 absolute pointer-events-none'
        }`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</span>
          <span className="text-xs font-bold text-foreground">Pre-launch</span>
        </div>

        <ChevronUp className="w-4 h-4 text-muted-foreground ml-2 group-hover:text-orange-500 transition-colors" />
      </div>

    </div>
  );
};