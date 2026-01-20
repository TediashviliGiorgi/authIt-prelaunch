import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Languages, 
  FileText,
  Smartphone,
  QrCode,
  Shield,
  Zap,
  Clock,
  DollarSign,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

// ==========================================
// E-LABELING SOLUTION PAGE
// ==========================================
const ELabelingPage = () => {
  const features = [
    {
      icon: Languages,
      title: '23+ Languages',
      description: 'Auto-translate your labels to meet local market requirements across the EU and beyond.',
    },
    {
      icon: FileText,
      title: 'Full Compliance',
      description: 'EU Regulation 2019/787 and 1169/2011 compliant. Always up-to-date with regulatory changes.',
    },
    {
      icon: QrCode,
      title: 'Smart QR Codes',
      description: 'Generate scannable QR codes that link directly to your digital labels.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Beautiful, responsive labels optimized for any device your customers use.',
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Update your labels in real-time. No reprinting, no waste, no delays.',
    },
    {
      icon: Globe,
      title: 'GS1 Ready',
      description: 'Built-in GS1 Digital Link support for global interoperability.',
    },
  ];

  const complianceItems = [
    'Nutritional information (kcal, fats, carbs, proteins)',
    'Full ingredients list with allergen highlighting',
    'Sulfite and allergen warnings',
    'Producer/Importer information',
    'Country of origin',
    'Alcohol content by volume',
    'Lot/Batch number tracking',
    'Responsible drinking messages',
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Product',
      description: 'Enter your wine details, ingredients, and nutritional information in our intuitive dashboard.',
    },
    {
      number: '02',
      title: 'Generate E-Label',
      description: 'Our system automatically formats everything to EU compliance standards.',
    },
    {
      number: '03',
      title: 'Get Your QR Code',
      description: 'Download the QR code and add it to your physical label.',
    },
    {
      number: '04',
      title: 'Go Live',
      description: 'Consumers scan and instantly access your compliant digital label in their language.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="E-Label Studio - Free EU Compliant Digital Labels | AuthIt"
        description="Create EU-compliant digital wine labels for free. Support for 23+ languages, nutritional info, allergens, and full regulatory compliance."
        keywords="e-label, EU wine labeling, digital label, wine compliance, 2019/787, 1169/2011, QR code label"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-background dark:from-emerald-950/20 dark:to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-emerald-500 text-white mb-6">
                100% FREE — No Limits, No Catches
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                E-Label Studio
                <span className="block text-emerald-600 dark:text-emerald-400">
                  EU Compliance Made Simple
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Create beautiful, compliant digital wine labels in minutes. 
                Full EU 2019/787 & 1169/2011 compliance, 23+ languages, zero cost.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-emerald-600 hover:bg-emerald-700">
                    Start Creating — It's Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    <QrCode className="h-5 w-5" />
                    See Demo Label
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Unlimited labels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Forever free</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full max-w-md">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-primary/20 rounded-3xl blur-2xl" />
                <Card className="relative bg-background/80 backdrop-blur border-2 border-emerald-500/20">
                  <CardHeader className="text-center pb-2">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                      <Tag className="h-8 w-8 text-emerald-600" />
                    </div>
                    <CardTitle className="text-lg">Saperavi Reserve 2021</CardTitle>
                    <CardDescription>Digital E-Label Preview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-muted-foreground text-xs">Energy</div>
                        <div className="font-semibold">83 kcal/100ml</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-muted-foreground text-xs">Alcohol</div>
                        <div className="font-semibold">13.5% vol</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-muted-foreground text-xs">Carbs</div>
                        <div className="font-semibold">2.6g/100ml</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <div className="text-muted-foreground text-xs">Sugars</div>
                        <div className="font-semibold">0.2g/100ml</div>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm font-medium">
                        <AlertTriangle className="h-4 w-4" />
                        Contains Sulfites
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {['🇬🇧', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸', '+18'].map((flag, i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
                          {flag}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">The Problem</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            EU Compliance Shouldn't Cost a Fortune
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">$5,000+</div>
                <CardTitle className="text-base">Typical Software Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Most e-labeling solutions charge thousands per year
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">3-6 mo</div>
                <CardTitle className="text-base">Implementation Time</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complex integrations delay your market entry
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">23+</div>
                <CardTitle className="text-base">Languages Required</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manual translation is expensive and error-prone
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4 border-emerald-500 text-emerald-600">Our Solution</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            E-Label Studio: <span className="text-emerald-600">Free Forever</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-4">
            We believe compliance shouldn't be a privilege. That's why E-Label Studio is completely free.
          </p>
          <p className="text-muted-foreground">
            No trial periods. No hidden fees. No limits on labels or products.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Everything You Need
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Checklist */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Compliance</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Full EU Regulatory Compliance
              </h2>
              <p className="text-muted-foreground mb-8">
                Every label you create automatically includes all required information 
                for EU wine labeling regulations.
              </p>
              <ul className="space-y-3">
                {complianceItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-primary/10 rounded-2xl" />
              <Card className="relative">
                <CardHeader className="text-center">
                  <Shield className="h-16 w-16 mx-auto text-emerald-600 mb-4" />
                  <CardTitle>Regulation Ready</CardTitle>
                  <CardDescription>
                    Automatically compliant with EU 2019/787 & 1169/2011
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2 justify-center">
                  {['2019/787', '1169/2011', 'GS1', 'DPP'].map((reg) => (
                    <Badge key={reg} variant="secondary">{reg}</Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              From Zero to Compliant in Minutes
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-emerald-500/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-8 h-0.5 bg-emerald-500/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Free */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">Why Free?</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Our Mission: Democratize Compliance
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We believe small winemakers in Kakheti deserve the same access to EU markets 
            as multinational corporations. E-Label is our gift to the industry.
          </p>
          <Card className="bg-slate-900 dark:bg-slate-800 text-white p-8">
            <blockquote className="text-lg italic mb-4">
              "Compliance shouldn't be a barrier to market access. 
              It should be a bridge."
            </blockquote>
            <p className="text-emerald-400 font-semibold">— AuthIt Team</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-emerald-600 dark:bg-emerald-700">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready to Create Your First E-Label?
          </h2>
          <p className="text-lg text-emerald-100 mb-8 max-w-xl mx-auto">
            Join hundreds of winemakers already using E-Label Studio. 
            It takes less than 5 minutes to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                Talk to Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default ELabelingPage;