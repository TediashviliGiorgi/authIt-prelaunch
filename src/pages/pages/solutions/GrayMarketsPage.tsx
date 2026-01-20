import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  MapPin,
  AlertTriangle,
  Shield,
  Bell,
  Globe,
  Target,
  Eye,
  Ban,
  TrendingDown,
  FileWarning,
  Gavel,
} from 'lucide-react';

// ==========================================
// GRAY MARKET DETECTION SOLUTION PAGE
// ==========================================
const GrayMarketPage = () => {
  const alertTypes = [
    {
      icon: MapPin,
      title: 'Geographic Anomaly',
      description: 'Product scanned outside its designated distribution zone.',
      severity: 'high',
    },
    {
      icon: TrendingDown,
      title: 'Price Violation',
      description: 'Product listed below minimum advertised price.',
      severity: 'medium',
    },
    {
      icon: Ban,
      title: 'Unauthorized Seller',
      description: 'Product found on non-authorized marketplace.',
      severity: 'high',
    },
    {
      icon: FileWarning,
      title: 'Warranty Abuse',
      description: 'Multiple warranty claims from single region.',
      severity: 'low',
    },
  ];

  const features = [
    {
      icon: Globe,
      title: 'Geo-Fencing',
      description: 'Define authorized distribution zones and get alerts when products cross boundaries.',
    },
    {
      icon: Eye,
      title: 'Real-Time Monitoring',
      description: 'AI continuously monitors scans and marketplace listings for anomalies.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified immediately when suspicious activity is detected.',
    },
    {
      icon: Target,
      title: 'Precision Targeting',
      description: 'Identify specific batches and distributors involved in diversions.',
    },
    {
      icon: Gavel,
      title: 'Evidence Collection',
      description: 'Automatic documentation for legal action against violators.',
    },
    {
      icon: Shield,
      title: 'Distributor Accountability',
      description: 'Track which channel partners may be enabling gray market flow.',
    },
  ];

  const impacts = [
    { label: 'Revenue Loss', value: '15-30%', description: 'from legitimate channels' },
    { label: 'Brand Damage', value: 'Severe', description: 'inconsistent customer experience' },
    { label: 'Channel Conflict', value: 'High', description: 'authorized partners undercut' },
    { label: 'Warranty Costs', value: '2-3x', description: 'higher for diverted products' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Gray Market Detection | AuthIt"
        description="Detect unauthorized distribution with geo-fencing and AI monitoring. Protect your brand from gray market diversions and parallel imports."
        keywords="gray market detection, parallel imports, unauthorized distribution, geo-fencing, brand protection"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-background dark:from-red-950/20 dark:to-background" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-red-600 text-white mb-6">
                Protect Your Channels
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Gray Market
                <span className="block text-red-600 dark:text-red-400">
                  Detection
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Know instantly when your products appear where they shouldn't. 
                Protect authorized channels and maintain price integrity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-red-600 hover:bg-red-700">
                    Start Monitoring
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    Talk to Expert
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual - Alert Dashboard */}
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-background/80 backdrop-blur border-2 border-red-500/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      Active Alerts
                    </CardTitle>
                    <Badge variant="destructive">4 New</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {alertTypes.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      alert.severity === 'high' 
                        ? 'border-red-500/50 bg-red-500/5' 
                        : alert.severity === 'medium'
                        ? 'border-amber-500/50 bg-amber-500/5'
                        : 'border-border bg-muted/30'
                    }`}>
                      <div className="flex items-start gap-3">
                        <alert.icon className={`h-5 w-5 mt-0.5 ${
                          alert.severity === 'high' 
                            ? 'text-red-500' 
                            : alert.severity === 'medium'
                            ? 'text-amber-500'
                            : 'text-muted-foreground'
                        }`} />
                        <div>
                          <div className="font-medium text-sm">{alert.title}</div>
                          <div className="text-xs text-muted-foreground">{alert.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is Gray Market */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">The Problem</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            Gray Market: The Silent Brand Killer
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gray market goods are genuine products sold through unauthorized channels. 
            While legal, they devastate your brand, channel partners, and bottom line.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {impacts.map((impact, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="pb-2">
                  <div className="text-2xl font-bold text-red-600">{impact.value}</div>
                  <CardTitle className="text-sm">{impact.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs">{impact.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Geo-Fencing in Action
            </h2>
          </div>
          
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Simplified Map Visual */}
              <div className="relative h-80 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                
                {/* EU Zone */}
                <div className="absolute top-1/4 left-1/4 w-48 h-32 rounded-3xl border-2 border-dashed border-green-500/50 bg-green-500/10 flex items-center justify-center">
                  <span className="text-xs text-green-700 dark:text-green-300 font-medium">EU Zone (Authorized)</span>
                </div>
                
                {/* Asia Alert */}
                <div className="absolute top-1/3 right-1/4 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-ping" />
                  <div className="w-4 h-4 rounded-full bg-red-500 absolute" />
                  <div className="ml-6 px-3 py-1 rounded-full bg-red-500 text-white text-xs font-medium whitespace-nowrap">
                    ⚠️ Scan detected in Singapore
                  </div>
                </div>
                
                {/* Normal scan */}
                <div className="absolute bottom-1/4 left-1/3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="absolute bottom-1/3 left-[40%]">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              
              {/* Legend */}
              <div className="p-4 bg-muted/50 flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Authorized scan</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Out-of-zone alert</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded border-2 border-dashed border-green-500" />
                  <span>Authorized zone</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Comprehensive Protection
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg hover:border-red-500/50 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-red-600" />
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

      {/* Take Action */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Take Action</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                From Detection to Resolution
              </h2>
              <p className="text-muted-foreground mb-6">
                Finding gray market activity is just the start. AuthIt helps you 
                take decisive action with documentation and tools for enforcement.
              </p>
              <ul className="space-y-4">
                {[
                  'Automated evidence collection with timestamps',
                  'Distributor performance scorecards',
                  'Legal-ready documentation packages',
                  'Cease and desist letter templates',
                  'Partner notification workflows',
                  'Integration with legal case management',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-slate-900 dark:bg-slate-800 text-white p-6">
                <Shield className="h-10 w-10 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Deterrence Effect</h3>
                <p className="text-slate-300 mb-4 text-sm">
                  When distributors know you're watching, diversions decrease. 
                  Our customers see 40-60% reduction in gray market activity 
                  within the first year.
                </p>
                <Badge className="bg-red-500">Proven Results</Badge>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-red-600 dark:bg-red-700">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Search className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Stop Losing to Gray Market
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-xl mx-auto">
            Protect your authorized channels, maintain price integrity, 
            and safeguard your brand reputation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Start Monitoring
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                Talk to Expert
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default GrayMarketPage;