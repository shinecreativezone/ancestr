
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mic, Image as ImageIcon, FileText, MessageSquare, MessageCircle, ArrowRight, CheckCircle, Plus, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getUserAvatars, getInitials } from "@/utils/avatarUtils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [avatars, setAvatars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [qualityScore, setQualityScore] = useState(30);
  
  useEffect(() => {
    const fetchAvatars = async () => {
      if (!user) return;
      
      try {
        const userAvatars = await getUserAvatars(user.id);
        setAvatars(userAvatars);
        
        // Calculate quality score
        if (userAvatars.length > 0) {
          let totalScore = 0;
          userAvatars.forEach(avatar => {
            let avatarScore = 30; // Base score
            
            // Add points for photos
            if (avatar.photos && avatar.photos.length > 0) {
              avatarScore += Math.min(avatar.photos.length * 5, 25);
            }
            
            // Add points for filled fields
            const filledFields = [
              avatar.first_name, 
              avatar.last_name, 
              avatar.gender, 
              avatar.year_of_birth, 
              avatar.birth_place, 
              avatar.ethnicity
            ].filter(Boolean).length;
            
            avatarScore += filledFields * 5;
            
            totalScore += avatarScore;
          });
          
          setQualityScore(Math.min(Math.round(totalScore / userAvatars.length), 100));
        }
      } catch (error) {
        console.error("Error fetching avatars:", error);
        toast({
          title: "Error",
          description: "Failed to load your digital twins.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchAvatars();
  }, [user]);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="pt-24 pb-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-6">Loading your digital twins...</h1>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F4959]"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Your Digital Twins
                </h1>
                <p className="text-gray-600">
                  Manage and interact with your digital twins.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {avatars.length < 2 && (
                  <Link to="/avatar-type">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Create New Twin
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </Button>
              </div>
            </div>
            
            {avatars.length === 0 ? (
              <Card className="mb-10 text-center p-10">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-full bg-gray-100 p-6">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold">No Digital Twins Yet</h2>
                  <p className="text-gray-600 max-w-md mx-auto mb-4">
                    Create your first digital twin to start having meaningful conversations with your loved ones.
                  </p>
                  <Link to="/avatar-type">
                    <Button className="bg-[#1F4959] hover:bg-[#011425]">
                      Create Your First Digital Twin <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {avatars.map((avatar) => {
                    const displayName = avatar.first_name ? 
                      `${avatar.first_name}${avatar.last_name ? ' ' + avatar.last_name : ''}` : 
                      'Unnamed Twin';
                      
                    return (
                      <Card key={avatar.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="p-6 md:w-1/3 flex items-center justify-center md:border-r border-gray-100">
                            <Avatar className="w-24 h-24 bg-[#5C7C89]">
                              {avatar.photos && avatar.photos[0] ? (
                                <AvatarImage src={avatar.photos[0]} alt={displayName} />
                              ) : null}
                              <AvatarFallback className="text-2xl font-semibold bg-[#5C7C89] text-white">
                                {getInitials(displayName)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <div className="p-6 md:w-2/3">
                            <h3 className="text-xl font-bold mb-2">{displayName}</h3>
                            
                            <div className="space-y-1 text-sm mb-4">
                              {avatar.year_of_birth && (
                                <div className="text-gray-600">
                                  Born: {avatar.year_of_birth}
                                  {avatar.year_of_death ? ` - Died: ${avatar.year_of_death}` : ''}
                                </div>
                              )}
                              
                              {avatar.birth_place && (
                                <div className="text-gray-600">
                                  From: {avatar.birth_place}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-3">
                              <Link to={`/demo-chat?id=${avatar.id}`}>
                                <Button className="bg-[#1F4959] hover:bg-[#011425]">
                                  <MessageCircle className="h-4 w-4 mr-2" /> Chat
                                </Button>
                              </Link>
                              <Link to={`/profile-creation?edit=${avatar.id}`}>
                                <Button variant="outline">
                                  Edit Profile
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
            
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
                        {avatars.some(a => a.photos && a.photos.length > 0) && (
                          <li>Photo uploads</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium mb-2">Recommended Next Steps</h3>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>Upload more photos</li>
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
              {avatars.length > 0 && (
                <Link to={`/demo-chat?id=${avatars[0].id}`}>
                  <Button size="lg" className="w-full sm:w-auto bg-[#1F4959] hover:bg-[#011425]">
                    Chat with {avatars[0].first_name || 'your Twin'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
