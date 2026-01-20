import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  Truck,
  Package,
  Scan,
  BarChart3,
  Clock,
  AlertTriangle,
  Shield,
  Eye,
  History,
  Share2,
} from 'lucide-react';

// ==========================================
// SUPPLY CHAIN SOLUTION PAGE
// ==========================================
const SupplyChainPage = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-Time Location',
      description: 'Track every product through your distribution network with GPS-enabled scans.',
    },
    {
      icon: History,
      title: 'Complete History',
      description: 'Immutable record of every touchpoint from production to consumer.',
    },
    {
      icon: Scan,
      title: 'Scan Events',
      description: 'Capture who scanned what, when, and where across your supply chain.',
    },
    {
      icon: AlertTriangle,
      title: 'Anomaly Detection',
      description: 'AI-powered alerts when products deviate from expected routes.',
    },
    {
      icon: Share2,
      title: 'Partner Access',
      description: 'Securely share tracking data with distributors and retailers.',
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Visualize flow, bottlenecks, and distribution patterns.',
    },
  ];

  const journeySteps = [
    { icon: Package, label: 'Production', sublabel: 'Georgia', time: 'Jan 15, 2024' },
    { icon: Truck, label: 'In Transit', sublabel: 'To Hamburg', time: 'Jan 18, 2024' },
    { icon: MapPin, label: 'Warehouse', sublabel: 'Hamburg, DE', time: 'Jan 22, 2024' },
    { icon: Truck, label: 'Distribution', sublabel: 'To Paris', time: 'Jan 25, 2024' },
    { icon: Eye, label: 'Retail', sublabel: 'Paris, FR', time: 'Jan 28, 2024' },
  ];

  const useCases = [
    {
      title: 'Food Safety Compliance',
      description: 'Meet FDA, EU, and local food safety traceability requirements with one-click recall capability.',
    },
    {
      title: 'Temperature-Sensitive Products',
      description: 'Monitor cold chain integrity with IoT integration and breach alerts.',
    },
    {
      title: 'High-Value Goods',
      description: 'Protect luxury items with chain-of-custody verification.',
    },
    {
      title: 'Multi-Tier Distribution',
      description: 'Maintain visibility across complex distribution networks.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Supply Chain Traceability | AuthIt"
        description="End-to-end supply chain visibility. Track products from production to consumer with real-time location and complete chain of custody."
        keywords="supply chain traceability, track and trace, logistics tracking, chain of custody, product tracking"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-background dark:from-cyan-950/20 dark:to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-cyan-600 text-white mb-6">
                End-to-End Visibility
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Supply Chain
                <span className="block text-cyan-600 dark:text-cyan-400">
                  Traceability
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Know exactly where every product is, where it's been, 
                and who has handled it. Complete visibility from factory to consumer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-cyan-600 hover:bg-cyan-700">
                    Start Tracking
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    See Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual - Live Journey */}
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-background/80 backdrop-blur border-2 border-cyan-500/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Product Journey</CardTitle>
                    <Badge variant="outline" className="text-xs">Live</Badge>
                  </div>
                  <CardDescription>Batch #SAP-2024-0892</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {journeySteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === journeySteps.length - 1 
                              ? 'bg-cyan-500 text-white' 
                              : 'bg-cyan-500/10 text-cyan-600'
                          }`}>
                            <step.icon className="h-5 w-5" />
                          </div>
                          {index < journeySteps.length - 1 && (
                            <div className="absolute left-5 top-10 w-0.5 h-8 bg-cyan-200 dark:bg-cyan-800" />
                          )}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{step.label}</span>
                            <span className="text-xs text-muted-foreground">{step.time}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{step.sublabel}</span>
                        </div>
                        {index === journeySteps.length - 1 && (
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">The Challenge</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Blind Spots Cost Money
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Without proper traceability, you're exposed to product loss, compliance failures, 
            counterfeit infiltration, and inefficient recalls.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">$30B+</div>
                <CardTitle className="text-base">Annual Theft</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Supply chain theft costs in the US alone</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">40%</div>
                <CardTitle className="text-base">Recall Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Average increase without precise traceability</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="text-3xl font-bold text-destructive">72hr</div>
                <CardTitle className="text-base">Typical Delay</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>To locate products during traditional recalls</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Capabilities</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Complete Supply Chain Control
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg hover:border-cyan-500/50 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-cyan-600" />
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

      {/* Use Cases */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Use Cases</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Built for Your Industry
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => (
              <Card key={index}>
                <CardHeader>
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

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Simple Integration, Powerful Results
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              { step: '1', title: 'Tag at Origin', desc: 'Apply unique QR codes during production or at warehouse entry' },
              { step: '2', title: 'Scan at Checkpoints', desc: 'Partners scan products as they move through the supply chain' },
              { step: '3', title: 'Monitor in Real-Time', desc: 'View live location and status of all products on your dashboard' },
              { step: '4', title: 'Act on Alerts', desc: 'Get instant notifications for anomalies, delays, or unauthorized access' },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-6 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold flex-shrink-0">
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

      {/* Recall Feature */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Recall Management</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Surgical Precision Recalls
              </h2>
              <p className="text-muted-foreground mb-6">
                When a recall is necessary, know exactly which products are affected 
                and where they are. Reduce recall scope by 80% with batch-level precision.
              </p>
              <ul className="space-y-3">
                {[
                  'Identify affected products in seconds',
                  'Pinpoint exact locations in your network',
                  'Notify only relevant partners',
                  'Track recall progress in real-time',
                  'Document compliance for regulators',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-slate-900 dark:bg-slate-800 text-white p-6">
                <AlertTriangle className="h-10 w-10 text-amber-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Recall Simulation</h3>
                <p className="text-slate-300 mb-4 text-sm">
                  Batch SAP-2024-0892 flagged for quality issue
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 rounded bg-slate-800">
                    <span className="text-slate-400">Affected Units</span>
                    <span className="font-mono">2,847</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800">
                    <span className="text-slate-400">Located</span>
                    <span className="font-mono text-green-400">2,712 (95%)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-800">
                    <span className="text-slate-400">Time to Locate</span>
                    <span className="font-mono">4 minutes</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-cyan-600 dark:bg-cyan-700">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Globe className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            See Your Entire Supply Chain
          </h2>
          <p className="text-lg text-cyan-100 mb-8 max-w-xl mx-auto">
            Start with full visibility. Make better decisions. Reduce losses.
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
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default SupplyChainPage;