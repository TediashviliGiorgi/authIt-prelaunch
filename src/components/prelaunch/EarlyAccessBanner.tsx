import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, User, Phone, Rocket, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const EarlyAccessBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        toast.success("Welcome to the future of authentication! 🚀");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-emerald-500/10 to-primary/10 border-emerald-500/20 text-center animate-fade-in">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">You're on the list!</h3>
          <p className="text-muted-foreground max-w-lg">
            Thank you for joining AuthIt Early Access. We will contact you shortly with your exclusive invitation.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden border-0 shadow-2xl bg-slate-900 text-white max-w-5xl mx-auto">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 p-6 md:p-12 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">Limited Early Access</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Secure Your Spot in the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">
              Future of Authentication
            </span>
          </h2>
          <p className="text-slate-300 text-lg max-w-xl">
            Join leading wineries and producers protecting their brand. Get priority onboarding and exclusive pre-launch pricing.
          </p>
        </div>

        {/* Form */}
        <div className="w-full md:w-[400px] bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input 
                  placeholder="Giorgi Tediashvili" 
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input 
                  type="email" 
                  required
                  placeholder="giorgi@winery.ge" 
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Phone (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                <Input 
                  type="tel"
                  placeholder="+995 555 00 00 00" 
                  className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:opacity-90 text-white font-bold h-12 text-lg shadow-lg shadow-primary/25 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Get Early Access"
              )}
            </Button>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              No credit card required. Unsubscribe anytime.
            </p>
          </form>
        </div>

      </div>
    </Card>
  );
};