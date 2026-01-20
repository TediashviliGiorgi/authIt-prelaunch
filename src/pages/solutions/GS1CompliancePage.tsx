import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Link as LinkIcon, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Scan,
  Database,
  Smartphone,
  QrCode,
  Shield,
  Zap,
  BarChart3,
  Building2,
  Store,
  Truck,
} from 'lucide-react';

// ==========================================
// GS1 COMPLIANCE SOLUTION PAGE
// ==========================================
const GS1CompliancePage = () => {
  const features = [
    {
      icon: LinkIcon,
      title: 'Digital Link URLs',
      description: 'Generate GS1 compliant Digital Link URLs that encode your GTIN and additional data.',
    },
    {
      icon: QrCode,
      title: '2D Barcode Ready',
      description: 'Create QR codes and Data Matrix barcodes that meet GS1 standards.',
    },
    {
      icon: Database,
      title: 'GTIN Management',
      description: 'Manage all your product identifiers in one place with full traceability.',
    },
    {
      icon: Globe,
      title: 'Global Interoperability',
      description: 'Your codes work with any GS1-enabled system worldwide.',
    },
    {
      icon: Smartphone,
      title: 'Smart Resolving',
      description: 'One code, multiple destinations based on who scans and where.',
    },
    {
      icon: BarChart3,
      title: 'Scan Analytics',
      description: 'Track every scan with location, time, and device data.',
    },
  ];

  const useCases = [
    {
      icon: Store,
      title: 'Retail',
      description: 'Enable checkout scanning while providing rich product information to consumers.',
    },
    {
      icon: Truck,
      title: 'Supply Chain',
      description: 'Track products through every stage from production to consumer.',
    },
    {
      icon: Building2,
      title: 'Regulatory',
      description: 'Meet traceability requirements for food safety and compliance.',
    },
  ];

  const benefits = [
    'One barcode for all use cases (POS, supply chain, consumer)',
    'Future-proof infrastructure for DPP requirements',
    'Reduced labeling complexity and costs',
    'Enhanced consumer engagement through rich content',
    'Real-time visibility across your distribution network',
    'Seamless integration with existing systems',
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="GS1 Digital Link Compliance | AuthIt"
        description="Implement GS1 Digital Link standards for your products. One QR code for retail, supply chain, and consumer engagement."
        keywords="GS1 Digital Link, GTIN, QR code, barcode, product identification, supply chain"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/20 dark:to-background" />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-blue-600 text-white mb-6">
                GS1 Certified Compatible
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                GS1 Digital Link
                <span className="block text-blue-600 dark:text-blue-400">
                  One Code, Unlimited Possibilities
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Implement the global standard for product identification. 
                Connect your physical products to unlimited digital experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    Get Started
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-background/80 backdrop-blur border-2 border-blue-500/20">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                    <div className="w-32 h-32 mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMSAyMSI+PHBhdGggZD0iTTAgMGg3djdIMHptMiAyaDN2M0gyem04LTJoN3Y3aC03em0yIDJoM3YzaC0zem0tMTAgOGg3djdIMHptMiAyaDN2M0gyem04LTJoMnYyaC0yem0wIDRoMnYyaC0yem0yLTRoMnYyaC0yem0yIDBoMnYyaC0yem0wIDRoMnYyaC0yem0yLTRoMnY2aC0yem0tNCAwaDJ2MmgtMnptMCAyaDJ2MmgtMnoiLz48L3N2Zz4=')] bg-contain" />
                  </div>
                  <CardTitle className="text-lg">GS1 Digital Link</CardTitle>
                  <code className="text-xs text-muted-foreground block mt-2 p-2 bg-muted rounded">
                    https://id.authit.io/01/09501234567890
                  </code>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="text-muted-foreground">GTIN</span>
                      <span className="font-mono">9501234567890</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="text-muted-foreground">Batch/Lot</span>
                      <span className="font-mono">LOT2024A</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-muted/50">
                      <span className="text-muted-foreground">Serial</span>
                      <span className="font-mono">ABC123456</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is GS1 Digital Link */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">The Standard</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            What is GS1 Digital Link?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            GS1 Digital Link is the global standard that transforms traditional barcodes into 
            gateways to rich digital content. One code serves retail checkout, supply chain tracking, 
            and consumer engagement simultaneously.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mt-10">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <useCase.icon className="h-7 w-7 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Complete GS1 Implementation
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg hover:border-blue-500/50 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
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

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Benefits</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Why Implement GS1 Digital Link?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-slate-900 dark:bg-slate-800 text-white p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">2027</div>
                  <p className="text-slate-300 mb-4">
                    EU requires 2D barcodes with Digital Link capability for many product categories
                  </p>
                  <Badge className="bg-blue-500">Be Ready Today</Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Simple Integration Process
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: '1', title: 'Register Your GTINs', desc: 'Import your existing product identifiers or create new ones' },
              { step: '2', title: 'Configure Destinations', desc: 'Set up where different scanners should be directed' },
              { step: '3', title: 'Generate Codes', desc: 'Create GS1 compliant QR codes and Data Matrix barcodes' },
              { step: '4', title: 'Deploy & Track', desc: 'Apply to products and monitor scans in real-time' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Globe className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Ready for the Global Standard?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
            Start implementing GS1 Digital Link today and future-proof your product identification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default GS1CompliancePage;