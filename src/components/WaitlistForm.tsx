import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, User, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WaitlistFormProps {
  variant?: "default" | "compact";
}

export const WaitlistForm = ({ variant = "default" }: WaitlistFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return;
    }

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!userType) {
      toast({
        title: "Please Select",
        description: "Are you a tailor or a client?",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([{ 
          name: name.trim(),
          email: email.toLowerCase().trim(),
          user_type: userType
        }]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: "Already on the list!",
            description: "This email is already registered for the waitlist.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Welcome to BOOM!",
          description: "You're on the waitlist! Check your email for updates.",
        });
        setName("");
        setEmail("");
        setUserType("");
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-lg mx-auto">
      <div className="relative">
        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="pl-12 h-14 bg-background border-2 border-border focus:border-primary rounded-xl text-base transition-colors"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="email"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pl-12 h-14 bg-background border-2 border-border focus:border-primary rounded-xl text-base transition-colors"
          disabled={isSubmitting}
        />
      </div>

      <Select value={userType} onValueChange={setUserType} disabled={isSubmitting}>
        <SelectTrigger className="h-14 bg-background border-2 border-border focus:border-primary rounded-xl text-base">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent className="bg-background border-2 border-border rounded-xl z-50">
          <SelectItem value="client" className="text-base py-3">Client</SelectItem>
          <SelectItem value="designer" className="text-base py-3">Designer</SelectItem>
          <SelectItem value="tailor" className="text-base py-3">Tailor</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="h-14 text-lg font-semibold bg-primary hover:bg-primary-glow rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        {isSubmitting ? "Joining..." : "Join the Beta Waitlist"}
      </Button>
    </form>
  );
};
