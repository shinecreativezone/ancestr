
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mic, Image as ImageIcon, FileText, MessageSquare, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [avatarProfile, setAvatarProfile] = useState<any>(null);
  const [personalityProfile, setPersonalityProfile] = useState<any>(null);
  const [isContribution, setIsContribution] = useState(false);
  const [qualityScore, setQualityScore] = useState(30);
  
  useEffect(() => {
    // Retrieve profile data from session storage
    const storedAvatarProfile = sessionStorage.getItem("avatarProfile");
    const storedPersonalityProfile = sessionStorage.getItem("personalityProfile");
    const contributionCode = sessionStorage.getItem("contributionCode");
    
    if (storedAvatarProfile) {
      setAvatarProfile(JSON.parse(storedAvatarProfile));
    }
    
    if (storedPersonalityProfile) {
      setPersonalityProfile(JSON.parse(storedPersonalityProfile));
    }
    
    if (contributionCode) {
      setIsContribution(true);
    }
    
    // If no profile data, redirect to avatar type selection
    if (!storedAvatarProfile && !contributionCode) {
      navigate("/avatar-type");
    }
    
    // Calculate quality score based on completed steps
    let score = 30; // Base score for creating a profile
    
    if (storedPersonalityProfile) {
      score += 20; // Additional score for completing personality
    }
    
    // Simulate data uploads contribution to quality
    const hasUploads = Math.random() > 0.5;
    if (hasUploads) {
      score += 25;
    }
    
    setQualityScore(score);
  }, [navigate]);
  
  if (!avatarProfile && !isContribution) {
    return (
      <PageLayout>
        <div className="pt-24 pb-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Loading profile data...</h1>
              <Button onClick={() => navigate("/avatar-type")}>Create a profile</Button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  const displayName = avatarProfile?.firstName ? 
    `${avatarProfile.firstName}${avatarProfile.lastName ? ' ' + avatarProfile.lastName : ''}` : 
    'Your';
    
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  {isContribution ? 
                    "Contribution Dashboard" : 
                    `${displayName}'s Avatar`}
                </h1>
                <p className="text-gray-600">
                  {isContribution ? 
                    "You're contributing to an existing digital twin." :
                    "Your digital twin creation dashboard."}
                </p>
              </div>
              
              <Link to="/demo-chat">
                <Button className="bg-[#1F4959] hover:bg-[#011425]">
                  Chat with {displayName} <MessageCircle className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-[#1F4959]" /> Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {avatarProfile ? (
                    <div className="space-y-3">
                      <div className="flex justify-center mb-4">
                        <Avatar className="w-20 h-20 bg-[#5C7C89]">
                          {avatarProfile?.photos?.length > 0 ? (
                            <AvatarImage src={avatarProfile.photos[0]} alt={displayName} />
                          ) : null}
                          <AvatarFallback className="text-xl font-semibold bg-[#5C7C89] text-white">
                            {getInitials(displayName)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Name:</div>
                        <div className="font-medium">{displayName}</div>
                        
                        {avatarProfile.gender && (
                          <>
                            <div className="text-gray-500">Gender:</div>
                            <div className="font-medium capitalize">{avatarProfile.gender}</div>
                          </>
                        )}
                        
                        {avatarProfile.yearOfBirth && (
                          <>
                            <div className="text-gray-500">Birth Year:</div>
                            <div className="font-medium">{avatarProfile.yearOfBirth}</div>
                          </>
                        )}
                        
                        {avatarProfile.yearOfDeath && (
                          <>
                            <div className="text-gray-500">Death Year:</div>
                            <div className="font-medium">{avatarProfile.yearOfDeath || "N/A"}</div>
                          </>
                        )}
                        
                        {avatarProfile.birthPlace && (
                          <>
                            <div className="text-gray-500">Birthplace:</div>
                            <div className="font-medium">{avatarProfile.birthPlace}</div>
                          </>
                        )}
                        
                        {avatarProfile.ethnicity && (
                          <>
                            <div className="text-gray-500">Ethnicity:</div>
                            <div className="font-medium">{avatarProfile.ethnicity}</div>
                          </>
                        )}
                      </div>
                      
                      {avatarProfile.photos && avatarProfile.photos.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-2">Photos:</p>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {avatarProfile.photos.map((photo: string, i: number) => (
                              <div key={i} className="w-12 h-12 rounded-md bg-gray-200 flex-shrink-0 overflow-hidden">
                                <img src={photo} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                              </div>
                            )).slice(0, 3)}
                            {avatarProfile.photos.length > 3 && (
                              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                                +{avatarProfile.photos.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      {isContribution ? 
                        "Contributing to existing profile" : 
                        "Profile not created yet"}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/profile-creation" className="text-sm text-[#1F4959] hover:underline w-full text-right">
                    {avatarProfile ? "Edit profile" : "Create profile"}
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-[#5C7C89]" /> Personality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {personalityProfile ? (
                    <div className="space-y-3">
                      {Object.entries(personalityProfile).map(([trait, value]: [string, any]) => (
                        <div key={trait} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500 capitalize">
                              {trait.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-medium">
                              {value < 0.4 ? "Low" : value > 0.6 ? "High" : "Balanced"}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#1F4959] to-[#5C7C89]" 
                              style={{ width: `${value * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      Personality traits not defined yet
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/personality-sliders" className="text-sm text-[#5C7C89] hover:underline w-full text-right">
                    {personalityProfile ? "Edit personality" : "Define personality"}
                  </Link>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Mic className="h-5 w-5 text-[#011425]" /> Data Sources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-gray-500" /> Photos
                      </span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {avatarProfile?.photos?.length || 0} uploaded
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <Mic className="h-4 w-4 text-gray-500" /> Voice Recordings
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        Not uploaded
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" /> Documents
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        Not uploaded
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-500" /> Social Media
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        Not connected
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Link to="/twin/upload" className="text-sm text-[#011425] hover:underline w-full text-right">
                    Upload more data
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <Card className="mb-10">
              <CardHeader>
                <CardTitle>AI Twin Quality</CardTitle>
                <CardDescription>The more data you provide, the more accurate your digital twin will be</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Overall Quality</span>
                      <span className="text-sm text-gray-500">{qualityScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          qualityScore < 40 ? 'bg-red-500' : 
                          qualityScore < 70 ? 'bg-yellow-500' : 
                          'bg-[#1F4959]'
                        }`}
                        style={{ width: `${qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Completed
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>Basic profile information</li>
                        {personalityProfile && <li>Personality assessment</li>}
                        {avatarProfile?.photos?.length > 0 && <li>Photo uploads</li>}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Recommended Next Steps</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {!personalityProfile && <li>Complete personality assessment</li>}
                        <li>Upload voice recordings</li>
                        <li>Add written materials</li>
                        <li>Connect social media accounts</li>
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Benefits of Higher Quality</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>More natural conversations</li>
                        <li>Better memory recall</li>
                        <li>More authentic personality</li>
                        <li>Improved storytelling</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/twin/upload">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Upload More Data
                </Button>
              </Link>
              <Link to="/demo-chat">
                <Button size="lg" className="w-full sm:w-auto bg-[#1F4959] hover:bg-[#011425]">
                  Chat with {displayName} <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
