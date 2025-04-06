
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Info } from "lucide-react";

export default function PersonalitySliders() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Define personality traits with descriptions and slider values
  const [traits, setTraits] = useState({
    optimism: { value: 0.5, label: "Optimism", left: "Pessimistic", right: "Optimistic", 
      description: "Tendency to expect positive outcomes and see the good in situations" },
    extraversion: { value: 0.5, label: "Extraversion", left: "Introverted", right: "Extroverted", 
      description: "Energy from social interactions vs. solitary activities" },
    organization: { value: 0.5, label: "Organization", left: "Disorganized", right: "Organized", 
      description: "Preference for structure, planning, and orderliness" },
    riskTaking: { value: 0.5, label: "Risk Preference", left: "Cautious", right: "Risk Taking", 
      description: "Willingness to take chances or prefer safety" },
    thinkingStyle: { value: 0.5, label: "Thinking Style", left: "Intuitive", right: "Analytical", 
      description: "Reliance on gut feeling vs. logical analysis" },
    changeAttitude: { value: 0.5, label: "Attitude to Change", left: "Avoids Change", right: "Loves Change", 
      description: "Comfort with new situations and changing circumstances" },
    patience: { value: 0.5, label: "Patience", left: "Impatient", right: "Patient", 
      description: "Ability to wait calmly or desire for immediate results" },
    communicationStyle: { value: 0.5, label: "Communication Style", left: "Blunt", right: "Diplomatic", 
      description: "Direct vs. tactful approach to communication" },
  });
  
  const [activeDescription, setActiveDescription] = useState("");
  const [avatarProfile, setAvatarProfile] = useState<any>(null);
  
  useEffect(() => {
    // Load avatar profile from session storage
    const storedProfile = sessionStorage.getItem("avatarProfile");
    if (storedProfile) {
      setAvatarProfile(JSON.parse(storedProfile));
    } else {
      // If no profile exists, redirect to profile creation
      navigate("/avatar-type");
    }
    
    // Check if personality profile already exists
    const storedPersonality = sessionStorage.getItem("personalityProfile");
    if (storedPersonality) {
      setTraits(prev => {
        const stored = JSON.parse(storedPersonality);
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (stored[key] !== undefined) {
            updated[key] = { ...updated[key], value: stored[key] };
          }
        });
        return updated;
      });
    }
  }, [navigate]);
  
  const handleSliderChange = (trait: string, newValue: number[]) => {
    setTraits(prev => ({
      ...prev,
      [trait]: { ...prev[trait as keyof typeof prev], value: newValue[0] }
    }));
  };
  
  const handleSubmit = () => {
    // Extract just the values for storage
    const personalityValues: Record<string, number> = {};
    Object.entries(traits).forEach(([key, data]) => {
      personalityValues[key] = data.value;
    });
    
    // Store in session storage
    sessionStorage.setItem("personalityProfile", JSON.stringify(personalityValues));
    
    toast({
      title: "Personality profile saved",
      description: "Your personality settings have been recorded successfully.",
    });
    
    // Navigate to the next page
    navigate("/twin/upload");
  };
  
  const handleSkip = () => {
    toast({
      title: "Personality profile skipped",
      description: "You can define the personality later from your dashboard.",
    });
    
    // Navigate to the next page
    navigate("/twin/upload");
  };
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Define Personality Traits</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Adjust these sliders to reflect {avatarProfile?.firstName || "your avatar's"} personality traits.
                These settings will help create more authentic interactions.
              </p>
            </div>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Personality Profile</CardTitle>
                <CardDescription>
                  Move each slider to where you feel it best represents the personality trait
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {Object.entries(traits).map(([key, trait]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <label className="text-sm font-medium mr-2">{trait.label}</label>
                        <button 
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          onMouseEnter={() => setActiveDescription(trait.description)}
                          onMouseLeave={() => setActiveDescription("")}
                        >
                          <Info className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {trait.value < 0.4 ? "Low" : trait.value > 0.6 ? "High" : "Balanced"}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-2 text-xs text-gray-500 text-right">{trait.left}</div>
                      <div className="col-span-8">
                        <Slider
                          value={[trait.value]}
                          min={0}
                          max={1}
                          step={0.01}
                          onValueChange={(value) => handleSliderChange(key, value)}
                          className="cursor-pointer"
                        />
                      </div>
                      <div className="col-span-2 text-xs text-gray-500">{trait.right}</div>
                    </div>
                  </div>
                ))}
                
                {activeDescription && (
                  <div className="mt-4 p-3 bg-gray-50 border border-gray-100 rounded-md text-sm text-gray-600 animate-fade-in">
                    {activeDescription}
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" onClick={handleSkip}>
                  Skip for Now
                </Button>
                <Button onClick={handleSubmit} className="btn-gradient">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="text-center text-sm text-gray-500">
              <p>
                These personality traits help create more realistic and personalized conversations.
                You can always update these settings later from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
