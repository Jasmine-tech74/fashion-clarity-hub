import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { gender, outfitType, fabricType, fitStyle, description } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build a detailed fashion prompt
    const prompt = buildFashionPrompt(gender, outfitType, fabricType, fitStyle, description);
    console.log("Generating image with prompt:", prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract generated images from response
    const images = data.choices?.[0]?.message?.images || [];
    const textContent = data.choices?.[0]?.message?.content || "";

    return new Response(
      JSON.stringify({ 
        images: images.map((img: any) => img.image_url?.url || img.url),
        description: textContent 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in generate-fashion-image function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildFashionPrompt(
  gender: string,
  outfitType: string,
  fabricType: string,
  fitStyle: string,
  description?: string
): string {
  const genderText = gender === "men" ? "man" : gender === "women" ? "woman" : "child";
  
  const outfitDescriptions: Record<string, string> = {
    "native-wear": "traditional Nigerian native attire (agbada, kaftan, buba)",
    "gown": "elegant full-length gown dress",
    "shirt-trousers": "matching shirt and trousers ensemble",
    "wedding": "luxurious Nigerian wedding outfit",
    "casual": "casual everyday wear"
  };

  const fabricDescriptions: Record<string, string> = {
    "ankara": "colorful Ankara print fabric with bold African patterns",
    "lace": "delicate lace fabric with intricate patterns",
    "aso-oke": "handwoven Aso-Oke fabric with traditional stripes",
    "cotton": "smooth plain cotton fabric",
    "senator": "senator material with subtle sheen"
  };

  const fitText = fitStyle === "fitted" ? "tailored and fitted" : "loose and flowing";
  
  let prompt = `Create a high-quality, realistic fashion photograph of a Nigerian ${genderText} wearing a ${outfitDescriptions[outfitType] || outfitType}. `;
  prompt += `The outfit is made from ${fabricDescriptions[fabricType] || fabricType}. `;
  prompt += `The fit is ${fitText}. `;
  prompt += `Studio lighting, professional fashion photography style, clean white background, full body shot showing the complete outfit. `;
  prompt += `The image should look like a high-end fashion catalog photo. Ultra high resolution.`;
  
  if (description) {
    prompt += ` Additional details: ${description}`;
  }

  return prompt;
}
