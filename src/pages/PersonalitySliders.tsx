
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

// Define the personality traits with their labels
const personalityTraits = [
  {
    id: "optimism",
    label: "Optimism",
    leftLabel: "Pessimistic",
    rightLabel: "Optimistic",
    description: "General outlook on life and expectations for the future."
  },
  {
    id: "extraversion",
    label: "Social Energy",
    leftLabel: "Introverted",
    rightLabel: "Extroverted",
    description: "Preference for social interaction and external stimulation."
  },
  {
    id: "organization",
    label: "Organization",
    leftLabel: "Disorganized",
    rightLabel: "Organized",
    description: "Approach to structure, planning, and orderliness."
  },
  {
    id: "riskTaking",
    label: "Risk Preference",
    leftLabel: "Cautious",
    rightLabel: "Risk Taking",
    description: "Comfort with uncertainty and willingness to take chances."
  },
  {
    id: "thinkingStyle",
    label: "Thinking Style",
    leftLabel: "Intuitive",
    rightLabel: "Analytical",
    description: "Reliance on feeling versus logical analysis."
  },
  {
    id: "attitudeToChange",
    label: "Attitude to Change",
    leftLabel: "Avoids Change",
    rightLabel: "Loves Change",
    description: "Response to new situations and environments."
  },
  {
    id: "patience",
    label: "Patience",
    leftLabel: "Impatient",
    rightLabel: "Patient",
    description: "Ability to wait calmly or tolerate delays."
  },
  {
    id: "communicationStyle",
    label: "Communication Style",
    leftLabel: "Blunt",
    rightLabel: "Diplomatic",
    description: "Approach to expressing thoughts and opinions."
  }
];

export default function PersonalitySliders() {
  const navigate = useNavigate();
  const [avatarProfile, setAvatarProfile] = useState<any>(null);
  const [personalityValues, setPersonalityValues] = useState<Record<string, number>>({});

  // Check if user came from the profile creation page
  useEffect(() => {
    // Initialize all sliders to 0.5 (middle position)
    const initialValues: Record<string, number> = {};
    personalityTraits.forEach(trait => {
      initialValues[trait.id] = 0.5;
    });
    setPersonalityValues(initialValues);
    
    // Get avatar profile from session storage
    const storedProfile = sessionStorage.getItem("avatarProfile");
    if (!storedProfile) {
      // If no profile is stored, redirect back to the profile creation page
      navigate("/profile-creation");
      return;
    }
    
    try {
      setAvatarProfile(JSON.parse(storedProfile));
    } catch (error) {
      console.error("Error parsing stored profile:", error);
      navigate("/profile-creation");
    }
  }, [navigate]);

  const handleSliderChange = (traitId: string, value: number[]) => {
    setPersonalityValues({
      ...personalityValues,
      [traitId]: value[0]
    });
  };

  const handleSubmit = () => {
    // Save personality data to session storage
    sessionStorage.setItem("personalityProfile", JSON.stringify(personalityValues));
    
    // Combine with avatar profile for a complete dataset
    const completeProfile = {
      ...avatarProfile,
      personality: personalityValues
    };
    
    // In a real application, you would send this data to your backend
    console.log("Complete profile to be submitted:", completeProfile);
    
    toast({
      title: "Profile Complete!",
      description: "Your avatar profile has been created. Proceeding to data upload."
    });
    
    // Navigate to the dashboard
    navigate("/dashboard");
  };

  const handleSkip = () => {
    // Set default values
    sessionStorage.setItem("personalityProfile", JSON.stringify(personalityValues));
    
    toast({
      title: "Profile Created",
      description: "Default personality values have been set. You can update them later."
    });

    // Navigate to the next page
    navigate("/dashboard");
  };

  if (!avatarProfile) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Personality Assessment</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Adjust these sliders to reflect the personality traits of 
              {avatarProfile.avatarType === "self" ? " yourself." : " your loved one."}
            </p>
          </div>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="space-y-8">
                {personalityTraits.map((trait) => (
                  <div key={trait.id} className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-lg">{trait.label}</h3>
                      <div className="text-sm text-gray-500 max-w-xs text-right">
                        {trait.description}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2">
                        <div className="text-sm text-gray-600">{trait.leftLabel}</div>
                        <div className="text-sm text-gray-600 text-right">{trait.rightLabel}</div>
                      </div>
                      
                      <Slider
                        onValueChange={(value) => handleSliderChange(trait.id, value)}
                        defaultValue={[0.5]}
                        max={1}
                        step={0.01}
                        value={[personalityValues[trait.id] || 0.5]}
                      />
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between pt-4">
                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate("/profile-creation")}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      onClick={handleSkip}
                    >
                      Skip for Now
                    </Button>
                  </div>
                  <Button type="button" onClick={handleSubmit}>
                    Complete Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
