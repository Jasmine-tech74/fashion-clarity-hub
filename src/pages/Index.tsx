import { useState } from "react";
import { Link } from "react-router-dom";
import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import boomLogo from "@/assets/boom-logo-new.jpg";
import { 
  Sparkles, 
  PenLine,
  Eye,
  CheckCircle,
  Users,
  Shield,
  Clock,
  ThumbsUp,
  MessageCircle,
  Zap,
  Instagram,
  Twitter,
  Facebook,
  ArrowRight,
  Menu,
  X,
  Palette,
  Wand2
} from "lucide-react";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={boomLogo} alt="BOOM Logo" className="h-10 w-10 rounded-lg object-contain bg-background" />
            <span className="font-headline text-xl font-bold text-foreground">BOOM</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-foreground hover:text-primary transition-colors font-medium text-sm">Home</button>
            <button onClick={() => scrollToSection('problem')} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">About</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">How it Works</button>
            <button onClick={() => scrollToSection('design-studio')} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">Design Studio</button>
            <button onClick={() => scrollToSection('waitlist-section')} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">Contact</button>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => scrollToSection('design-studio')} size="sm" className="hidden sm:flex bg-primary hover:bg-primary-glow rounded-full px-5 text-sm">
              <Wand2 className="w-4 h-4 mr-1" />
              Try Design Generator
            </Button>
            
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-fade-in">
            <div className="container mx-auto max-w-6xl px-4 py-4 flex flex-col gap-2">
              <button onClick={() => scrollToSection('hero')} className="text-left py-3 px-4 rounded-lg text-foreground hover:bg-muted transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('problem')} className="text-left py-3 px-4 rounded-lg text-muted-foreground hover:bg-muted transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left py-3 px-4 rounded-lg text-muted-foreground hover:bg-muted transition-colors font-medium">How it Works</button>
              <button onClick={() => scrollToSection('design-studio')} className="text-left py-3 px-4 rounded-lg text-muted-foreground hover:bg-muted transition-colors font-medium">Design Studio</button>
              <button onClick={() => scrollToSection('waitlist-section')} className="text-left py-3 px-4 rounded-lg text-muted-foreground hover:bg-muted transition-colors font-medium">Contact</button>
              <div className="pt-2 border-t border-border mt-2">
                <Button onClick={() => scrollToSection('design-studio')} className="w-full bg-primary hover:bg-primary-glow rounded-full">
                  <Wand2 className="w-4 h-4 mr-2" />
                  Try Design Generator
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* SECTION 1 — HERO */}
      <section id="hero" className="relative pt-28 pb-16 px-4 overflow-hidden bg-background">
        <div className="absolute top-20 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight">
              See the Outfit <span className="text-gradient">Before You Sew It</span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Boom turns a client's idea or description into a realistic AI outfit preview, helping Nigerian tailors avoid costly mistakes and eliminate <span className="font-semibold text-foreground">"What I Ordered vs What I Got."</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => scrollToSection('design-studio')}
                size="lg" 
                className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary-glow rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Wand2 className="w-5 h-5 mr-2" />
                Try Design Generator
              </Button>
            </div>
            
            <button 
              onClick={scrollToWaitlist}
              className="text-sm text-primary hover:text-primary-glow underline underline-offset-4 transition-colors"
            >
              Join the waitlist for early-access updates
            </button>
          </div>

          {/* Hero Visual - Side by Side Cards */}
          <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <Card className="p-5 bg-background border-2 border-border rounded-2xl shadow-md">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    <PenLine className="h-4 w-4" />
                    Client Description / Sketch
                  </div>
                  <div className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center p-4">
                    <p className="text-muted-foreground text-center italic text-sm leading-relaxed">
                      "I want a flowing agbada in royal blue with gold embroidery on the collar and sleeves..."
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-5 bg-background border-2 border-primary/40 rounded-2xl shadow-md shadow-primary/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wide">
                    <Sparkles className="h-4 w-4" />
                    AI-Generated Preview
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Eye className="h-10 w-10 text-primary mx-auto" />
                      <p className="text-primary font-bold text-sm">Realistic Preview</p>
                      <p className="text-xs text-muted-foreground">See before production</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — CORE PROBLEM */}
      <section id="problem" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center space-y-6 animate-fade-in">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            The Real Problem Tailors Face in Nigeria
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Miscommunication ruins good tailoring. Clients describe one thing, tailors interpret another. Wrong styles, wrong fittings, wasted fabric, and unhappy customers.
          </p>
          <p className="text-base sm:text-lg text-foreground font-medium">
            <span className="text-primary">Boom solves this</span> by turning descriptions into clear visual previews — so tailors and clients agree before sewing begins.
          </p>
        </div>
      </section>

      {/* SECTION 3 — HOW BOOM WORKS */}
      <section id="how-it-works" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              How Boom Works
            </h2>
          </div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-xl">1</div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">Describe the Outfit</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Client types or uploads a rough sketch of what they want.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-xl">2</div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">AI Visualizes It</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Boom generates a clean preview showing the exact style, color, and details.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-xl">3</div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">Tailor Approves & Sews</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Both sides agree. No guesswork. No surprises.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* DESIGN STUDIO PREVIEW SECTION */}
      <section id="design-studio" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6 animate-fade-in mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              NEW: Design Studio Beta
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Your AI Fashion Design Studio
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the power of AI-driven fashion visualization. Describe your dream outfit and watch it come to life in seconds.
            </p>
          </div>

          {/* Premium Preview Card */}
          <Card className="relative overflow-hidden border-2 border-primary/20 rounded-3xl shadow-2xl bg-background">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Studio Preview */}
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-2xl p-6 border border-border">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-2 text-xs text-muted-foreground font-mono">design-studio.boom</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Palette className="w-5 h-5 text-primary" />
                        <div className="h-8 bg-muted rounded-lg flex-1 flex items-center px-3">
                          <span className="text-sm text-muted-foreground">Describe your outfit here...</span>
                        </div>
                      </div>
                      
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                            <Wand2 className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground">AI Preview Appears Here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Features & CTA */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">AI-Powered Generation</h4>
                        <p className="text-sm text-muted-foreground">State-of-the-art AI creates realistic outfit previews</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Instant Results</h4>
                        <p className="text-sm text-muted-foreground">See your design visualization in seconds</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Eye className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">Multiple Angles</h4>
                        <p className="text-sm text-muted-foreground">View your outfit from different perspectives</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link to="/design-generator">
                      <Button 
                        size="lg" 
                        className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-glow rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
                      >
                        <Wand2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                        Open Design Generator
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Free during beta • No credit card required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* SECTION 4 — BENEFITS FOR TAILORS */}
      <section id="benefits-tailors" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Benefits for Tailors
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <Card className="p-6 space-y-3 bg-background border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">No More "What I Ordered vs What I Got"</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Boom shows exactly what the client expects before you start sewing.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-background border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">Save Time & Avoid Revisions</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Clear visuals reduce arguments, back-and-forth changes, and wasted material.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-background border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">Win More Clients</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A tailor that uses AI looks more professional and trustworthy.
              </p>
            </Card>

            <Card className="p-6 space-y-3 bg-background border border-border rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-lg font-bold text-foreground">Protect Your Reputation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Satisfied clients = more referrals and repeat business.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BENEFITS FOR CLIENTS */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-8 animate-fade-in">
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Confidence Before You Sew
            </h2>
            
            <div className="bg-muted/50 rounded-2xl p-8 space-y-4 text-left max-w-xl mx-auto">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Know exactly how your outfit will look</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Avoid disappointment and wasted money</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Approve designs faster and easier</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">Better communication with your tailor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — WAITLIST */}
      <section id="waitlist-section" className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-xl text-center space-y-6">
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
            Get Early Access to Boom
          </h2>
          
          <p className="text-base text-primary-foreground/90">
            Enter your email to join the beta release for Nigerian fashion creators.
          </p>

          <div className="pt-4 bg-background rounded-2xl p-6 shadow-xl">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* SECTION 7 — FOOTER */}
      <footer className="py-10 px-4 bg-foreground text-background">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={boomLogo} alt="BOOM Logo" className="h-9 w-9 rounded-lg object-contain bg-background" />
              <span className="font-headline text-xl font-bold">BOOM</span>
            </div>
            
            <p className="text-sm text-background/70 text-center">
              Built in Nigeria for Nigerian fashion creators.
            </p>

            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-background/10 text-center text-sm text-background/50">
            © 2025 BOOM — All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
