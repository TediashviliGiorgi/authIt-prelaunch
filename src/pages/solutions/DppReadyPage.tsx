import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Leaf,
  Recycle,
  Factory,
  Users,
  Shield,
  Clock,
  AlertTriangle,
  TrendingUp,
  CircleDot,
  Box,
} from 'lucide-react';

// ==========================================
// DPP READY SOLUTION PAGE
// ==========================================
const DPPReadyPage = () => {
  const passportData = [
    {
      category: 'Product Identity',
      items: ['Unique identifier', 'GTIN/SKU', 'Brand & manufacturer', 'Model & variant'],
    },
    {
      category: 'Sustainability',
      items: ['Carbon footprint', 'Materials composition', 'Recyclability score', 'Environmental certifications'],
    },
    {
      category: 'Supply Chain',
      items: ['Origin traceability', 'Manufacturing location', 'Transport history', 'Chain of custody'],
    },
    {
      category: 'Compliance',
      items: ['Regulatory status', 'Safety certifications', 'Test results', 'Recall information'],
    },
  ];

  const timeline = [
    { year: '2024', event: 'EU Ecodesign Regulation adopted', status: 'done' },
    { year: '2026', event: 'DPP required for batteries', status: 'upcoming' },
    { year: '2027', event: 'DPP required for textiles', status: 'upcoming' },
    { year: '2028', event: 'DPP required for electronics', status: 'upcoming' },
    { year: '2030', event: 'Full DPP rollout across sectors', status: 'future' },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: 'Sustainability Leadership',
      description: 'Demonstrate your environmental commitment with transparent product data.',
    },
    {
      icon: Users,
      title: 'Consumer Trust',
      description: 'Build loyalty through transparency about materials, origin, and impact.',
    },
    {
      icon: TrendingUp,
      title: 'Market Access',
      description: 'Stay ahead of regulations and maintain access to EU markets.',
    },
    {
      icon: Recycle,
      title: 'Circular Economy',
      description: 'Enable proper recycling and end-of-life product management.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Digital Product Passport (DPP) Ready | AuthIt"
        description="Prepare for EU Digital Product Passport requirements. Build your DPP infrastructure today for batteries, textiles, and electronics compliance."
        keywords="Digital Product Passport, DPP, EU Ecodesign, sustainability, product traceability, circular economy"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-background dark:from-violet-950/20 dark:to-background" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-violet-600 text-white mb-6">
                EU Regulation Ready
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Digital Product Passport
                <span className="block text-violet-600 dark:text-violet-400">
                  Build Your DPP Today
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                The EU is mandating Digital Product Passports starting 2026. 
                Get ahead of regulations with infrastructure that's ready now.
              </p>

              {/* Urgency Banner */}
              <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 max-w-md mx-auto lg:mx-0">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span className="text-sm text-amber-700 dark:text-amber-400">
                  <strong>Battery DPP required in 2026</strong> — Less than 2 years to comply
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-violet-600 hover:bg-violet-700">
                    Start Building DPP
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

            {/* Hero Visual - Passport Preview */}
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-background/80 backdrop-blur border-2 border-violet-500/20 overflow-hidden">
                <div className="bg-violet-600 text-white p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2" />
                  <div className="font-semibold">Digital Product Passport</div>
                  <div className="text-xs text-violet-200">EU Ecodesign Compliant</div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">Product ID</span>
                    <code className="text-xs font-mono">DPP-2024-ABC123</code>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-500/10 text-center">
                      <Leaf className="h-5 w-5 mx-auto text-green-600 mb-1" />
                      <div className="text-xs text-green-700 dark:text-green-400">Carbon Score</div>
                      <div className="font-semibold text-green-600">A+</div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                      <Recycle className="h-5 w-5 mx-auto text-blue-600 mb-1" />
                      <div className="text-xs text-blue-700 dark:text-blue-400">Recyclable</div>
                      <div className="font-semibold text-blue-600">92%</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <div className="text-xs text-muted-foreground mb-2">Origin Chain</div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-background">🇬🇪 Georgia</span>
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-background">🇩🇪 Germany</span>
                      <span>→</span>
                      <span className="px-2 py-1 rounded bg-background">🇫🇷 France</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What is DPP */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">Understanding DPP</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            What is a Digital Product Passport?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            A Digital Product Passport is a comprehensive digital record containing 
            information about a product's composition, origin, environmental impact, 
            and end-of-life handling. It's part of the EU's strategy for a sustainable, 
            circular economy.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {passportData.map((section, index) => (
              <Card key={index} className="text-left">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-violet-600">{section.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <CircleDot className="h-2 w-2 text-violet-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Timeline</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              DPP Implementation Schedule
            </h2>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-violet-200 dark:bg-violet-800" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`} />
                  <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 ${
                    item.status === 'done' ? 'bg-green-500' : 
                    item.status === 'upcoming' ? 'bg-violet-500' : 'bg-muted-foreground/30'
                  }`} />
                  <Card className={`flex-1 ml-10 md:ml-0 ${item.status === 'done' ? 'border-green-500/50' : ''}`}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Badge variant={item.status === 'done' ? 'default' : 'outline'} 
                               className={item.status === 'done' ? 'bg-green-500' : ''}>
                          {item.year}
                        </Badge>
                        {item.status === 'done' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{item.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Benefits</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Why Implement DPP Now?
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg hover:border-violet-500/50 transition-all">
                <CardHeader>
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-500/10 flex items-center justify-center mb-4">
                    <benefit.icon className="h-7 w-7 text-violet-600" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">Our Solution</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                DPP Infrastructure Ready
              </h2>
              <p className="text-muted-foreground mb-6">
                AuthIt provides the complete infrastructure you need to create, manage, 
                and deliver Digital Product Passports at scale.
              </p>
              <ul className="space-y-4">
                {[
                  'Unique product identifiers (GS1 compliant)',
                  'Secure data storage and access control',
                  'QR/NFC enabled product scanning',
                  'Real-time data updates and versioning',
                  'API integration with your systems',
                  'Consumer-facing passport viewer',
                  'Regulatory reporting tools',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-violet-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Card className="bg-slate-900 dark:bg-slate-800 text-white p-8">
                <Box className="h-12 w-12 text-violet-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Start Small, Scale Big</h3>
                <p className="text-slate-300 mb-4">
                  Begin building your DPP database today with our free E-Label tier. 
                  As regulations expand, you'll have the foundation ready.
                </p>
                <Badge className="bg-violet-500">Future-Proof Your Products</Badge>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-violet-600 dark:bg-violet-700">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Clock className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Don't Wait for the Deadline
          </h2>
          <p className="text-lg text-violet-100 mb-8 max-w-xl mx-auto">
            Companies that prepare early will have a competitive advantage. 
            Start building your DPP infrastructure today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default DPPReadyPage;