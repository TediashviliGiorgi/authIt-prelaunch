import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Unlock,
  Database,
  Globe,
  Calculator,
  Users,
  Code,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  XCircle,
  Scroll,
} from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

const ManifestoPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Manifesto - AuthIt"
        description="Our vision for the future of authenticity. Technology for people, not for technology's sake."
        keywords="AuthIt manifesto, brand protection vision, anti-counterfeiting mission, wine authentication"
      />
      
      {/* Navigation */}
      <PublicHeader />

      {/* Hero */}
      <section className="py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <Scroll className="w-12 h-12 sm:w-16 sm:h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Manifesto
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The Future of Authenticity
          </p>
        </div>
      </section>

      {/* Section I - The Age of Counterfeiting */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">I.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">The Age of Counterfeiting</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>
              Every day, somewhere in the world, someone buys a counterfeit product 
              and thinks it's the original.
            </p>
            
            <Card className="bg-destructive/5 border-destructive/20">
              <CardContent className="p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-destructive mb-2">
                  $2 Trillion
                </p>
                <p className="text-sm sm:text-base text-destructive/80">
                  per year — the global counterfeiting market. More than drug trafficking. 
                  More than arms trade.
                </p>
              </CardContent>
            </Card>
            
            <p>
              Fake medicines kill people. Fake auto parts cause accidents. 
              Fake food makes children sick. Fake wine destroys generations of reputation.
            </p>
            
            <p className="font-semibold text-foreground">
              And yet, most stay silent. We won't be silent.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section II - The Parade of Theorists */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">II.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">The Parade of Theorists</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>
              At every conference, every TED Talk, someone stands on stage throwing around words:
            </p>
            
            <Card className="border-dashed">
              <CardContent className="p-4 sm:p-6 space-y-2 font-mono text-xs sm:text-sm">
                <p className="italic">"Quantum-resistant cryptographic entropy..."</p>
                <p className="italic">"Decentralized immutable ledger verification..."</p>
                <p className="italic">"Zero-knowledge recursive proof mechanisms..."</p>
              </CardContent>
            </Card>
            
            <p>Sounds beautiful. The audience nods.</p>
            
            <div className="bg-primary/5 rounded-lg p-4 sm:p-6 border-l-4 border-primary">
              <p className="font-semibold text-foreground mb-3">Let's be honest:</p>
              <p>
                We also attend physics lectures. We also read whitepapers. 
                We also understand quantum entanglement, Merkle trees, and elliptic curve cryptography.
              </p>
            </div>
            
            <p className="font-semibold text-foreground text-base sm:text-lg md:text-xl">
              But here's what we've learned: Technology that exists for its own sake is useless.
            </p>
            
            <p>
              When a winemaker asks "how do I protect my wine?", the answer 
              "install a quantum random generator" — doesn't work.
            </p>
            
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-4 sm:p-6 text-center">
                <Lightbulb className="w-8 h-8 mx-auto mb-3" />
                <p className="font-bold text-base sm:text-lg">
                  Technology is a tool, not a goal.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section III - The Blockchain Myth */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">III.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">The Blockchain Myth</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>We were told: Decentralization = Freedom = Security.</p>
            
            <Card className="border-amber-500/50 bg-amber-500/5">
              <CardContent className="p-4 sm:p-6">
                <AlertTriangle className="w-6 h-6 text-amber-500 mb-3" />
                <p className="font-semibold text-foreground mb-3">Reality:</p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                    <span>65% of Bitcoin mining → controlled by 4 companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                    <span>60% of Ethereum nodes → on Amazon AWS</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                    <span>Every "decentralized" project → depends on centralized services</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <p>
              Decentralization is a beautiful idea. In practice? It simply means: 
              "When problems arise, no one will be responsible."
            </p>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 sm:p-6">
                <Database className="w-6 h-6 text-primary mb-3" />
                <p className="font-semibold text-foreground mb-3">We chose a different path:</p>
                <p className="mb-4">
                  <span className="font-bold text-primary">Yes, we are centralized.</span> 
                  {" "}And we do it intentionally.
                </p>
                <ul className="space-y-2 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>When you need help — someone will answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>When problems arise — someone will fix them</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>When mistakes happen — someone will take responsibility</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <p className="font-semibold text-foreground">
              The choice is simple: Do you want beautiful architecture or a system that works?
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section IV - The Standards Barrier */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">IV.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">The Standards Barrier</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>The European Union introduced important regulations:</p>
            
            <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">DPP</p>
                  <p className="text-xs text-muted-foreground">Digital Product Passport</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Code className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">GS1 Digital Link</p>
                  <p className="text-xs text-muted-foreground">Global Standard</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="font-semibold text-sm">E-Labeling</p>
                  <p className="text-xs text-muted-foreground">Digital Labeling</p>
                </CardContent>
              </Card>
            </div>
            
            <p>Good intentions. Consumers will know what they're buying.</p>
            
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-4 sm:p-6">
                <p className="font-semibold text-foreground mb-4">But the cost of implementation?</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">GS1 Membership:</p>
                    <p className="font-semibold text-foreground">$250 - $10,000/year</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Software:</p>
                    <p className="font-semibold text-foreground">$5,000 - $50,000</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Consultants:</p>
                    <p className="font-semibold text-foreground">$200/hour</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Integration:</p>
                    <p className="font-semibold text-foreground">3-6 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <p>
              A small producer making 500 bottles a year is told: 
              "Either pay up, or say goodbye to the EU market."
            </p>
            
            <p className="font-bold text-destructive">
              This isn't regulation. This is economic segregation.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section V - Our Answer */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">V.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Our Answer</h2>
          </div>
          
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground mb-6">
            <CardContent className="p-6 sm:p-8 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">E-Label Studio</h3>
              <ul className="space-y-2 text-sm sm:text-base mb-6 text-left max-w-md mx-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Full EU 2019/787 & 1169/2011 compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>GS1 Digital Link — integrated</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>DPP (Digital Product Passport) — ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>23+ languages, allergens, nutritional facts</span>
                </li>
              </ul>
              
              <div className="bg-white/10 rounded-xl p-4 sm:p-6">
                <p className="text-sm text-primary-foreground/80 mb-2">Price:</p>
                <p className="text-4xl sm:text-5xl font-bold">€0</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>
              No free trial. No "first 30 days free." No hidden limits.
            </p>
            <p className="font-bold text-foreground text-lg sm:text-xl">
              Free. Unlimited. Forever.
            </p>
            <p>
              Why? Because compliance shouldn't be a privilege. Because a small winemaker 
              has the same right to the EU market as a multinational corporation. 
              Because following the law shouldn't be a luxury.
            </p>
            <p>
              And because our business model is elsewhere — where we create real value.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section VI - The Real Battle */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">VI.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">The Real Battle</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>E-Label — this is the entrance. A door that's open to everyone.</p>
            <p className="font-semibold text-foreground">The real problem runs deeper:</p>
            <p>How do we verify that a product is authentic?</p>
            <p>Not with beautiful words. Not with complex technologies. Not with buzzwords.</p>
            <p className="font-bold text-primary text-xl sm:text-2xl">With mathematics.</p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section VII - N → N */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">VII.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">N → N</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>The core of our system is simple:</p>
            
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30">
              <CardContent className="p-6 sm:p-8 text-center">
                <Calculator className="w-10 h-10 text-primary mx-auto mb-4" />
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                  N Originals → N Fakes
                </p>
                <p className="text-muted-foreground max-w-md mx-auto">
                  If a counterfeiter wants to sell 1,000 fake bottles, they must buy 
                  1,000 original bottles and destroy them.
                </p>
              </CardContent>
            </Card>
            
            <p>
              This isn't "secure" in the traditional sense. This is 
              <span className="font-bold text-primary"> mathematically unprofitable.</span>
            </p>
            
            <p>
              When producing fakes costs more than buying originals, 
              counterfeiting loses its purpose.
            </p>
            
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-4 sm:p-6 text-center">
                <p className="font-bold text-lg sm:text-xl">Simplicity is power.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section VIII - Why Simplicity */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">VIII.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Why Simplicity?</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>We could have added layers:</p>
            
            <Card className="border-dashed">
              <CardContent className="p-4 font-mono text-xs sm:text-sm text-center">
                Blockchain → Smart Contracts → Oracles → Layer 2 → ZK Proofs → ...
              </CardContent>
            </Card>
            
            <p>
              That would look more "serious." More buzzwords. Higher price.
            </p>
            
            <p className="font-semibold text-foreground">But we asked a different question:</p>
            <p>What does the user need?</p>
            <p>Not a whitepaper. Not technical documentation. Not a blockchain explorer.</p>
            
            <Card className="bg-primary/5 border-primary/30">
              <CardContent className="p-6 text-center">
                <p className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  One answer:
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  Is this authentic or not?
                </p>
                <p className="text-muted-foreground mt-4">Yes or no. That's all.</p>
              </CardContent>
            </Card>
            
            <p>Everything else is our concern, not the user's.</p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section IX - Who We Are */}
      <section className="py-10 sm:py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">IX.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Who We Are</h2>
          </div>
          
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-muted-foreground">
            <p>We're not a corporation selling "enterprise solutions."</p>
            <p>We're not a startup chasing the next funding round.</p>
            <p className="font-semibold text-foreground">We are engineers who believe:</p>
            
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">&gt;</span>
                  </div>
                  <p className="font-semibold">Simplicity &gt; Complexity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">&gt;</span>
                  </div>
                  <p className="font-semibold">Accountability &gt; Anonymity</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">&gt;</span>
                  </div>
                  <p className="font-semibold">Working &gt; Presenting</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">&gt;</span>
                  </div>
                  <p className="font-semibold">Mathematics &gt; Marketing</p>
                </CardContent>
              </Card>
            </div>
            
            <p>
              We understand technology. 
              <span className="font-bold text-foreground"> And that's exactly why we choose simplicity.</span>
            </p>
            
            <p>
              Because the best technology is invisible. It simply works. 
              You don't have to think about it.
            </p>
          </div>
        </div>
      </section>

      <Separator className="max-w-2xl mx-auto" />

      {/* Section X - Invitation */}
      <section className="py-10 sm:py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl sm:text-4xl font-bold text-primary">X.</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Invitation</h2>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">If you're a producer:</p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Your product is your reputation. You know how much work you put in. 
                      Counterfeiters shouldn't be able to steal that.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">If you're a consumer:</p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      You have the right to know what you're buying. Not "probably." Not "hopefully." 
                      But exactly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">If you're a technologist:</p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Let's work together. This problem is big. And the more people 
                      working on real solutions (not buzzwords), the better.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">If you're a skeptic:</p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Good. We were too. Test it. Ask questions. The mathematics will answer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto max-w-3xl">
          <Card className="bg-card/50 backdrop-blur border-primary/20">
            <CardContent className="p-6 sm:p-8 md:p-10">
              <div className="font-mono text-xs sm:text-sm space-y-2 mb-8 text-muted-foreground">
                <p>Compliance — free. For everyone.</p>
                <p>Truth — in one question.</p>
                <p>Counterfeiting — mathematically unprofitable.</p>
                <p className="text-foreground font-semibold pt-2">This is the new equation.</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">AuthIt</h3>
                <p className="text-muted-foreground italic mb-6">
                  Technology that works, not that impresses.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="text-center space-y-2 text-sm text-muted-foreground">
                <Lock className="w-5 h-5 mx-auto text-primary mb-3" />
                <p className="italic">They sell complexity because complexity is expensive.</p>
                <p className="italic">We offer simplicity because simplicity works.</p>
                <p className="italic font-semibold text-foreground pt-2">
                  Technology for technology's sake — is a theorist's toy.
                </p>
                <p className="italic font-semibold text-foreground">
                  Technology for people — this is progress.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            <span className="font-semibold">P.S.</span> E-Label Studio is already available. 
            Free. Without limits. Because compliance shouldn't be a barrier — 
            it should be a starting point.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base h-11 sm:h-12 px-6 sm:px-8">
                Start Free
                <ArrowRight className="ml-2 h-4 w-4" />
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

export default ManifestoPage;