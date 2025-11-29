import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to BOOM! 🎉",
      description: "You're on the waitlist! Check your email for updates.",
    });
    
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 h-12 bg-background border-2 border-border focus:border-primary transition-colors"
          disabled={isSubmitting}
        />
      </div>
      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="h-12 px-8 font-semibold bg-primary hover:bg-primary-glow transition-all animate-glow-pulse"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
};
