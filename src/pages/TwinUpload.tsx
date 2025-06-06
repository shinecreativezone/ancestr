
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, MessageCircle, Image, Mic, FileText, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TwinUpload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("media");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  
  // Check if user came from the profile creation flow
  useEffect(() => {
    const profileExists = sessionStorage.getItem("avatarProfile") || 
                         sessionStorage.getItem("contributionCode");
    
    if (!profileExists) {
      navigate("/avatar-type");
    }
    
    // Simulate progress over time
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + (100 - prev) * 0.05;
        return newProgress > 99 ? 100 : newProgress;
      });
      
      setQualityScore(prev => {
        const newScore = prev + (75 - prev) * 0.05;
        return newScore > 74 ? 75 : newScore;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [navigate]);
  
  const handleContinue = () => {
    // Navigate to the dashboard
    toast({
      title: "Data upload complete",
      description: "Your data has been processed and your avatar is ready!",
    });
    navigate("/dashboard");
  };
  
  const handleSkip = () => {
    // Skip the uploads and go directly to the dashboard
    toast({
      title: "Skipped data upload",
      description: "You can always upload more data later to improve your avatar.",
    });
    navigate("/dashboard");
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Enhance Your Digital Twin</h1>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                The more data you provide, the more accurate and personalized your digital twin will be.
                Each source adds richness and authenticity to your avatar's memory and personality.
              </p>
              <div className="flex justify-center space-x-4 mt-4">
                <Button variant="outline" onClick={handleSkip}>
                  Skip for Now
                </Button>
                <Button onClick={handleContinue} className="btn-gradient" disabled={uploadProgress < 100}>
                  {uploadProgress < 100 ? "Processing..." : "Continue to Dashboard"}
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle>Data Upload Center</CardTitle>
                  <div className="text-sm font-medium">
                    Twin Quality: {Math.round(qualityScore)}%
                  </div>
                </div>
                <CardDescription>
                  Upload various types of data to create a more accurate digital twin
                </CardDescription>
                <Progress value={uploadProgress} className="h-2 mt-2" />
              </CardHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="px-6">
                  <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                    <TabsTrigger value="media" className="flex items-center gap-2">
                      <Image className="h-4 w-4" /> Media
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" /> Voice
                    </TabsTrigger>
                    <TabsTrigger value="social" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> Social
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Written
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <CardContent className="pt-6">
                  <TabsContent value="media" className="mt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Upload photos and videos to help your digital twin understand visual context and memories.
                        These provide important visual cues about appearance, relationships, and life events.
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-forever-400 transition-colors">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-4">
                          Drag and drop your files here, or click to browse
                        </p>
                        <Button variant="outline" size="sm">Choose Files</Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {/* Sample uploaded images */}
                        <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                          <img 
                            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                            alt="Family photo" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
                          </div>
                        </div>
                        
                        <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                          <img 
                            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                            alt="Old family photo" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="ghost" size="icon" className="text-white h-8 w-8">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="voice" className="mt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Upload voice recordings to help your digital twin capture voice patterns and speaking style.
                        Voice samples are essential for creating an authentic sounding avatar.
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-memory-400 transition-colors">
                        <Mic className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-4">
                          Upload existing recordings or record new audio samples
                        </p>
                        <div className="flex justify-center gap-4">
                          <Button variant="outline" size="sm">Upload Audio</Button>
                          <Button size="sm">Start Recording</Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="social" className="mt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Connect social media accounts to analyze communication style and interests.
                        Social media contains rich data about interactions, opinions, and personality.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start hover:bg-blue-50 transition-colors">
                          <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          Connect Facebook
                        </Button>
                        
                        <Button variant="outline" className="justify-start hover:bg-blue-50 transition-colors">
                          <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                          Connect Twitter
                        </Button>
                        
                        <Button variant="outline" className="justify-start hover:bg-purple-50 transition-colors">
                          <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                          </svg>
                          Connect Instagram
                        </Button>
                        
                        <Button variant="outline" className="justify-start hover:bg-blue-50 transition-colors">
                          <svg className="w-5 h-5 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          Connect LinkedIn
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="text" className="mt-0">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        Upload written material like emails, letters, or journals to capture writing style and thought processes.
                        Text provides invaluable insights into personal expression, beliefs, and knowledge.
                      </p>
                      
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:border-warmth-400 transition-colors">
                        <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-4">
                          Upload documents, emails, or journal entries
                        </p>
                        <Button variant="outline" size="sm">Upload Documents</Button>
                      </div>
                      
                      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2">Why written material matters:</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="text-memory-500 mr-2">•</span>
                            <span>Captures vocabulary, phrases, and personal expressions</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-memory-500 mr-2">•</span>
                            <span>Reveals thought patterns and decision-making processes</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-memory-500 mr-2">•</span>
                            <span>Preserves stories, memories, and reflections in their original form</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500 mb-4">
                Upload data now or return later - you can always enhance your digital twin.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={handleSkip}>
                  Skip for Now
                </Button>
                <Button onClick={handleContinue} className="btn-gradient" disabled={uploadProgress < 100}>
                  {uploadProgress < 100 ? "Processing..." : "Continue to Dashboard"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
