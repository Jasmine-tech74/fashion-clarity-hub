import { WaitlistForm } from "@/components/WaitlistForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Sparkles, 
  Users, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Share2,
  Instagram,
  Twitter
} from "lucide-react";

const Index = () => {
  const handleShare = (platform: string) => {
    const text = "Join me on the BOOM waitlist - ending 'What I Ordered vs. What I Got' forever!";
    const url = window.location.href;
    
    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + url)}`, "_blank");
    } else if (platform === "instagram") {
      // Instagram doesn't support web sharing, so we'll just copy to clipboard
      navigator.clipboard.writeText(url);
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-black py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGNjYzMyIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container mx-auto max-w-5xl relative z-10 animate-fade-in">
          <div className="text-center space-y-8">
            <h1 className="font-headline text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-primary leading-none tracking-tight">
              END THE GUEST WORK.<br />END THE GIST.
            </h1>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-accent leading-tight">
              BOOM: The AI-Powered Platform to End<br />
              'What I Ordered vs. What I Got' Forever.
            </h2>
            
            <p className="text-lg sm:text-xl text-secondary-foreground/90 max-w-3xl mx-auto font-medium">
              We connect designers, stylists, and clients with clarity. See your custom outfit on a model 
              before the first cut is made. <span className="text-primary font-bold">No more surprises. Just perfection.</span>
            </p>

            <div className="pt-8">
              <WaitlistForm />
              <p className="text-sm text-secondary-foreground/70 mt-4">
                Over <span className="text-primary font-bold">2,000+</span> Designers & Fashion Lovers already on the list
              </p>
            </div>
          </div>
        </div>

        {/* Split Screen Visual Placeholder */}
        <div className="container mx-auto max-w-4xl mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-8 bg-card/50 backdrop-blur border-2 border-border">
              <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground font-medium">Rough Sketch</p>
              </div>
            </Card>
            <Card className="p-8 bg-card/50 backdrop-blur border-2 border-primary/30 shadow-[0_0_30px_rgba(255,102,51,0.2)]">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                <p className="text-foreground font-bold">AI-Generated Perfection</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl space-y-16">
          {/* Problem */}
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-destructive">
              The Fashion Disconnect
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              For too long, custom fashion has been plagued by guesswork. The "What I Ordered vs. What I Got" 
              drama costs designers thousands in wasted fabric and time. Complex software isn't built for the 
              fast, mobile workflow of the African designer. High-demand professionals struggle with manual, chaotic bookings.
            </p>
          </div>

          {/* Solution */}
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-primary">
              Introducing BOOM
            </h2>
            <p className="text-lg sm:text-xl text-foreground max-w-3xl mx-auto font-medium">
              The all-in-one ecosystem that eliminates communication risk, connects professionals directly 
              to their clients, and empowers fashion professionals to scale.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(255,102,51,0.2)] transition-all duration-300 border-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">The Connection Hub</h3>
              <p className="text-muted-foreground">
                BOOM is where Designers, Stylists, and Brands meet their next client. Use secure in-app chat 
                to discuss custom orders, share portfolio updates, and build your professional following.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(218,112,214,0.2)] transition-all duration-300 border-2 border-accent/30">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">AI Visualization Studio</h3>
              <p className="text-muted-foreground">
                Turn a quick sketch into a photorealistic model preview instantly. Get Guaranteed Alignment 
                before the fabric touches the scissors.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(255,102,51,0.2)] transition-all duration-300 border-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">Local Discovery</h3>
              <p className="text-muted-foreground">
                Use our map to easily find top-rated designers and tailors around you, specializing in the 
                exact style you need.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(255,102,51,0.2)] transition-all duration-300 border-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">The Boom Wait-list</h3>
              <p className="text-muted-foreground">
                Secure your slot with high-demand professionals through our transparent, in-app booking system. 
                No more messy DMs.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(255,102,51,0.2)] transition-all duration-300 border-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">Secure Commerce</h3>
              <p className="text-muted-foreground">
                Handle all deposits, payments, and order tracking securely within the app.
              </p>
            </Card>

            <Card className="p-6 space-y-4 hover:shadow-[0_0_40px_rgba(255,102,51,0.2)] transition-all duration-300 border-2">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Share2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline text-2xl text-foreground">Professional Portfolio</h3>
              <p className="text-muted-foreground">
                Showcase your work and reach thousands of potential clients looking for your unique style.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Exclusivity Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <h2 className="font-headline text-5xl sm:text-6xl md:text-7xl text-foreground">
            Built for Nigeria.<br />Powered by Vision.
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            From Lagos to Abuja, we understand the hustle. BOOM is made for the mobile-first Nigerian designer, 
            giving you the professional tools needed to scale your business and build unbreakable trust with your clients.
          </p>

          <div className="py-8 space-y-4">
            <p className="text-2xl font-bold text-primary">
              Over 2,000 Designers & Fashion Lovers have already joined the waitlist!
            </p>
            <p className="text-lg text-accent font-semibold">
              Be one of the First 500 users to get a Launch Discount on our premium AI tools.
            </p>
            <p className="text-base text-muted-foreground">
              We are perfecting the AI! Launching <span className="text-primary font-bold">Q3 2026</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-secondary via-secondary/95 to-black">
        <div className="container mx-auto max-w-3xl text-center space-y-8">
          <h2 className="font-headline text-5xl sm:text-6xl text-primary-glow">
            Want to Skip the Queue?
          </h2>
          
          <p className="text-xl text-secondary-foreground/90 font-medium">
            Refer 3 Designers or Clients and skip to the front of the queue!
          </p>

          <div className="pt-4">
            <WaitlistForm />
          </div>

          <div className="pt-8 space-y-4">
            <p className="font-headline text-2xl text-secondary-foreground">Share the BOOM!</p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleShare("whatsapp")}
              >
                <Share2 className="mr-2 h-5 w-5" />
                WhatsApp
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-accent/50 hover:bg-accent hover:text-accent-foreground"
                onClick={() => handleShare("instagram")}
              >
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="mr-2 h-5 w-5" />
                X
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="font-headline text-3xl text-primary">BOOM</div>
            <nav className="flex gap-6 text-sm">
              <a href="#features" className="hover:text-primary transition-colors">Features</a>
              <a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="mailto:aycondesigns@gmail.com" className="hover:text-primary transition-colors">
                Contact Us
              </a>
            </nav>
          </div>
          <div className="mt-6 text-center text-xs text-secondary-foreground/60">
            © 2025 BOOM. Built for Nigerian Fashion Professionals.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
