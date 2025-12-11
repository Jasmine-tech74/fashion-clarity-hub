import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import boomLogo from "@/assets/boom-logo-new.jpg";
import { 
  Sparkles, 
  Upload, 
  Palette,
  Eye,
  MessageSquareOff,
  CheckCircle,
  Users,
  Instagram,
  Twitter,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={boomLogo} alt="BOOM Logo" className="h-12 w-12 rounded-lg object-contain bg-background" />
            <span className="font-headline text-2xl font-bold text-foreground">BOOM</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-foreground hover:text-primary transition-colors font-medium">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors font-medium">About</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-muted-foreground hover:text-primary transition-colors font-medium">How it Works</button>
            <button onClick={() => scrollToSection('showcase')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Showcase</button>
            <button onClick={() => scrollToSection('waitlist-section')} className="text-muted-foreground hover:text-primary transition-colors font-medium">Contact</button>
          </nav>

          <Button onClick={scrollToWaitlist} className="bg-primary hover:bg-primary-glow rounded-full px-6">
            Join Waitlist
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 px-4 overflow-hidden bg-background">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight tracking-tight">
              Bring Your Fashion Ideas to Life —<br />
              <span className="text-gradient">See Your Outfit Before It's Made</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Describe what you want, upload a sketch or photo, and let our AI generate a realistic mockup. 
              <span className="text-foreground font-medium"> Boom helps clients and designers communicate clearly — no surprises, no guesswork.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={scrollToWaitlist}
                size="lg" 
                className="h-14 px-8 text-lg font-semibold bg-primary hover:bg-primary-glow rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                Start Visualizing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={scrollToWaitlist}
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full transition-all"
              >
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 bg-background border-2 border-border rounded-2xl shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Upload className="h-4 w-4" />
                    Your Description / Sketch
                  </div>
                  <div className="aspect-[4/5] bg-muted rounded-xl flex items-center justify-center p-6">
                    <p className="text-muted-foreground text-center italic">
                      "I want a flowing agbada in royal blue with gold embroidery on the collar..."
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-background border-2 border-primary/30 rounded-2xl shadow-lg shadow-primary/5">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    <Sparkles className="h-4 w-4" />
                    AI-Generated Mockup
                  </div>
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Eye className="h-12 w-12 text-primary mx-auto" />
                      <p className="text-primary font-bold">Realistic AI Preview</p>
                      <p className="text-sm text-muted-foreground">See before production begins</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About / Problem Section */}
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            End the "What I Ordered vs What I Got" Problem
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Miscommunication between clients and tailors leads to disappointment, wasted materials, and lost trust. 
            The problem isn't skill — it's clarity.
          </p>
          <p className="text-xl font-semibold text-primary">
            Boom is the AI-powered visualization hub that bridges the gap.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              How Boom Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to visualize your outfit before production
            </p>
          </div>

          {/* 3 Steps */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center space-y-6 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-lg">1</div>
              <h3 className="font-headline text-xl font-bold text-foreground">Describe Your Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload a sketch or write a description of the outfit you want. Be as detailed as you like.
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Palette className="w-8 h-8 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-lg">2</div>
              <h3 className="font-headline text-xl font-bold text-foreground">Choose Fabrics & Style</h3>
              <p className="text-muted-foreground leading-relaxed">
                Select your preferred cloth types, colors, and style preferences to customize the look.
              </p>
            </Card>

            <Card className="p-8 text-center space-y-6 bg-background border-2 border-border rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-bold text-lg">3</div>
              <h3 className="font-headline text-xl font-bold text-foreground">See Your Mockup</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get a realistic AI-generated visualization of your outfit before any fabric is cut.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features / Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Why Choose Boom
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 space-y-4 bg-background border border-border rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <MessageSquareOff className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Eliminate Miscommunication</h3>
              <p className="text-muted-foreground leading-relaxed">
                No more "What I ordered vs. what I got." Visual clarity means everyone is on the same page.
              </p>
            </Card>

            <Card className="p-8 space-y-4 bg-background border border-border rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Faster Approval</h3>
              <p className="text-muted-foreground leading-relaxed">
                Designers and clients agree before cutting fabric. Save time, materials, and frustration.
              </p>
            </Card>

            <Card className="p-8 space-y-4 bg-background border border-border rounded-2xl">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold text-foreground">Get More Clients</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tailors showcase quality visuals and grow trust. Attract clients who love your style.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Showcase / Demo Section */}
      <section id="showcase" className="py-20 px-4 bg-background">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Sample Visualizations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how Boom turns ideas into realistic mockups
            </p>
          </div>

          {/* Mockup Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Traditional Agbada", desc: "Royal blue with gold embroidery" },
              { title: "Modern Ankara Dress", desc: "Bold patterns, fitted silhouette" },
              { title: "Aso-Oke Set", desc: "Custom woven, ceremonial style" },
              { title: "Casual Senator", desc: "Clean lines, neutral tones" }
            ].map((item, index) => (
              <Card key={index} className="overflow-hidden rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
                  <div className="text-center space-y-2 p-4">
                    <Sparkles className="h-8 w-8 text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">AI Mockup Preview</p>
                  </div>
                </div>
                <div className="p-4 bg-background">
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist-section" className="py-20 px-4 bg-primary">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground">
            Be Among the First to Access Boom
          </h2>
          
          <p className="text-lg sm:text-xl text-primary-foreground/90">
            Start creating better fashion outcomes. Join our waitlist today and get early access when we launch.
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
              <img src={boomLogo} alt="BOOM Logo" className="h-10 w-10 rounded-lg object-contain bg-background" />
              <span className="font-headline text-2xl font-bold">BOOM</span>
            </div>
            
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">About</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
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
            © 2025 BOOM — All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;