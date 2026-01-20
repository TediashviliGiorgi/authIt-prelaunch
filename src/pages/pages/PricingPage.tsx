import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, HelpCircle, Calculator } from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      description: "For small producers",
      price: "₾0.30",
      priceDetail: "per bottle",
      badge: null,
      features: [
        "Up to 10,000 bottles/month",
        "Dual QR Authentication",
        "Basic Analytics",
        "Email Support",
        "1 Brand",
        "Standard QR Design",
      ],
      cta: "Start Free Trial",
      variant: "outline" as const,
    },
    {
      name: "Professional",
      description: "For growing businesses",
      price: "₾0.25",
      priceDetail: "per bottle",
      badge: "Most Popular",
      features: [
        "Up to 50,000 bottles/month",
        "Dual QR Authentication",
        "Advanced Analytics",
        "Priority Support",
        "5 Brands",
        "Custom QR Design",
        "API Access",
        "Team Members (5)",
      ],
      cta: "Get Started",
      variant: "default" as const,
    },
    {
      name: "Enterprise",
      description: "For large operations",
      price: "Custom",
      priceDetail: "contact us",
      badge: null,
      features: [
        "Unlimited bottles",
        "Dual QR + NFC Support",
        "Full Analytics Suite",
        "Dedicated Account Manager",
        "Unlimited Brands",
        "White-label Solution",
        "Custom Integration",
        "SLA Guarantee",
        "On-premise Option",
      ],
      cta: "Contact Sales",
      variant: "outline" as const,
    },
  ];

  const faqs = [
    {
      question: "How does the pricing work?",
      answer: "You pay per bottle that receives QR codes. The more bottles you authenticate, the lower your per-unit cost. No setup fees or hidden charges.",
    },
    {
      question: "What is Dual QR Authentication?",
      answer: "Dual QR means each bottle gets two QR codes: a visible Marketing QR on the label for customer engagement, and a hidden Security QR under the cork for one-time authenticity verification.",
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and are prorated.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans. No credit card required to start.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and for Enterprise customers, we offer invoicing with NET-30 terms.",
    },
    {
      question: "Do you offer volume discounts?",
      answer: "Absolutely! For orders over 100,000 bottles per month, contact us for custom pricing that can be significantly lower than our standard rates.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Pricing - AuthIt Brand Authentication"
        description="Simple, transparent pricing for brand authentication. Start free, scale as you grow."
        keywords="QR authentication pricing, brand protection cost, anti-counterfeiting pricing"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Pay only for what you use. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards - Responsive */}
      <section className="pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative flex flex-col ${
                  plan.badge ? 'border-primary shadow-lg' : ''
                } ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-[10px] sm:text-xs">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">{plan.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{plan.description}</CardDescription>
                  <div className="pt-3 sm:pt-4">
                    <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-2">
                      {plan.priceDetail}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 sm:space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={plan.name === 'Enterprise' ? '/contact' : '/register'} className="block mt-auto">
                    <Button 
                      variant={plan.variant} 
                      className="w-full text-xs sm:text-sm h-10 sm:h-11"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator CTA - Responsive */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Calculator className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            Calculate Your Costs
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
            Use our cost calculator in the batch creation process to see exactly how much 
            authentication will cost for your specific needs.
          </p>
          <Link to="/register">
            <Button size="lg" className="text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8">
              Try the Calculator
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 text-primary mx-auto mb-3 sm:mb-4" />
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm sm:text-base text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-primary">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/80 mb-6 sm:mb-8">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/register">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Talk to Sales
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

export default PricingPage;