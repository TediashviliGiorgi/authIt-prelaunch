import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Target, Users, Globe, Award, Heart } from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We believe every authentic product deserves protection from counterfeiting.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously improving our technology to stay ahead of counterfeiters.",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description: "Building solutions that actually work for wine producers and their customers.",
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Starting in Georgia, expanding to protect brands worldwide.",
    },
  ];

  const stats = [
    { value: "1M+", label: "Bottles Protected" },
    { value: "100+", label: "Partner Wineries" },
    { value: "99.9%", label: "Uptime" },
    { value: "5", label: "Languages" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About Us - AuthIt"
        description="Learn about AuthIt's mission to protect Georgian wine and brands worldwide through innovative dual QR authentication technology."
        keywords="AuthIt about, brand protection company, Georgian wine authentication, anti-counterfeiting technology"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Protecting Authenticity, <br className="hidden sm:block" />
            <span className="text-primary">One Bottle at a Time</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to eliminate counterfeit products and help brands 
            connect authentically with their customers.
          </p>
        </div>
      </section>

      {/* Our Story - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground">
                <p>
                  AuthIt was born from a simple observation: Georgian wine, with its 8,000-year 
                  history, deserves protection from counterfeiting.
                </p>
                <p>
                  We developed a dual QR system that combines marketing engagement with 
                  security verification - making counterfeiting economically unfeasible 
                  while giving brands a powerful way to connect with consumers.
                </p>
                <p>
                  Today, we're working with wineries across Georgia and expanding to 
                  international markets, including Italy and beyond.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-square flex items-center justify-center order-first md:order-last">
              <Shield className="w-24 h-24 sm:w-32 sm:h-32 text-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-4 sm:p-6">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 sm:p-8">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-sm sm:text-base opacity-90">
                  To make product counterfeiting economically unfeasible through 
                  innovative technology that's accessible to producers of all sizes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 sm:p-8">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary mb-4" />
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  A world where every consumer can trust the authenticity of the 
                  products they purchase, and every producer can protect their brand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Award className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Trusted By Industry Leaders
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
            We work closely with the Georgian National Wine Agency and wine manufacturers 
            to ensure the highest standards of brand protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-50">
            {/* Placeholder for partner logos */}
            <div className="w-24 h-12 sm:w-32 sm:h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              Partner 1
            </div>
            <div className="w-24 h-12 sm:w-32 sm:h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              Partner 2
            </div>
            <div className="w-24 h-12 sm:w-32 sm:h-16 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">
              Partner 3
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Join Us in Protecting Authenticity
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
            Whether you're a small winery or a large producer, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                Get Started
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                Contact Us
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

export default AboutPage;