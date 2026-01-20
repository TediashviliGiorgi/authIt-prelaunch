import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building } from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { toast } from "@/hooks/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setFormData({
      name: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@authit.io",
      link: "mailto:info@authit.io",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+995 XXX XXX XXX",
      link: "tel:+995XXXXXXXXX",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "Tbilisi, Georgia",
      link: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "Mon - Fri: 9:00 - 18:00",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Contact Us - AuthIt"
        description="Get in touch with AuthIt. We're here to help you protect your brand with our authentication solutions."
        keywords="contact AuthIt, brand authentication support, anti-counterfeiting contact"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero - Responsive */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our authentication solutions? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Content - Responsive */}
      <section className="pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Contact Form - Takes 2 columns on large screens */}
            <Card className="lg:col-span-2">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Fill out the form and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        required
                        className="h-10 sm:h-11 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="h-10 sm:h-11 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="h-10 sm:h-11 text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm">Subject *</Label>
                      <Select 
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="h-10 sm:h-11 text-sm">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="sales">Sales & Pricing</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                      className="text-sm resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto text-sm h-10 sm:h-11 px-6 sm:px-8"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info - Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {/* Contact Details Card */}
              <Card>
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Building className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    const content = (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground">{info.title}</p>
                          <p className="text-sm sm:text-base font-medium">{info.value}</p>
                        </div>
                      </div>
                    );
                    
                    return info.link ? (
                      <a 
                        key={index} 
                        href={info.link}
                        className="block hover:opacity-80 transition-opacity"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={index}>{content}</div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Help Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Need Quick Help?</h3>
                  <p className="text-xs sm:text-sm opacity-90 mb-4">
                    Check out our documentation and FAQ for instant answers.
                  </p>
                  <div className="space-y-2">
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm h-9"
                    >
                      View Documentation
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm h-9 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    >
                      Browse FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Optional placeholder - Responsive */}
      <section className="pb-12 sm:pb-16 md:pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-muted rounded-xl sm:rounded-2xl h-48 sm:h-64 md:h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 opacity-50" />
              <p className="text-xs sm:text-sm">Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export default ContactPage;