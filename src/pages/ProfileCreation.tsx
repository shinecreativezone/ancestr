
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, X, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// List of countries for the multi-select dropdown
const countries = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany", 
  "France", "Japan", "China", "India", "Brazil", "Mexico", "Italy", 
  "Spain", "Russia", "South Korea", "Netherlands", "Sweden", "Norway", 
  "Denmark", "Finland", "Switzerland", "Austria", "Belgium", "Ireland", 
  "Portugal", "Greece", "Poland", "Czech Republic", "Hungary", "Romania", 
  "Bulgaria", "Turkey", "Egypt", "South Africa", "Nigeria", "Kenya", 
  "Israel", "Saudi Arabia", "UAE", "Pakistan", "Bangladesh", "Thailand", 
  "Vietnam", "Indonesia", "Philippines", "Malaysia", "Singapore", "New Zealand"
];

export default function ProfileCreation() {
  const navigate = useNavigate();
  const [avatarType, setAvatarType] = useState<string | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [yearOfDeath, setYearOfDeath] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [placesLived, setPlacesLived] = useState<string[]>([]);
  const [ethnicity, setEthnicity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if user came from the avatar type selection page
  useEffect(() => {
    const storedAvatarType = sessionStorage.getItem("avatarType");
    if (!storedAvatarType) {
      // If no avatar type is stored, redirect back to the selection page
      navigate("/avatar-type");
      return;
    }
    
    setAvatarType(storedAvatarType);
  }, [navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    
    // Check if adding these files would exceed the maximum of 5
    if (images.length + selectedFiles.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images.",
        variant: "destructive"
      });
      return;
    }
    
    // Add the new files to the existing ones
    setImages([...images, ...selectedFiles]);
    
    // Create preview URLs for the new files
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
    
    // Clear the file input
    e.target.value = "";
    
    // Clear any existing error for images
    if (errors.images) {
      setErrors({...errors, images: ""});
    }
  };

  const removeImage = (index: number) => {
    // Create new arrays without the item at the specified index
    const newImages = [...images];
    const newPreviews = [...previews];
    
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const addPlaceLived = (country: string) => {
    if (!placesLived.includes(country)) {
      setPlacesLived([...placesLived, country]);
    }
  };

  const removePlaceLived = (country: string) => {
    setPlacesLived(placesLived.filter(place => place !== country));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate images (minimum 3)
    if (images.length < 3) {
      newErrors.images = "Please upload at least 3 images";
    }
    
    // Validate year of birth (required)
    if (!yearOfBirth) {
      newErrors.yearOfBirth = "Year of birth is required";
    } else if (!/^\d{4}$/.test(yearOfBirth)) {
      newErrors.yearOfBirth = "Please enter a valid 4-digit year";
    }
    
    // Validate year of death (optional, but if provided must be valid)
    if (yearOfDeath && !/^\d{4}$/.test(yearOfDeath)) {
      newErrors.yearOfDeath = "Please enter a valid 4-digit year";
    }
    
    // Validate birth place (required)
    if (!birthPlace.trim()) {
      newErrors.birthPlace = "Place of birth is required";
    }
    
    // Validate places lived (at least one)
    if (placesLived.length === 0) {
      newErrors.placesLived = "Please select at least one country";
    }
    
    // Validate ethnicity (required)
    if (!ethnicity.trim()) {
      newErrors.ethnicity = "Ethnicity is required";
    }
    
    setErrors(newErrors);
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Form has errors, don't proceed
      toast({
        title: "Please check your inputs",
        description: "Some required information is missing or invalid.",
        variant: "destructive"
      });
      return;
    }
    
    // Save profile data to session storage
    const profileData = {
      avatarType,
      yearOfBirth,
      yearOfDeath,
      birthPlace,
      placesLived,
      ethnicity,
      imageCount: images.length
    };
    
    sessionStorage.setItem("avatarProfile", JSON.stringify(profileData));
    
    // For a real application, you would upload the images to your server here
    // For now, we'll just simulate storing them and proceed to the next step
    toast({
      title: "Profile saved",
      description: "Your profile information has been saved. Proceeding to personality assessment."
    });
    
    // Navigate to the personality sliders page
    navigate("/personality-sliders");
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Create {avatarType === "self" ? "Your" : "Their"} Profile
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let's gather some basic information to create 
              {avatarType === "self" ? " your" : " their"} digital twin.
            </p>
          </div>

          <Card className="p-6">
            <CardContent className="p-0">
              <form className="space-y-8">
                {/* Photo Upload Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Photos</h2>
                  <p className="text-gray-600 text-sm">
                    Please upload 3-5 clear photos. Front-facing images work best.
                  </p>
                  
                  {/* Image Upload Section */}
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.images ? 'border-red-500' : 'border-gray-300'}`}>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/jpeg,image/png"
                      onChange={handleFileChange}
                      className="hidden"
                      multiple
                    />
                    
                    {previews.length === 0 ? (
                      <label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                          <UploadCloud className="h-6 w-6 text-gray-500" />
                        </div>
                        <p className="text-sm text-gray-600">
                          Drag photos here or <span className="text-blue-600">browse</span>
                        </p>
                      </label>
                    ) : (
                      <div>
                        <div className="flex flex-wrap gap-4 mb-4">
                          {previews.map((preview, index) => (
                            <div key={index} className="relative w-24 h-24">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          
                          {/* Add more photos button (if less than 5) */}
                          {previews.length < 5 && (
                            <label 
                              htmlFor="image-upload" 
                              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer"
                            >
                              <Camera className="h-8 w-8 text-gray-400" />
                            </label>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {previews.length} of 5 photos uploaded
                        </p>
                      </div>
                    )}
                    
                    {errors.images && (
                      <p className="text-red-500 text-sm mt-2">{errors.images}</p>
                    )}
                  </div>
                </div>
                
                {/* Demographic Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Demographics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Year of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="yearOfBirth">Year of Birth <span className="text-red-500">*</span></Label>
                      <Input
                        id="yearOfBirth"
                        type="number"
                        placeholder="YYYY"
                        value={yearOfBirth}
                        onChange={(e) => setYearOfBirth(e.target.value)}
                        className={errors.yearOfBirth ? "border-red-500" : ""}
                      />
                      {errors.yearOfBirth && (
                        <p className="text-red-500 text-sm">{errors.yearOfBirth}</p>
                      )}
                    </div>
                    
                    {/* Year of Death */}
                    <div className="space-y-2">
                      <Label htmlFor="yearOfDeath">Year of Death (if applicable)</Label>
                      <Input
                        id="yearOfDeath"
                        type="number"
                        placeholder="YYYY"
                        value={yearOfDeath}
                        onChange={(e) => setYearOfDeath(e.target.value)}
                        className={errors.yearOfDeath ? "border-red-500" : ""}
                      />
                      {errors.yearOfDeath && (
                        <p className="text-red-500 text-sm">{errors.yearOfDeath}</p>
                      )}
                    </div>
                    
                    {/* Place of Birth */}
                    <div className="space-y-2">
                      <Label htmlFor="birthPlace">Place of Birth <span className="text-red-500">*</span></Label>
                      <Input
                        id="birthPlace"
                        placeholder="City, Country"
                        value={birthPlace}
                        onChange={(e) => setBirthPlace(e.target.value)}
                        className={errors.birthPlace ? "border-red-500" : ""}
                      />
                      {errors.birthPlace && (
                        <p className="text-red-500 text-sm">{errors.birthPlace}</p>
                      )}
                    </div>
                    
                    {/* Ethnicity */}
                    <div className="space-y-2">
                      <Label htmlFor="ethnicity">Ethnicity <span className="text-red-500">*</span></Label>
                      <Input
                        id="ethnicity"
                        placeholder="e.g., Caucasian, Asian, Hispanic, etc."
                        value={ethnicity}
                        onChange={(e) => setEthnicity(e.target.value)}
                        className={errors.ethnicity ? "border-red-500" : ""}
                      />
                      {errors.ethnicity && (
                        <p className="text-red-500 text-sm">{errors.ethnicity}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Places Lived - Multi-select */}
                  <div className="space-y-2">
                    <Label>Places Lived <span className="text-red-500">*</span></Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {placesLived.map((place) => (
                        <div 
                          key={place} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                        >
                          {place}
                          <button 
                            type="button" 
                            onClick={() => removePlaceLived(place)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <Select onValueChange={(value) => addPlaceLived(value)}>
                      <SelectTrigger className={errors.placesLived ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select countries" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries
                          .filter(country => !placesLived.includes(country))
                          .map(country => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    
                    {errors.placesLived && (
                      <p className="text-red-500 text-sm">{errors.placesLived}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/avatar-type")}
                  >
                    Back
                  </Button>
                  <Button type="button" onClick={handleSubmit}>
                    Continue to Personality
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
