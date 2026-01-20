import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Target, Users, Globe, Award, Heart, Lock } from "lucide-react";
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
        description="Learn about AuthIt's mission to protect brands worldwide through innovative dual QR authentication technology."
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero */}
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

      {/* Our Story - BLURRED / REDACTED */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Our Story</h2>
              
              {/* Blurred Content Container */}
              <div className="relative">
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-muted-foreground blur-md select-none opacity-50">
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
                
                {/* Overlay Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-background/80 backdrop-blur-sm border border-primary/20 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">Content Updating...</span>
                  </div>
                </div>
              </div>

            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl sm:rounded-2xl p-6 sm:p-8 aspect-square flex items-center justify-center order-first md:order-last">
              <Shield className="w-24 h-24 sm:w-32 sm:h-32 text-primary/50" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
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

      {/* Our Values */}
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

      {/* Mission */}
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

      <PublicFooter />
    </div>
  );
};

export default AboutPage;