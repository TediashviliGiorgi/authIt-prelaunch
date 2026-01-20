import { Link } from 'react-router-dom';
import { 
  Shield, 
  QrCode, 
  BarChart3, 
  Globe, 
  CheckCircle2, 
  ArrowRight,
  Tag,
  FileText,
  Bot,
  Lock,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SEO } from '@/components/ui/seo';
import { useTranslation } from 'react-i18next';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Hero } from '@/components/Hero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// ==========================================
// MAIN INDEX PAGE
// ==========================================
const Index = () => {
  const { t } = useTranslation();

  // Scroll animation hooks
  const solutionsSection = useScrollAnimation();
  const manifestoSection = useScrollAnimation();
  const statsSection = useScrollAnimation();
  const finalCTASection = useScrollAnimation();

  // Solutions data
  const solutions = [
    {
      icon: Tag,
      title: 'E-Label Studio',
      description: 'EU-compliant digital labels with multi-language support. Full 2019/787 & 1169/2011 compliance.',
      badge: 'FREE',
      badgeColor: 'bg-emerald-500',
      href: '/solutions/e-labeling',
    },
    {
      icon: Globe,
      title: 'GS1 Digital Link',
      description: 'Standard-compliant product identifiers that work globally with any GS1-enabled system.',
      href: '/solutions/gs1-compliance',
    },
    {
      icon: FileText,
      title: 'DPP Ready',
      description: 'Digital Product Passport infrastructure. Be ready for 2026/27 EU regulations today.',
      href: '/solutions/dpp-ready',
    },
    {
      icon: BarChart3,
      title: 'Supply Chain',
      description: 'Track every scan, map distribution, and manage recalls with precision.',
      href: '/solutions/supply-chain',
    },
    {
      icon: Shield,
      title: 'Gray Market Detection',
      description: 'Automatic alerts when your products appear in unauthorized locations.',
      href: '/solutions/gray-market',
    },
    {
      icon: Bot,
      title: 'AuthIt AI',
      description: 'AI Agent for business insights + AI Sommelier for consumer engagement.',
      badge: 'NEW',
      badgeColor: 'bg-indigo-500',
      href: '/solutions/authit-ai',
    },
  ];

  // Stats data
  const stats = [
    { value: '$2T', label: 'Global counterfeit market', subtext: 'annually' },
    { value: '1M+', label: 'Products protected', subtext: 'and growing' },
    { value: '99.9%', label: 'Uptime guarantee', subtext: 'enterprise-grade' },
    { value: '30¢', label: 'Per bottle cost', subtext: 'at scale' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AuthIt - Brand Authentication & EU Compliance Platform"
        description="Protect your brand with dual QR authentication. Free E-Labeling, GS1 compliance, and Digital Product Passports."
        keywords="brand authentication, anti-counterfeiting, QR codes, E-Label, GS1 Digital Link, DPP, product verification"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero Section */}
      <Hero />

      {/* Solutions Section */}
      <section
        ref={solutionsSection.elementRef}
        className={`py-16 sm:py-20 md:py-32 transition-all duration-700 ${
          solutionsSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4">Solutions</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              From compliance to protection, one platform for all your product authentication needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {solutions.map((solution, index) => (
              <Link key={index} to={solution.href}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <solution.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      {solution.badge && (
                        <Badge className={`${solution.badgeColor} text-white`}>
                          {solution.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                      {solution.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs sm:text-sm">
                      {solution.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto Teaser Section */}
      <section
        ref={manifestoSection.elementRef}
        className={`py-16 sm:py-20 md:py-32 bg-slate-900 dark:bg-slate-950 text-white transition-all duration-700 ${
          manifestoSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Badge variant="outline" className="mb-6 border-slate-600 text-slate-300">
            Our Philosophy
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight">
            ტექნოლოგია რომელიც მუშაობს,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
              არა რომელიც შთაბეჭდილებას ახდენს.
            </span>
          </h2>

          <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-slate-300 mb-8 sm:mb-10">
            <p>
              სანამ სხვები ყიდიან <span className="text-white font-medium">კომპლექსურობას</span> და{' '}
              <span className="text-white font-medium">buzzword-ებს</span>, ჩვენ ვთავაზობთ{' '}
              <span className="text-emerald-400 font-medium">მათემატიკას</span> რომელიც მუშაობს.
            </p>
            <p className="text-sm sm:text-base text-slate-400">
              N → N ეკონომიკა: ფალსიფიკაცია მათემატიკურად წამგებიანი.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/manifesto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-600 text-white hover:bg-slate-800">
                <FileText className="mr-2 h-5 w-5" />
                Read Full Manifesto
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Quote */}
          <div className="mt-12 sm:mt-16 p-4 sm:p-6 rounded-xl bg-slate-800/50 border border-slate-700 max-w-2xl mx-auto">
            <blockquote className="text-sm sm:text-base text-slate-300 italic">
              "ისინი ყიდიან კომპლექსურობას, რადგან კომპლექსურობა ძვირია.
              <br />
              ჩვენ ვთავაზობთ სიმარტივეს, რადგან სიმარტივე მუშაობს."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsSection.elementRef}
        className={`py-16 sm:py-20 md:py-32 transition-all duration-700 ${
          statsSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-medium mb-1">{stat.label}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AuthIt Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Why AuthIt</Badge>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                სიმარტივე &gt; კომპლექსურობა
              </h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <p>
                  დიახ, ჩვენც ვუსმენთ ფიზიკის ლექციებს. დიახ, გვესმის blockchain და 
                  კვანტური კრიპტოგრაფია.
                </p>
                <p>
                  <strong className="text-foreground">და სწორედ ამიტომ ვირჩევთ სიმარტივეს.</strong>
                </p>
                <p>
                  ტექნოლოგია ინსტრუმენტია, არა მიზანი. საუკეთესო ტექნოლოგია ის არის, 
                  რომელიც უხილავია - რომელიც უბრალოდ მუშაობს.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8 space-y-3">
                {[
                  { icon: Lock, text: 'Centralized = Accountable' },
                  { icon: Zap, text: 'Simple = Effective' },
                  { icon: TrendingUp, text: 'Math > Marketing' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-emerald-500/20 rounded-2xl p-6 sm:p-8">
                <div className="bg-background rounded-xl p-4 sm:p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <QrCode className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Dual-QR System</div>
                      <div className="text-sm text-muted-foreground">N → N Economics</div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Visible QR: Marketing & Engagement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Hidden QR: One-time Security Verification</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>Result: Counterfeiting = Mathematically Unprofitable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCTASection.elementRef}
        className={`py-16 sm:py-20 md:py-32 bg-primary text-primary-foreground transition-all duration-700 ${
          finalCTASection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Protect Your Brand?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-8 sm:mb-10 max-w-2xl mx-auto">
            Start with free E-Labels today. Upgrade to full authentication when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8">
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default Index;