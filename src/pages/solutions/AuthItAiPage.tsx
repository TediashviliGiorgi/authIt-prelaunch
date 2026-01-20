import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Wine,
  BarChart3,
  Sparkles,
  Users,
  TrendingUp,
  Lightbulb,
  Languages,
  Heart,
  Star,
} from 'lucide-react';

// ==========================================
// AUTHIT AI SOLUTION PAGE
// ==========================================
const AuthItAIPage = () => {
  const agentCapabilities = [
    {
      icon: BarChart3,
      title: 'Business Intelligence',
      description: 'Ask questions about your data in natural language. Get instant insights on sales, scans, and trends.',
    },
    {
      icon: Lightbulb,
      title: 'Anomaly Detection',
      description: 'AI monitors your data 24/7 and proactively alerts you to unusual patterns.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast demand, identify at-risk channels, and optimize inventory placement.',
    },
    {
      icon: MessageSquare,
      title: 'Report Generation',
      description: 'Generate custom reports and presentations with a simple conversation.',
    },
  ];

  const sommelierFeatures = [
    {
      icon: Wine,
      title: 'Tasting Notes',
      description: 'AI-generated tasting descriptions based on your wine\'s profile.',
    },
    {
      icon: Heart,
      title: 'Food Pairings',
      description: 'Personalized pairing suggestions based on cuisine and occasion.',
    },
    {
      icon: Languages,
      title: 'Multi-Language',
      description: 'Communicates with consumers in 23+ languages automatically.',
    },
    {
      icon: Users,
      title: 'Personalization',
      description: 'Learns consumer preferences for better recommendations.',
    },
  ];

  const chatExamples = [
    {
      type: 'user',
      message: 'Which batches have the highest scan rates this month?',
    },
    {
      type: 'assistant',
      message: 'Your Saperavi Reserve 2021 (Batch #SAP-2021-042) leads with 3,847 scans, up 23% from last month. The top 3 regions are: Germany (42%), France (31%), and USA (18%).',
    },
    {
      type: 'user',
      message: 'Any concerning patterns I should know about?',
    },
    {
      type: 'assistant',
      message: 'I\'ve detected 12 scans from Singapore for products designated for EU only. I\'ve already flagged this in your Gray Market alerts. Would you like me to generate a detailed report?',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AuthIt AI - Intelligent Brand Protection | AuthIt"
        description="AI-powered business intelligence and consumer engagement. AuthIt AI Agent for insights, AI Sommelier for wine recommendations."
        keywords="AI brand protection, AI sommelier, business intelligence, consumer engagement, wine AI"
      />
      
      <PublicHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 sm:pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-background dark:from-indigo-950/20 dark:to-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <Badge className="bg-indigo-600 text-white mb-6 gap-1">
                <Sparkles className="h-3 w-3" />
                NEW: AI-Powered
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                AuthIt AI
                <span className="block text-indigo-600 dark:text-indigo-400">
                  Intelligence Built In
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Two AI systems working for you: <strong>AI Agent</strong> for business intelligence 
                and <strong>AI Sommelier</strong> for consumer engagement.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto gap-2 bg-indigo-600 hover:bg-indigo-700">
                    Try AuthIt AI
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

            {/* Hero Visual - Chat Interface */}
            <div className="flex-1 w-full max-w-md">
              <Card className="bg-background/80 backdrop-blur border-2 border-indigo-500/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">AuthIt AI Agent</CardTitle>
                      <CardDescription className="text-xs">Always analyzing, always ready</CardDescription>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chatExamples.map((chat, index) => (
                    <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                        chat.type === 'user' 
                          ? 'bg-indigo-500 text-white rounded-br-md' 
                          : 'bg-muted rounded-bl-md'
                      }`}>
                        {chat.message}
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-muted/50 border">
                    <input 
                      type="text" 
                      placeholder="Ask anything about your data..." 
                      className="flex-1 bg-transparent text-sm outline-none"
                      disabled
                    />
                    <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Two Products Section */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Two AI Solutions</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Intelligence for Everyone
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Agent */}
            <Card className="border-2 hover:border-indigo-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                    <Bot className="h-7 w-7 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Agent</CardTitle>
                    <CardDescription>For Your Business</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Your intelligent assistant that understands your brand protection data. 
                  Ask questions, get insights, and make better decisions.
                </p>
                <div className="space-y-4">
                  {agentCapabilities.map((cap, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                        <cap.icon className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{cap.title}</div>
                        <div className="text-xs text-muted-foreground">{cap.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Sommelier */}
            <Card className="border-2 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                    <Wine className="h-7 w-7 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Sommelier</CardTitle>
                    <CardDescription>For Your Consumers</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  A virtual wine expert that engages with your consumers. 
                  Personalized recommendations and stories in their language.
                </p>
                <div className="space-y-4">
                  {sommelierFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                        <feature.icon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Agent Deep Dive */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-indigo-500 text-indigo-600">AI Agent</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Ask Anything About Your Data
              </h2>
              <p className="text-muted-foreground mb-6">
                Stop digging through dashboards. Just ask. AuthIt AI Agent understands 
                your data and answers in plain language.
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                  "Show me scan trends for the last quarter"
                </div>
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                  "Which products have the most authentication attempts?"
                </div>
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                  "Are there any unusual patterns in Germany?"
                </div>
                <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                  "Generate a monthly report for the board"
                </div>
              </div>
            </div>
            <div>
              <Card className="bg-slate-900 text-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 text-amber-400" />
                  <span className="font-semibold">Proactive Insights</span>
                </div>
                <p className="text-slate-300 mb-4">
                  AI Agent doesn't just answer questions - it proactively 
                  surfaces insights you didn't know to ask for.
                </p>
                <div className="p-3 rounded-lg bg-slate-800 text-sm">
                  <div className="text-indigo-400 mb-1">💡 Insight Detected</div>
                  <p className="text-slate-300">
                    "Your Tbilisuri Qvevri shows 340% higher engagement than other products 
                    in France. Consider increasing allocation."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Sommelier Deep Dive */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Card className="bg-background border-2 border-purple-500/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                      <Wine className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">AI Sommelier</CardTitle>
                      <CardDescription className="text-xs">Saperavi Reserve 2021</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-purple-500/5">
                    <h4 className="font-semibold text-sm mb-2">🍷 Tasting Notes</h4>
                    <p className="text-sm text-muted-foreground">
                      Deep ruby with violet hues. Bold blackberry, dark cherry, and hints 
                      of Georgian spices. Full-bodied with velvety tannins and a long finish.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-500/5">
                    <h4 className="font-semibold text-sm mb-2">🍽️ Pairs Perfectly With</h4>
                    <p className="text-sm text-muted-foreground">
                      Grilled lamb, mtsvadi (Georgian BBQ), aged hard cheeses, 
                      or rich beef stews. Decant 45 minutes for optimal expression.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Georgian', 'Italian', 'French', 'BBQ', 'Cheese'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="outline" className="mb-4 border-purple-500 text-purple-600">AI Sommelier</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Your Virtual Wine Expert
              </h2>
              <p className="text-muted-foreground mb-6">
                When consumers scan your wine, AI Sommelier greets them with 
                personalized recommendations, stories, and pairings - in their language.
              </p>
              <ul className="space-y-3">
                {[
                  'Auto-generated tasting notes from wine profile',
                  'Food pairing suggestions based on occasion',
                  'Temperature and decanting recommendations',
                  'Producer story and vineyard information',
                  'Similar wines they might enjoy',
                  'Rating integration (Vivino, Wine Enthusiast)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">Results</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
            AI That Delivers
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">3x</div>
              <div className="font-medium mb-1">Faster Insights</div>
              <div className="text-sm text-muted-foreground">
                Get answers in seconds, not hours
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">45%</div>
              <div className="font-medium mb-1">More Engagement</div>
              <div className="text-sm text-muted-foreground">
                Consumers spend more time with your product
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="font-medium mb-1">Always On</div>
              <div className="text-sm text-muted-foreground">
                AI never sleeps, always monitoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Sparkles className="h-12 w-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Experience AI-Powered Brand Protection
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            AuthIt AI is included with all premium plans. Start with our free tier 
            and upgrade when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto gap-2">
                Try AuthIt AI
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default AuthItAIPage;