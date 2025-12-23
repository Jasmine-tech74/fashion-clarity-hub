import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import boomLogo from "@/assets/boom-logo-new.jpg";
import { 
  Wand2, 
  Sparkles, 
  Upload, 
  ArrowLeft,
  Loader2,
  Download,
  RefreshCw
} from "lucide-react";
import { Link } from "react-router-dom";

const DesignGenerator = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  
  // Form state
  const [gender, setGender] = useState("");
  const [outfitType, setOutfitType] = useState("");
  const [fabricType, setFabricType] = useState("");
  const [fitStyle, setFitStyle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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

    setIsGenerating(true);
    setGeneratedImages([]);

    try {
      const { data, error } = await supabase.functions.invoke("generate-fashion-image", {
        body: {
          gender,
          outfitType,
          fabricType,
          fitStyle,
          description,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.images && data.images.length > 0) {
        setGeneratedImages(data.images.filter((img: string) => img));
        toast({
          title: "Design generated!",
          description: "Your fashion visualization is ready.",
        });
      } else {
        throw new Error("No images were generated. Please try again.");
      }
    } catch (error: any) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (imageUrl: string, index: number) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `boom-design-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            AI-Powered Design Tool
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
            <h2 className="font-headline text-xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-primary" />
              Describe Your Design
            </h2>

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
                    <SelectItem value="native-wear">Native wear</SelectItem>
                    <SelectItem value="gown">Gown</SelectItem>
                    <SelectItem value="shirt-trousers">Shirt & Trousers</SelectItem>
                    <SelectItem value="wedding">Wedding outfit</SelectItem>
                    <SelectItem value="casual">Casual wear</SelectItem>
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
                    <SelectItem value="cotton">Plain cotton</SelectItem>
                    <SelectItem value="senator">Senator material</SelectItem>
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
                    <SelectItem value="fitted">Fitted</SelectItem>
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
                  placeholder="E.g., Royal blue agbada with gold embroidery on the collar..."
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
                    Generating Design...
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
              Generated Designs
            </h2>

            {generatedImages.length > 0 ? (
              <div className="space-y-4">
                <div className="grid gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Generated design ${index + 1}`}
                        className="w-full rounded-xl border border-border"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleDownload(image, index)}
                          className="shadow-lg"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate New Variation
                </Button>

                <p className="text-xs text-muted-foreground text-center pt-2 border-t border-border">
                  This is a visual reference to help communication between client and tailor.
                </p>
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
                    Fill in the form and click "Generate Design" to see your AI visualization
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
              <span className="font-semibold text-foreground">Early Access Beta:</span> This is an early-stage visualization tool to help tailors and clients communicate better. Not for final garment production.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DesignGenerator;
