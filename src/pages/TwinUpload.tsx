
import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Upload, 
  Mic, 
  MessageCircle, 
  Globe, 
  History, 
  BrainCircuit, 
  Mail, 
  PenTool, 
  Briefcase, 
  Gamepad, 
  FilmIcon, 
  Heart
} from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

export default function TwinUpload() {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<Record<string, boolean>>({
    facebook: false,
    twitter: false,
    instagram: false,
    linkedin: false,
    reddit: false,
    discord: false
  });

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const handleUpload = (type: string) => {
    setIsUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Upload Complete",
        description: `Your ${type} data was successfully uploaded.`,
      });
    }, 2000);
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatforms({
      ...selectedPlatforms,
      [platform]: !selectedPlatforms[platform]
    });
  };

  const dataCategories = [
    {
      id: "social-media",
      title: "Social Media",
      icon: <MessageCircle className="h-5 w-5" />,
      description: "Connect your social accounts to import posts, comments, and interactions",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your social media activity reveals your communication style, interests, and how you engage with others.</p>
          
          <div className="space-y-2">
            {Object.entries({
              facebook: "Facebook",
              twitter: "Twitter",
              instagram: "Instagram",
              linkedin: "LinkedIn",
              reddit: "Reddit",
              discord: "Discord"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox 
                  id={key} 
                  checked={selectedPlatforms[key]} 
                  onCheckedChange={() => handlePlatformChange(key)}
                />
                <Label htmlFor={key}>{label}</Label>
              </div>
            ))}
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("social media")} 
              disabled={!Object.values(selectedPlatforms).some(v => v) || isUploading}
              className="w-full"
            >
              {isUploading ? "Connecting..." : "Connect Selected Accounts"}
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "browsing-history",
      title: "Browsing History",
      icon: <History className="h-5 w-5" />,
      description: "Import your digital footprint to capture interests and online behavior",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your browsing history reveals your interests, search patterns, and online behaviors.</p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="browser-export">Upload browser history export</Label>
              <Input id="browser-export" type="file" className="mt-1" />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="purchase-history" />
              <Label htmlFor="purchase-history">Include purchasing behavior (Amazon, etc.)</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="search-queries" />
              <Label htmlFor="search-queries">Include search query history</Label>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("browsing history")} 
              className="w-full"
            >
              Upload Digital Footprint
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "personality",
      title: "Personality Analysis",
      icon: <BrainCircuit className="h-5 w-5" />,
      description: "Take a personality test or upload existing results",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Personality tests help build an accurate representation of your traits, behaviors, and emotional responses.</p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Available Tests</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Big Five Personality Assessment</span>
                  <Button variant="outline" size="sm">Take Test</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Emotional Intelligence Assessment</span>
                  <Button variant="outline" size="sm">Take Test</Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Communication Style Analysis</span>
                  <Button variant="outline" size="sm">Take Test</Button>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="existing-results">Or upload existing test results</Label>
              <Input id="existing-results" type="file" className="mt-1" />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("personality data")} 
              className="w-full"
            >
              Process Personality Data
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "voice",
      title: "Voice & Speech",
      icon: <Mic className="h-5 w-5" />,
      description: "Upload voice recordings to clone your speech patterns",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Voice samples help your twin sound like you, with your unique intonation, accent, and speech mannerisms.</p>
          
          <div className="space-y-4 pb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Voice Recording</h3>
              <p className="text-sm text-gray-600 mb-4">Record at least 3 minutes of speech for accurate voice cloning.</p>
              
              <div className="flex justify-center">
                <Button variant="outline" className="rounded-full h-16 w-16">
                  <Mic className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="voice-files">Upload audio files</Label>
              <p className="text-xs text-gray-500 mb-1">Podcasts, interviews, video recordings, etc.</p>
              <Input id="voice-files" type="file" className="mt-1" multiple />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("voice data")} 
              className="w-full"
            >
              Process Voice Data
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "emails",
      title: "Email Communication",
      icon: <Mail className="h-5 w-5" />,
      description: "Analyze your email style to capture your written communication",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your emails reveal your communication style, formality level, and writing patterns.</p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="gmail" />
              <Label htmlFor="gmail">Connect Gmail</Label>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox id="outlook" />
              <Label htmlFor="outlook">Connect Outlook</Label>
            </div>
            
            <div>
              <Label htmlFor="email-export">Upload email export (MBOX format)</Label>
              <Input id="email-export" type="file" className="mt-1" />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("email data")} 
              className="w-full"
            >
              Process Email Communication
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "documents",
      title: "Written Documents",
      icon: <FileText className="h-5 w-5" />,
      description: "Upload writing samples to capture your thought process and style",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your writing samples reveal your thinking style, vocabulary, and how you express ideas.</p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="documents">Upload documents</Label>
              <p className="text-xs text-gray-500 mb-1">Essays, articles, blog posts, reports, etc.</p>
              <Input id="documents" type="file" className="mt-1" multiple />
            </div>
            
            <div>
              <Label htmlFor="journal">Upload journal entries or personal writing</Label>
              <Input id="journal" type="file" className="mt-1" multiple />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("written documents")} 
              className="w-full"
            >
              Upload Documents
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "handwriting",
      title: "Handwritten Content",
      icon: <PenTool className="h-5 w-5" />,
      description: "Upload scans of handwritten notes to capture your personal style",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Handwritten notes reveal personal aspects of your communication not present in digital text.</p>
          
          <div>
            <Label htmlFor="handwriting">Upload scans of handwritten content</Label>
            <p className="text-xs text-gray-500 mb-1">Letters, notes, journals, etc.</p>
            <Input id="handwriting" type="file" className="mt-1" multiple />
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("handwritten content")} 
              className="w-full"
            >
              Process Handwritten Content
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "professional",
      title: "Professional Work",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Upload work samples to capture your professional persona",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your professional work reveals how you think and communicate in work contexts.</p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="presentations">Upload presentations</Label>
              <Input id="presentations" type="file" className="mt-1" multiple />
            </div>
            
            <div>
              <Label htmlFor="reports">Upload reports or work documents</Label>
              <Input id="reports" type="file" className="mt-1" multiple />
            </div>
            
            <div>
              <Label htmlFor="portfolio">Upload portfolio items</Label>
              <Input id="portfolio" type="file" className="mt-1" multiple />
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("professional work")} 
              className="w-full"
            >
              Upload Professional Content
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "gaming",
      title: "Gaming & Interactive",
      icon: <Gamepad className="h-5 w-5" />,
      description: "Import gaming profiles to capture your interactive behaviors",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your gaming behavior reveals decision-making patterns and social interaction styles.</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="steam" />
              <Label htmlFor="steam">Connect Steam</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="xbox" />
              <Label htmlFor="xbox">Connect Xbox Live</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="playstation" />
              <Label htmlFor="playstation">Connect PlayStation Network</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="nintendo" />
              <Label htmlFor="nintendo">Connect Nintendo Account</Label>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("gaming data")} 
              className="w-full"
            >
              Connect Gaming Profiles
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "media",
      title: "Media Consumption",
      icon: <FilmIcon className="h-5 w-5" />,
      description: "Import streaming and media preferences to capture your tastes",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your media consumption reveals your preferences, interests, and cultural connections.</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="netflix" />
              <Label htmlFor="netflix">Connect Netflix</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="spotify" />
              <Label htmlFor="spotify">Connect Spotify</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="youtube" />
              <Label htmlFor="youtube">Connect YouTube</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="goodreads" />
              <Label htmlFor="goodreads">Connect Goodreads</Label>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("media consumption data")} 
              className="w-full"
            >
              Connect Media Accounts
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "values",
      title: "Values & Beliefs",
      icon: <Heart className="h-5 w-5" />,
      description: "Share your core values and beliefs to shape your twin's worldview",
      content: (
        <div className="space-y-4">
          <p className="text-gray-600">Your values and beliefs form the foundation of how your twin will approach complex topics.</p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="philosophy" className="block mb-1">Personal philosophy</Label>
              <textarea 
                id="philosophy" 
                className="w-full border border-gray-300 rounded-md p-2 h-24"
                placeholder="Describe your general approach to life and what matters most to you..."
              ></textarea>
            </div>
            
            <div>
              <Label htmlFor="beliefs" className="block mb-1">Core beliefs</Label>
              <textarea 
                id="beliefs" 
                className="w-full border border-gray-300 rounded-md p-2 h-24"
                placeholder="Share your views on important topics (e.g., ethics, politics, religion, etc.)..."
              ></textarea>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={() => handleUpload("values and beliefs")} 
              className="w-full"
            >
              Save Values & Beliefs
            </Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Upload Twin Data</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                The more data you provide, the more authentic your digital twin will be. 
                Choose from multiple data sources below.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt="Twin" />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">John's Twin</h2>
                    <div className="text-sm text-gray-500">Created on April 5, 2025</div>
                    <div className="mt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        10% Complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full mb-6">
                    <TabsTrigger value="upload">Upload Data</TabsTrigger>
                    <TabsTrigger value="progress">Upload Progress</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="mt-0">
                    <div className="space-y-4">
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-3">
                          {dataCategories.map((category) => (
                            <Collapsible 
                              key={category.id}
                              open={openSection === category.id}
                              onOpenChange={() => toggleSection(category.id)}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100">
                                <div className="flex items-center">
                                  <div className="mr-3 bg-gray-200 p-2 rounded-full">
                                    {category.icon}
                                  </div>
                                  <div>
                                    <div className="font-medium">{category.title}</div>
                                    <div className="text-sm text-gray-500">{category.description}</div>
                                  </div>
                                </div>
                                <div className={`transform transition-transform ${openSection === category.id ? 'rotate-180' : ''}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                </div>
                              </CollapsibleTrigger>
                              
                              <CollapsibleContent className="p-4">
                                {category.content}
                              </CollapsibleContent>
                            </Collapsible>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="progress" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Upload Progress</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Basic Information</span>
                              <span className="text-green-600">Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Photos & Appearance</span>
                              <span className="text-green-600">Complete</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Voice & Speech</span>
                              <span className="text-amber-600">Partial</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Written Content</span>
                              <span className="text-gray-500">Not Started</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Social Media</span>
                              <span className="text-gray-500">Not Started</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Values & Beliefs</span>
                              <span className="text-gray-500">Not Started</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1 text-sm">
                              <span className="font-medium">Overall Completion</span>
                              <span>10%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div className="bg-forever-500 h-3 rounded-full" style={{ width: "10%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Twin Quality Estimate</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Based on your current uploads, we estimate your Twin will have:
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-32 text-sm">Personality Match:</div>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                              </div>
                            </div>
                            <div className="w-10 text-right text-sm">15%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-32 text-sm">Voice Accuracy:</div>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                              </div>
                            </div>
                            <div className="w-10 text-right text-sm">20%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-32 text-sm">Memory Detail:</div>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                              </div>
                            </div>
                            <div className="w-10 text-right text-sm">5%</div>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-32 text-sm">Visual Likeness:</div>
                            <div className="flex-1">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                              </div>
                            </div>
                            <div className="w-10 text-right text-sm">65%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline">Back to Dashboard</Button>
              <Button className="btn-gradient">Continue to Chat</Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
