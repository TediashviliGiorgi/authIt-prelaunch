import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Shield, 
  BarChart3, 
  Building2,
  Check,
  X,
  QrCode,
  Globe,
  Smartphone,
  Lock,
  TrendingUp,
  Users
} from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Features - AuthIt Brand Authentication Platform"
        description="Discover AuthIt's powerful features: brand storytelling, security authentication, real-time analytics, and multi-brand management."
        keywords="QR authentication features, brand protection, product verification, anti-counterfeiting technology"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Everything You Need to Protect & Promote Your Brand
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital authentication and marketing platform with dual QR technology
          </p>
        </div>
      </section>

      {/* Feature 1: Marketing - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <BookOpen className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Marketing & Storytelling</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Transform simple QR codes into engaging brand experiences
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Rich product stories with photos, videos, and history</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Awards and certifications showcase</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Multi-language support (5+ languages)</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Food pairing and serving recommendations</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center order-first md:order-last">
              <QrCode className="w-20 h-20 sm:w-24 sm:h-24 text-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Security - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center">
              <Shield className="w-20 h-20 sm:w-24 sm:h-24 text-green-500/50" />
            </div>
            <div>
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Security Authentication</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Hidden QR codes under the cork that can only be scanned once
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">One-time verification - impossible to reuse</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">N→N Economics - counterfeiting becomes unprofitable</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Real-time fraud detection alerts</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Location and device tracking for each scan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Analytics - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Real-Time Analytics</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Understand your customers and protect your brand with data
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Geographic distribution of scans</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Customer engagement metrics</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Fraud attempt monitoring</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Export reports in multiple formats</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center order-first md:order-last">
              <BarChart3 className="w-20 h-20 sm:w-24 sm:h-24 text-blue-500/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Multi-Brand - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-video flex items-center justify-center">
              <Building2 className="w-20 h-20 sm:w-24 sm:h-24 text-purple-500/50" />
            </div>
            <div>
              <Building2 className="w-10 h-10 sm:w-12 sm:h-12 text-purple-600 mb-3 sm:mb-4" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Multi-Brand Management</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Manage multiple brands and products from a single dashboard
              </p>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Unlimited brands per account</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Product catalog management</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Batch tracking and history</span>
                </li>
                <li className="flex items-start gap-2 sm:gap-3">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Team collaboration tools</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Grid - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
            More Powerful Features
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">Multi-Language</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Support for Georgian, English, Russian, Italian, and French
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">Mobile First</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Works on any smartphone - no app required
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Enterprise-grade encryption and security
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">ROI Tracking</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Measure the impact of authentication on sales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">Team Access</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Role-based permissions for your team
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-2" />
                <CardTitle className="text-sm sm:text-base">Dual QR System</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Marketing + Security in one solution
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Ready to Protect Your Brand?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            Start authenticating your products today with our easy-to-use platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
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

export default FeaturesPage;