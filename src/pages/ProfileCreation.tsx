
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Image, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { checkAvatarLimit, saveAvatarToDatabase } from "@/utils/avatarUtils";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileCreation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const editAvatarId = searchParams.get('edit');
  
  const [avatarType, setAvatarType] = useState<"self" | "loved_one">("self");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [yearOfDeath, setYearOfDeath] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [placesLived, setPlacesLived] = useState<string[]>([]);
  const [currentPlace, setCurrentPlace] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Get avatar type from session storage (set on the previous page)
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    const storedType = sessionStorage.getItem("avatarType") as "self" | "loved_one";
    if (storedType && !editAvatarId) {
      setAvatarType(storedType);
    }
    
    // If editing an existing avatar, fetch its data
    if (editAvatarId) {
      setIsEditing(true);
      fetchAvatarData(editAvatarId);
    } else {
      // If not editing, check if the user has reached the avatar limit
      checkUserAvatarLimit();
    }
  }, [navigate, user, editAvatarId]);
  
  const fetchAvatarData = async (avatarId: string) => {
    try {
      const { data, error } = await supabase
        .from("avatars")
        .select("*")
        .eq("id", avatarId)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setGender(data.gender || "male");
        setYearOfBirth(data.year_of_birth || "");
        setYearOfDeath(data.year_of_death || "");
        setBirthPlace(data.birth_place || "");
        setEthnicity(data.ethnicity || "");
        setImages(data.photos || []);
        setAvatarType(data.year_of_death ? "loved_one" : "self");
      }
    } catch (error) {
      console.error("Error fetching avatar data:", error);
      toast({
        title: "Error",
        description: "Failed to load avatar data.",
        variant: "destructive"
      });
    }
  };
  
  const checkUserAvatarLimit = async () => {
    if (!user) return;
    
    try {
      const canCreateMore = await checkAvatarLimit(user.id);
      if (!canCreateMore) {
        toast({
          title: "Avatar Limit Reached",
          description: "You can only create up to 2 digital twins. Please edit or delete an existing twin.",
          variant: "destructive"
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error checking avatar limit:", error);
    }
  };
  
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
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to create a digital twin.",
        variant: "destructive"
      });
      navigate("/auth");
      return;
    }
    
    // Validate form inputs
    if (!firstName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a first name",
        variant: "destructive"
      });
      return;
    }
    
    if (!yearOfBirth.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter a year of birth",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const avatarData = {
        firstName,
        lastName,
        gender,
        yearOfBirth,
        yearOfDeath,
        birthPlace,
        placesLived,
        ethnicity,
        photos: images
      };
      
      // Save to session storage
      sessionStorage.setItem("avatarProfile", JSON.stringify(avatarData));
      
      if (isEditing && editAvatarId) {
        // Update existing avatar
        const { error } = await supabase
          .from("avatars")
          .update({
            first_name: firstName,
            last_name: lastName,
            gender,
            year_of_birth: yearOfBirth,
            year_of_death: yearOfDeath,
            birth_place: birthPlace,
            ethnicity,
            photos: images,
            updated_at: new Date().toISOString()
          })
          .eq("id", editAvatarId);
          
        if (error) throw error;
        
        toast({
          title: "Avatar updated!",
          description: "Your digital twin has been updated successfully."
        });
        
        navigate("/dashboard");
      } else {
        // Create new avatar
        await saveAvatarToDatabase(user.id, avatarData);
        
        toast({
          title: "Profile saved!",
          description: "Your digital twin has been created successfully."
        });
        
        // Navigate to personality sliders page for new avatars
        navigate("/personality-sliders");
      }
    } catch (error: any) {
      console.error("Error saving avatar:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save your digital twin.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {isEditing 
                ? "Edit Digital Twin" 
                : avatarType === "self" 
                  ? "Create Your Profile" 
                  : "Create Your Loved One's Profile"}
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
                    
                    {/* Name fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          placeholder="e.g. John"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="e.g. Smith"
                        />
                      </div>
                    </div>
                    
                    {/* Gender field */}
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup value={gender} onValueChange={(value) => setGender(value as "male" | "female" | "other")}>
                        <div className="flex space-x-6">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male" className="cursor-pointer">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female" className="cursor-pointer">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other" className="cursor-pointer">Other</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
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
                onClick={() => isEditing ? navigate("/dashboard") : navigate("/avatar-type")}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-[#1F4959] hover:bg-[#011425]"
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Save Changes" : "Continue to Personality"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}
