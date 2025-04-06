
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Camera, Edit2, MessagesSquare, Upload, FileText, Mic, Zap, ChevronRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [avatarProfile, setAvatarProfile] = useState<any>(null);
  const [personalityProfile, setPersonalityProfile] = useState<any>(null);
  const [completionPercent, setCompletionPercent] = useState(0);
  
  useEffect(() => {
    // Get data from session storage
    const storedProfile = sessionStorage.getItem("avatarProfile");
    const storedPersonality = sessionStorage.getItem("personalityProfile");
    
    if (!storedProfile) {
      navigate("/avatar-type");
      return;
    }
    
    try {
      const profile = JSON.parse(storedProfile);
      setAvatarProfile(profile);
      
      if (storedPersonality) {
        setPersonalityProfile(JSON.parse(storedPersonality));
      }
      
      // Calculate completion percentage
      let completed = 1; // Avatar type always completed
      let total = 5; // Total steps
      
      if (profile) completed++;
      if (storedPersonality) completed++;
      if (profile && profile.imageCount > 0) completed++;
      
      setCompletionPercent((completed / total) * 100);
      
    } catch (error) {
      console.error("Error parsing stored data:", error);
      navigate("/avatar-type");
    }
  }, [navigate]);
  
  if (!avatarProfile) {
    return <div>Loading...</div>;
  }
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Your Digital Twin Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Track progress and manage your digital twin
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => navigate("/twin/upload")}>
                  <Upload className="h-4 w-4 mr-2" /> Add Data
                </Button>
                <Button onClick={() => navigate("/demo-chat")}>
                  <MessagesSquare className="h-4 w-4 mr-2" /> Chat with Twin
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column - Avatar Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Avatar Profile</CardTitle>
                    <CardDescription>
                      {avatarProfile.avatarType === "self" ? "Your information" : "Your loved one's information"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        {avatarProfile.imageCount > 0 ? (
                          <img 
                            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <Camera className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Avatar Type:</span>
                        <span className="font-medium">
                          {avatarProfile.avatarType === "self" ? "Yourself" : "Loved One"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">Year of Birth:</span>
                        <span className="font-medium">{avatarProfile.yearOfBirth || "Not specified"}</span>
                      </div>
                      
                      {avatarProfile.yearOfDeath && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Year of Death:</span>
                          <span className="font-medium">{avatarProfile.yearOfDeath}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">Birthplace:</span>
                        <span className="font-medium">{avatarProfile.birthPlace || "Not specified"}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ethnicity:</span>
                        <span className="font-medium">{avatarProfile.ethnicity || "Not specified"}</span>
                      </div>
                      
                      {avatarProfile.placesLived && avatarProfile.placesLived.length > 0 && (
                        <div>
                          <span className="text-gray-500">Places Lived:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {avatarProfile.placesLived.map((place: string, index: number) => (
                              <span 
                                key={index} 
                                className="bg-gray-100 px-2 py-0.5 text-xs rounded-full"
                              >
                                {place}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      className="w-full mt-4"
                      onClick={() => navigate("/profile-creation")}
                    >
                      <Edit2 className="h-4 w-4 mr-2" /> Edit Profile
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Completion Status</CardTitle>
                    <CardDescription>Track your digital twin's setup progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Overall Completion</span>
                          <span className="text-sm font-medium">{Math.round(completionPercent)}%</span>
                        </div>
                        <Progress value={completionPercent} className="h-2" />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <Zap className="h-4 w-4 text-green-600" />
                            </div>
                            <span>Avatar Type</span>
                          </div>
                          <span className="text-green-600">Completed</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <Camera className="h-4 w-4 text-green-600" />
                            </div>
                            <span>Basic Profile</span>
                          </div>
                          <span className="text-green-600">Completed</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${personalityProfile ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                              <FileText className={`h-4 w-4 ${personalityProfile ? 'text-green-600' : 'text-gray-400'}`} />
                            </div>
                            <span>Personality Assessment</span>
                          </div>
                          {personalityProfile ? (
                            <span className="text-green-600">Completed</span>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => navigate("/personality-sliders")}
                            >
                              Complete <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full ${avatarProfile.imageCount > 0 ? 'bg-green-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                              <Upload className={`h-4 w-4 ${avatarProfile.imageCount > 0 ? 'text-green-600' : 'text-gray-400'}`} />
                            </div>
                            <span>Photos & Media</span>
                          </div>
                          {avatarProfile.imageCount > 0 ? (
                            <span className="text-green-600">
                              {avatarProfile.imageCount} {avatarProfile.imageCount === 1 ? 'photo' : 'photos'}
                            </span>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => navigate("/twin/upload")}
                            >
                              Upload <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                              <Mic className="h-4 w-4 text-gray-400" />
                            </div>
                            <span>Voice Recordings</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => navigate("/twin/upload")}
                          >
                            Add <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Middle column - Personality */}
              <div className="space-y-6">
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Personality Profile</CardTitle>
                    <CardDescription>
                      Traits and characteristics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {personalityProfile ? (
                      <div className="space-y-6">
                        {Object.entries(personalityProfile).map(([trait, value]: [string, any]) => {
                          const traitInfo = {
                            optimism: { 
                              label: "Optimism", 
                              left: "Pessimistic", 
                              right: "Optimistic" 
                            },
                            extraversion: { 
                              label: "Social Energy", 
                              left: "Introverted", 
                              right: "Extroverted" 
                            },
                            organization: { 
                              label: "Organization", 
                              left: "Disorganized", 
                              right: "Organized" 
                            },
                            riskTaking: { 
                              label: "Risk Preference", 
                              left: "Cautious", 
                              right: "Risk Taking" 
                            },
                            thinkingStyle: { 
                              label: "Thinking Style", 
                              left: "Intuitive", 
                              right: "Analytical" 
                            },
                            attitudeToChange: { 
                              label: "Attitude to Change", 
                              left: "Avoids Change", 
                              right: "Loves Change" 
                            },
                            patience: { 
                              label: "Patience", 
                              left: "Impatient", 
                              right: "Patient" 
                            },
                            communicationStyle: { 
                              label: "Communication Style", 
                              left: "Blunt", 
                              right: "Diplomatic" 
                            }
                          }[trait as keyof typeof personalityProfile] || { 
                            label: trait, 
                            left: "Low", 
                            right: "High" 
                          };
                          
                          return (
                            <div key={trait} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{traitInfo.label}</span>
                                <span className="text-sm text-gray-500">
                                  {Math.round(value * 100)}%
                                </span>
                              </div>
                              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-warmth-400 to-memory-500" 
                                  style={{ width: `${value * 100}%` }}
                                ></div>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>{traitInfo.left}</span>
                                <span>{traitInfo.right}</span>
                              </div>
                            </div>
                          );
                        })}
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4"
                          onClick={() => navigate("/personality-sliders")}
                        >
                          <Edit2 className="h-4 w-4 mr-2" /> Edit Personality Traits
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full space-y-4 py-12">
                        <FileText className="h-12 w-12 text-gray-300" />
                        <div className="text-center">
                          <p className="text-gray-600 mb-4">No personality profile has been created yet.</p>
                          <Button onClick={() => navigate("/personality-sliders")}>
                            Create Personality Profile
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Right column - Activity and Chat */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Start a Conversation</CardTitle>
                    <CardDescription>
                      Chat with your digital twin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1454923634634-bd1614719a7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                        alt="Vintage photo of grandparents" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Your digital twin is ready for conversation. Experience natural, meaningful interactions based on your unique profile.
                    </p>
                    
                    <Button 
                      className="w-full btn-gradient"
                      onClick={() => navigate("/demo-chat")}
                    >
                      <MessagesSquare className="h-4 w-4 mr-2" /> Start Conversation
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Twin Quality Score</CardTitle>
                    <CardDescription>
                      How accurate is your digital twin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EEEEEE"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="3"
                            strokeDasharray={`${completionPercent * 0.75}, 100`}
                            className="stroke-[#38bdf8]"
                          />
                          <defs>
                            <linearGradient id="gradient" gradientTransform="rotate(90)">
                              <stop offset="0%" stopColor="#38bdf8" />
                              <stop offset="100%" stopColor="#818cf8" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold">
                            {Math.round(completionPercent * 0.75)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-center text-gray-600 mb-6">
                      Add more data to increase accuracy
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Basic Info</span>
                        <span className="text-green-600">✓</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Photos & Videos</span>
                        <span>{avatarProfile.imageCount > 0 ? "✓" : "Incomplete"}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Personality Profile</span>
                        <span>{personalityProfile ? "✓" : "Incomplete"}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Voice Data</span>
                        <span>Missing</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Writing Samples</span>
                        <span>Missing</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => navigate("/twin/upload")}
                    >
                      <Upload className="h-4 w-4 mr-2" /> Add More Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
