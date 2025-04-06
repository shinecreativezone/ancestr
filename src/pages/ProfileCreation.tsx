
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function ProfileCreation() {
  const navigate = useNavigate();
  const [avatarType, setAvatarType] = useState<"self" | "loved_one">("self");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [yearOfDeath, setYearOfDeath] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [placesLived, setPlacesLived] = useState<string[]>([]);
  const [currentPlace, setCurrentPlace] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [images, setImages] = useState<string[]>([]);
  
  // Get avatar type from session storage (set on the previous page)
  useEffect(() => {
    const storedType = sessionStorage.getItem("avatarType") as "self" | "loved_one";
    if (!storedType) {
      // If no avatar type is stored, redirect back to avatar type page
      navigate("/avatar-type");
      return;
    }
    setAvatarType(storedType);
  }, [navigate]);
  
  const handleAddPlace = () => {
    if (currentPlace.trim() && !placesLived.includes(currentPlace.trim())) {
      setPlacesLived([...placesLived, currentPlace.trim()]);
      setCurrentPlace("");
    }
  };
  
  const handleRemovePlace = (place: string) => {
    setPlacesLived(placesLived.filter(p => p !== place));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Convert each file to a data URL
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setImages(prev => [...prev, e.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  
  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!yearOfBirth.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a year of birth",
        variant: "destructive"
      });
      return;
    }
    
    // Store profile data in session storage
    const profile = {
      avatarType,
      yearOfBirth,
      yearOfDeath,
      birthPlace,
      placesLived,
      ethnicity,
      imageCount: images.length
    };
    
    sessionStorage.setItem("avatarProfile", JSON.stringify(profile));
    
    // Show success message
    toast({
      title: "Profile saved!",
      description: "Proceeding to personality assessment."
    });
    
    // Navigate to personality sliders page
    navigate("/personality-sliders");
  };
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {avatarType === "self" ? "Create Your Profile" : "Create Your Loved One's Profile"}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let's collect some basic information to get started with your avatar.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-medium mb-4">Photos (Optional)</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Upload up to 5 photos to help create your avatar's appearance.
                    </p>
                    
                    {/* Image upload area */}
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-6 mb-4">
                      <label className="flex flex-col items-center cursor-pointer">
                        <Image className="h-10 w-10 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload images</span>
                        <input 
                          type="file" 
                          className="hidden" 
                          multiple 
                          accept="image/*" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    
                    {/* Preview uploaded images */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200">
                            <img 
                              src={image} 
                              alt={`Uploaded ${index + 1}`} 
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                              onClick={() => handleRemoveImage(index)}
                            >
                              <X className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-xl font-medium mb-4">Basic Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="yearOfBirth">Year of Birth*</Label>
                        <Input
                          id="yearOfBirth"
                          type="number"
                          value={yearOfBirth}
                          onChange={(e) => setYearOfBirth(e.target.value)}
                          required
                          placeholder="e.g. 1980"
                        />
                      </div>
                      
                      {avatarType === "loved_one" && (
                        <div className="space-y-2">
                          <Label htmlFor="yearOfDeath">Year of Death (if applicable)</Label>
                          <Input
                            id="yearOfDeath"
                            type="number"
                            value={yearOfDeath}
                            onChange={(e) => setYearOfDeath(e.target.value)}
                            placeholder="Leave blank if living"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label htmlFor="birthPlace">Place of Birth</Label>
                        <Input
                          id="birthPlace"
                          type="text"
                          value={birthPlace}
                          onChange={(e) => setBirthPlace(e.target.value)}
                          placeholder="e.g. Chicago, IL"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="ethnicity">Ethnicity</Label>
                        <Input
                          id="ethnicity"
                          type="text"
                          value={ethnicity}
                          onChange={(e) => setEthnicity(e.target.value)}
                          placeholder="e.g. Italian-American"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="placesLived">Places Lived</Label>
                      <div className="flex">
                        <Input
                          id="placesLived"
                          type="text"
                          value={currentPlace}
                          onChange={(e) => setCurrentPlace(e.target.value)}
                          placeholder="Add a country or city"
                          className="mr-2"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={handleAddPlace}
                          disabled={!currentPlace.trim()}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {placesLived.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {placesLived.map((place, index) => (
                            <div 
                              key={index}
                              className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                            >
                              {place}
                              <button
                                type="button"
                                className="ml-2 text-gray-500 hover:text-gray-700"
                                onClick={() => handleRemovePlace(place)}
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/avatar-type")}
              >
                Back
              </Button>
              <Button type="submit">Continue to Personality</Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
