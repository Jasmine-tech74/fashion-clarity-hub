import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import boomLogo from "@/assets/boom-logo-new.jpg";
import { 
  Wand2, 
  Sparkles, 
  Upload, 
  ArrowLeft,
  Loader2,
  Download,
  MessageSquare,
  Check,
  X,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import { findMatchingMockup, isDescriptionTooComplex, type MockupInput } from "@/lib/mockupMatcher";

const DesignGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [mockupName, setMockupName] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  
  // Form state
  const [gender, setGender] = useState("");
  const [outfitType, setOutfitType] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fitStyle, setFitStyle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Feedback state
  const [feedbackMatch, setFeedbackMatch] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!gender || !outfitType || !fabricType || !fitStyle) {
      toast({
        title: "Missing information",
        description: "Please select all required options before generating.",
        variant: "destructive",
      });
      return;
    }

    // Check for overly complex descriptions
    if (isDescriptionTooComplex(description)) {
      toast({
        title: "Design too complex",
        description: "For best results, please describe a simple Nigerian outfit. Advanced designs are coming in later versions.",
      });
      return;
    }

    setIsGenerating(true);
    setShowResult(false);
    setFeedbackSubmitted(false);
    setFeedbackMatch(null);
    setFeedbackText("");

    // Simulate processing delay for user experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const input: MockupInput = {
        gender,
        outfitType,
        fabricType,
        fitStyle,
        description,
      };

      const result = findMatchingMockup(input);
      
      setGeneratedImage(result.image);
      setMockupName(result.name);
      setShowResult(true);

      toast({
        title: "Preview ready!",
        description: "Your design preview is ready for review.",
      });

      // Log the generation for internal analytics
      console.log("[MVP Feedback Log] Generation:", {
        timestamp: new Date().toISOString(),
        inputs: { gender, outfitType, fabricType, fitStyle, description },
        matchedMockup: result.name,
        isExactMatch: result.isExactMatch,
      });

    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFeedbackSubmit = () => {
    if (!feedbackMatch) {
      toast({
        title: "Please answer the question",
        description: "Let us know if the preview matches what you had in mind.",
        variant: "destructive",
      });
      return;
    }

    // Log feedback for internal analytics
    console.log("[MVP Feedback Log] User Feedback:", {
      timestamp: new Date().toISOString(),
      inputs: { gender, outfitType, fabricType, fitStyle, description },
      matchedMockup: mockupName,
      feedback: {
        matchesExpectation: feedbackMatch === "yes",
        additionalFeedback: feedbackText,
      },
    });

    setFeedbackSubmitted(true);
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve Boom for Nigerian tailors.",
    });
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `boom-preview-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartOver = () => {
    setShowResult(false);
    setGeneratedImage(null);
    setFeedbackMatch(null);
    setFeedbackText("");
    setFeedbackSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={boomLogo} alt="BOOM Logo" className="h-10 w-10 rounded-lg object-contain bg-background" />
            <span className="font-headline text-xl font-bold text-foreground">BOOM</span>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Page Title */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Early Beta Preview
          </div>
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            AI Fashion Design Generator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Turn your client's idea into a clear visual reference before production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-6 md:p-8 border-2 border-border rounded-2xl">
            <h2 className="font-headline text-xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              Describe Your Design
            </h2>
            
            {/* Guidance Text */}
            <div className="flex items-start gap-2 mb-6 p-3 bg-accent/50 rounded-lg">
              <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                For best results, describe a simple Nigerian outfit (e.g., native wear, senator, gown, suit).
              </p>
            </div>

            <div className="space-y-5">
              {/* Gender Select */}
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm font-medium">
                  Who is this outfit for? <span className="text-destructive">*</span>
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger id="gender" className="bg-background">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Outfit Type Select */}
              <div className="space-y-2">
                <Label htmlFor="outfit" className="text-sm font-medium">
                  Outfit Type <span className="text-destructive">*</span>
                </Label>
                <Select value={outfitType} onValueChange={setOutfitType}>
                  <SelectTrigger id="outfit" className="bg-background">
                    <SelectValue placeholder="Select outfit type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="native-wear">Native Wear</SelectItem>
                    <SelectItem value="shirt-trousers">English Wear / Suit</SelectItem>
                    <SelectItem value="wedding">Wedding Outfit</SelectItem>
                    <SelectItem value="casual">Casual Wear</SelectItem>
                    <SelectItem value="gown">Gown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fabric Type Select */}
              <div className="space-y-2">
                <Label htmlFor="fabric" className="text-sm font-medium">
                  Fabric Type <span className="text-destructive">*</span>
                </Label>
                <Select value={fabricType} onValueChange={setFabricType}>
                  <SelectTrigger id="fabric" className="bg-background">
                    <SelectValue placeholder="Select fabric type" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="ankara">Ankara</SelectItem>
                    <SelectItem value="lace">Lace</SelectItem>
                    <SelectItem value="aso-oke">Aso-Oke</SelectItem>
                    <SelectItem value="cotton">Plain Cotton</SelectItem>
                    <SelectItem value="senator">Senator Material</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Fit Style Select */}
              <div className="space-y-2">
                <Label htmlFor="fit" className="text-sm font-medium">
                  Fit Style <span className="text-destructive">*</span>
                </Label>
                <Select value={fitStyle} onValueChange={setFitStyle}>
                  <SelectTrigger id="fit" className="bg-background">
                    <SelectValue placeholder="Select fit style" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="loose">Loose</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Upload a sketch or inspiration image (optional)
                </Label>
                <div className="border-2 border-dashed border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div className="space-y-2">
                        <img
                          src={uploadedImage}
                          alt="Uploaded preview"
                          className="max-h-32 mx-auto rounded-lg object-contain"
                        />
                        <p className="text-xs text-muted-foreground">Click to change</p>
                      </div>
                    ) : (
                      <div className="space-y-2 py-4">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Describe the outfit in simple words (optional)
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="E.g., White senator with simple embroidery, agbada for groom..."
                  className="min-h-[100px] resize-none bg-background"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary-glow rounded-xl"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Preview...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-2" />
                    Generate Design
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6 md:p-8 border-2 border-border rounded-2xl">
            <h2 className="font-headline text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Design Preview
            </h2>

            {showResult && generatedImage ? (
              <div className="space-y-6">
                {/* Generated Image */}
                <div className="relative group">
                  <img
                    src={generatedImage}
                    alt="Design preview"
                    className="w-full rounded-xl border border-border"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={handleDownload}
                      className="shadow-lg"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {/* Labels */}
                <div className="text-center space-y-2 p-4 bg-accent/30 rounded-xl">
                  <p className="text-sm font-semibold text-foreground">
                    AI-assisted preview (early beta simulation)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This preview is for testing clarity of communication between client and tailor.
                  </p>
                </div>

                {/* Feedback Section */}
                {!feedbackSubmitted ? (
                  <div className="space-y-4 p-4 bg-muted/30 rounded-xl border border-border">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold text-foreground">Quick Feedback</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">
                        Does this match what you had in mind?
                      </Label>
                      <RadioGroup value={feedbackMatch || ""} onValueChange={setFeedbackMatch} className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="feedback-yes" />
                          <Label htmlFor="feedback-yes" className="flex items-center gap-1 cursor-pointer">
                            <Check className="w-4 h-4 text-green-600" />
                            Yes
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="feedback-no" />
                          <Label htmlFor="feedback-no" className="flex items-center gap-1 cursor-pointer">
                            <X className="w-4 h-4 text-red-500" />
                            No
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="feedback-text" className="text-sm font-medium">
                        What is missing or unclear? (optional)
                      </Label>
                      <Textarea
                        id="feedback-text"
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Tell us what could be better..."
                        className="min-h-[80px] resize-none bg-background"
                      />
                    </div>

                    <Button onClick={handleFeedbackSubmit} className="w-full">
                      Submit Feedback
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800 text-center">
                    <Check className="w-8 h-8 mx-auto text-green-600 mb-2" />
                    <p className="font-semibold text-green-800 dark:text-green-200">
                      Thank you for your feedback!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your input helps us improve Boom.
                    </p>
                  </div>
                )}

                {/* Start Over Button */}
                <Button
                  variant="outline"
                  onClick={handleStartOver}
                  className="w-full"
                >
                  Try Another Design
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-center space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center">
                  <Wand2 className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground font-medium">
                    No designs generated yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Fill in the form and click "Generate Design" to see your preview
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* MVP Note */}
        <div className="mt-10 text-center">
          <Card className="inline-block px-6 py-4 bg-muted/30 border-0 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Early Access Beta:</span> This is a visualization tool to help tailors and clients communicate better. We're actively improving based on your feedback.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DesignGenerator;
