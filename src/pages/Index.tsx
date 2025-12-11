import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import boomLogo from "@/assets/boom-logo.jpg";
import { 
  Sparkles, 
  Users, 
  MapPin, 
  Calendar, 
  Palette,
  Clock,
  MessageSquare,
  Instagram,
  Twitter,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={boomLogo} alt="BOOM Logo" className="h-10 w-10 rounded-lg object-cover" />
            <span className="font-headline text-2xl font-bold text-foreground">BOOM</span>
          </div>
          <Button onClick={scrollToWaitlist} className="bg-primary hover:bg-primary-glow rounded-full px-6">
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background"></div>
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              END THE GUESSWORK.<br />
              <span className="text-gradient">END THE GIST.</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              BOOM is the AI tool that finally ends the "What I Ordered vs. What I Got" problem for Nigerian fashion. 
              <span className="text-foreground font-medium"> Describe your outfit → see it instantly on a model → send it directly to your tailor.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary-glow rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={scrollToWaitlist}
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all"
              >
                For Tailors: Become a Verified Designer
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 bg-card border-2 border-border rounded-2xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MessageSquare className="h-4 w-4" />
                    Text Prompt
                  </div>
                  <div className="aspect-[4/5] bg-muted rounded-xl flex items-center justify-center p-6">
                    <p className="text-muted-foreground text-center italic">
                      "I want a flowing agbada in royal blue with gold embroidery on the collar..."
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-card border-2 border-primary/30 rounded-2xl shadow-lg shadow-primary/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    AI Preview
                  </div>
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                    <p className="text-primary font-bold text-center">AI-Generated Outfit Preview</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            THE FASHION DISCONNECT
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Finding a tailor in Nigeria is easy. Getting exactly what you want is not. 
            Miscommunication, wrong measurements, mismatched expectations — that's how 
            "What I Ordered vs. What I Got" happens.
          </p>
          <p className="text-xl font-semibold text-primary">
            The problem isn't skill. It's clarity. BOOM fixes that.
          </p>
        </div>
      </section>

      {/* Introducing BOOM Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              INTRODUCING BOOM
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              The AI platform that turns client descriptions into clear outfit visuals, 
              so tailors always know exactly what to sew — no more guesswork.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">AI Visualisation Studio</h3>
              <p className="text-muted-foreground leading-relaxed">
                Describe the outfit you want. Instantly see a clear AI sample on a model — fabrics, silhouette, details.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Client → Tailor Clarity</h3>
              <p className="text-muted-foreground leading-relaxed">
                Send your AI sample to your tailor directly from BOOM. No miscommunication.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Designer Portfolio Boost</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailors can upload their previous work to attract clients who love their style.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                <Palette className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Fabric Suggestions</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI recommends fabrics based on the outfit and the local market. <span className="text-primary text-sm font-medium">(Early Access)</span>
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Local Tailor Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find tailors by location, skill, and verified reviews.
              </p>
            </Card>

            <Card className="p-6 space-y-4 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Project Timeline Guide</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI suggests realistic timelines based on complexity.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Built for Nigeria Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Built for Nigeria. Powered by AI.
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Lagos to Abuja to Port Harcourt, we understand the struggle. BOOM is designed 
            for the realities of Nigerian fashion — unreliable descriptions, last-minute rush, 
            unclear measurements. We bring clarity, transparency, confidence, and better results 
            for both clients and tailors.
          </p>

          <div className="py-8">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-8 py-4 rounded-full">
              <span className="text-2xl font-bold text-primary">2,000+</span>
              <span className="text-foreground font-medium">people have already joined the waitlist</span>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist-section" className="py-20 px-4 bg-foreground">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-background">
            SKIP THE QUEUE.
          </h2>
          
          <p className="text-lg sm:text-xl text-background/80">
            Join BOOM today and be first in line for our Early Access launch.
          </p>

          <div className="pt-4 bg-background rounded-3xl p-8 shadow-2xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-foreground text-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img src={boomLogo} alt="BOOM Logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="font-headline text-2xl font-bold">BOOM</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="mailto:aycondesigns@gmail.com" className="hover:text-primary transition-colors">Contact</a>
            </nav>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-background/10 text-center text-sm text-background/60">
            © 2025 BOOM. Built for Nigerian Fashion.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
