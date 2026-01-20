import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  QrCode, 
  ShieldAlert, 
  Bot, 
  FileCheck, 
  Globe, 
  Lock,
  Tag,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ==========================================
// HERO COMPONENT
// ==========================================
export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-background">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-primary/10 dark:bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto mb-16">
          
          {/* Compliance Badge */}
          <div className="animate-fade-in inline-flex items-center gap-3 px-4 py-2 rounded-full bg-background border border-border shadow-sm mb-8 hover:border-primary/50 transition-colors cursor-default">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-foreground tracking-wide">GS1 Digital Link Ready</span>
            </div>
            <span className="w-px h-3 bg-border"></span>
            <span className="text-xs font-bold text-foreground tracking-wide">EU DPP Compliant</span>
          </div>

          {/* Heading */}
          <h1 className="animate-fade-in-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
            Next-Gen Brand <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
              Protection & Compliance
            </span>
          </h1>

          {/* Subheading */}
          <p className="animate-fade-in-delay-2 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
            Secure your products with <strong className="text-foreground">Dual-QR technology</strong>. 
            Turn every label into a compliant <strong className="text-foreground">Digital Product Passport</strong> and 
            active defense system against counterfeiting.
          </p>

          {/* E-Label Free Banner */}
          <div className="animate-fade-in-delay-2 mb-8 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col sm:flex-row items-center gap-3">
            <Tag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 text-center sm:text-left">
              E-Label Studio is <strong>FREE forever</strong> — No limits, no catches
            </span>
            <Link to="/solutions/e-labeling">
              <Badge variant="secondary" className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer">
                Learn More →
              </Badge>
            </Link>
          </div>

          {/* CTAs */}
          <div className="animate-fade-in-delay-3 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link to="/register">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                Start Protection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/verify">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto px-8 py-6 text-lg hover:-translate-y-0.5 transition-all"
              >
                <QrCode className="mr-2 h-5 w-5 text-primary" />
                Scan Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Dashboard Mockup */}
        <div className="animate-fade-in-delay-4 relative mt-16 mx-auto max-w-6xl perspective-1200">
          
          {/* Main Dashboard Card */}
          <div className="relative rounded-2xl border border-border/80 bg-background/80 backdrop-blur-xl shadow-2xl overflow-hidden p-1.5 ring-1 ring-border/50 transition-transform duration-700 ease-out hover:shadow-3xl transform-gpu rotate-x-8 hover:rotate-x-0">
            
            {/* Window UI Header */}
            <div className="bg-muted border-b border-border rounded-t-xl h-10 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-mono text-muted-foreground">authit_security_hub_v2.4.0</div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-background p-6 md:p-8 grid grid-cols-12 gap-8 min-h-[500px]">
              
              {/* Sidebar */}
              <div className="hidden md:flex col-span-2 flex-col gap-6 border-r border-border pr-4">
                <div className="space-y-3">
                  <div className="h-2 w-20 bg-muted rounded"></div>
                  <div className="flex items-center gap-3 text-primary bg-primary/10 p-2 rounded-lg">
                    <ShieldAlert className="w-4 h-4" />
                    <span className="text-xs font-bold">Security</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors">
                    <FileCheck className="w-4 h-4" />
                    <span className="text-xs font-medium">Passports</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground p-2 hover:bg-muted rounded-lg transition-colors">
                    <Bot className="w-4 h-4" />
                    <span className="text-xs font-medium">AI Agent</span>
                  </div>
                </div>
              </div>

              {/* Main View */}
              <div className="col-span-12 md:col-span-10">
                {/* Header Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-border pb-6 gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">Saperavi Reserve 2021</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <p className="text-sm text-muted-foreground">Live Protection Active</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Badge variant="outline" className="flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      Dual-QR: Secure
                    </Badge>
                  </div>
                </div>

                {/* Security Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Authentic Verifications</div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">98.8%</div>
                    <div className="text-xs text-muted-foreground mt-1">Last 24 hours</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Passport Views</div>
                    <div className="text-2xl font-bold text-primary">12,450</div>
                    <div className="text-xs text-muted-foreground mt-1">GS1 Digital Link</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-xl border border-border">
                    <div className="text-xs text-muted-foreground mb-1">Threats Blocked</div>
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <div className="text-xs text-muted-foreground mt-1">Action Required</div>
                  </div>
                </div>

                {/* Geo Map Placeholder */}
                <div className="h-48 sm:h-64 bg-muted/30 rounded-xl border border-border relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="text-muted-foreground text-sm font-medium flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Geo-Fencing & Gray Market Monitor
                  </div>
                  
                  {/* Map Nodes */}
                  <div className="absolute top-1/3 left-1/3 flex items-center justify-center">
                    <div className="w-16 h-16 border border-emerald-500/30 rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full relative z-10"></div>
                  </div>
                  <div className="absolute bottom-1/3 right-1/4 flex items-center justify-center">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Alert Card - Gray Market */}
          <div className="absolute -right-4 top-16 md:-right-12 md:top-24 bg-background p-4 rounded-xl shadow-2xl border border-destructive/20 flex items-start gap-4 animate-float max-w-[280px] sm:max-w-[300px] z-20">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-1">
              <ShieldAlert className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-bold text-destructive uppercase tracking-wider">Gray Market Alert</p>
                <span className="text-[10px] text-muted-foreground">2m ago</span>
              </div>
              <p className="text-sm font-semibold leading-tight">
                Batch #8821 (Zone: EU) scanned in <span className="text-amber-600 dark:text-amber-400">Southeast Asia</span>.
              </p>
            </div>
          </div>

          {/* Floating AI Card */}
          <div className="absolute -left-4 bottom-12 md:-left-12 md:bottom-20 bg-slate-900 dark:bg-slate-800 p-4 rounded-xl shadow-2xl flex items-start gap-4 animate-float-reverse max-w-[280px] sm:max-w-[320px] text-white z-20 border border-slate-700">
            <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-indigo-500/30">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider mb-1">AI Sommelier Active</p>
              <div className="bg-slate-800 dark:bg-slate-700 rounded p-2 text-xs text-slate-300 font-mono mb-2">
                "This Saperavi works best with grilled lamb. Decant for 45 mins..."
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] text-slate-400">Consumer viewing Passport</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .perspective-1200 {
          perspective: 1200px;
        }
        .rotate-x-8 {
          transform: rotateX(8deg);
        }
        .hover\\:rotate-x-0:hover {
          transform: rotateX(0deg) translateY(-10px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        .animate-float { 
          animation: float 5s infinite ease-in-out; 
        }
        .animate-float-reverse { 
          animation: float-reverse 6s infinite ease-in-out; 
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fade-in-delay-1 {
          animation: fadeIn 0.6s ease-out 0.1s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-4 {
          animation: fadeIn 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </section>
  );
}