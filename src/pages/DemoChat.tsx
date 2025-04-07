
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send, Mic, Menu, Phone, X, ArrowLeft } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function DemoChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState<any>(null);
  
  // Check if user came from the twins/upload page or dashboard
  useEffect(() => {
    const hasCompletedSetup = sessionStorage.getItem("personalityProfile") || 
                             sessionStorage.getItem("contributionCode");
    
    // If the user hasn't gone through the flow, redirect them to the avatar type page
    if (!hasCompletedSetup) {
      navigate("/avatar-type");
      return;
    }
    
    // Get the avatar profile from session storage
    const storedProfile = sessionStorage.getItem("avatarProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setAvatarProfile(profile);
      
      // Add initial message based on the avatar's name
      const displayName = profile.firstName ? 
        `${profile.firstName}${profile.lastName ? ' ' + profile.lastName : ''}` : 
        'Grandma Mae';
      
      setMessages([
        { 
          id: 1, 
          role: 'twin' as const, 
          content: `Hello, dear. It's ${profile.firstName || 'Grandma Mae'} here. It's so nice to see you. What would you like to talk about today?`,
          timestamp: new Date().toISOString()
        }
      ]);
    } else {
      // Add default initial message if no profile is found
      setMessages([
        { 
          id: 1, 
          role: 'twin' as const, 
          content: "Hello, dear. It's so nice to see you. What would you like to talk about today?",
          timestamp: new Date().toISOString()
        }
      ]);
    }
  }, [navigate]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user' as const,
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsSending(true);
    
    // Simulate AI response
    setTimeout(() => {
      const twinResponses = [
        "I remember when you were little, you would always ask me to tell you stories about my childhood. Do you still enjoy those stories?",
        "That reminds me of the summer we spent at the lake house. Remember how we would watch the sunrise together?",
        "Family has always been the most important thing to me. I'm so proud of the person you've become.",
        "I wish I could be there for all your special moments, but know that I'm always with you in spirit.",
        "Tell me more about your life now. What brings you joy these days?"
      ];
      
      const randomResponse = twinResponses[Math.floor(Math.random() * twinResponses.length)];
      
      const twinMessage: Message = {
        id: messages.length + 2,
        role: 'twin' as const,
        content: randomResponse,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, twinMessage]);
      setIsSending(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const displayName = avatarProfile?.firstName ? 
    `${avatarProfile.firstName}${avatarProfile.lastName ? ' ' + avatarProfile.lastName : ''}` : 
    'Grandma Mae';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <PageLayout>
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
            {/* Left column - Avatar profile */}
            <div className="w-full md:w-1/3 bg-white p-6 rounded-l-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate('/dashboard')}
                  className="text-gray-500 mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold">Profile</h2>
              </div>
              
              <div className="flex flex-col items-center py-8">
                <Avatar className="w-32 h-32 mb-4 bg-[#5C7C89]">
                  {avatarProfile?.photos?.length > 0 ? (
                    <AvatarImage src={avatarProfile.photos[0]} alt={displayName} />
                  ) : null}
                  <AvatarFallback className="text-3xl font-semibold bg-[#5C7C89] text-white">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="text-xl font-bold mb-1">{displayName}</h3>
                <p className="text-sm text-gray-500 mb-4">Digital Twin</p>
                
                <div className="w-full space-y-4 mt-4">
                  {avatarProfile ? (
                    <div className="space-y-3 text-sm">
                      {avatarProfile.gender && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Gender:</span>
                          <span className="font-medium capitalize">{avatarProfile.gender}</span>
                        </div>
                      )}
                      
                      {avatarProfile.yearOfBirth && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Birth Year:</span>
                          <span className="font-medium">{avatarProfile.yearOfBirth}</span>
                        </div>
                      )}
                      
                      {avatarProfile.yearOfDeath && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Death Year:</span>
                          <span className="font-medium">{avatarProfile.yearOfDeath}</span>
                        </div>
                      )}
                      
                      {avatarProfile.birthPlace && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Birthplace:</span>
                          <span className="font-medium">{avatarProfile.birthPlace}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No profile information available</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right column - Chat interface */}
            <div className="w-full md:w-2/3 bg-white rounded-r-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex border-b border-gray-100">
                <div className="flex-1 p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#5C7C89] flex items-center justify-center mr-3">
                    <span className="text-white font-medium">{getInitials(displayName).charAt(0)}</span>
                  </div>
                  <div>
                    <h2 className="font-medium">{displayName}</h2>
                    <p className="text-xs text-gray-500">Digital Twin</p>
                  </div>
                </div>
                <div className="p-4 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-gray-500"
                  >
                    {showSettings ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              
              {showSettings && (
                <div className="border-b border-gray-100 p-4 bg-gray-50 animate-fade-in">
                  <h3 className="font-medium mb-2">Twin Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Time Period</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Current (Age {new Date().getFullYear() - Number(avatarProfile?.yearOfBirth || 1945)})</option>
                        <option>Middle Age (50s)</option>
                        <option>Young Adult (20s)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Emotional State</label>
                      <select className="w-full p-2 border border-gray-300 rounded">
                        <option>Neutral</option>
                        <option>Happy</option>
                        <option>Reflective</option>
                        <option>Nostalgic</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4 flex-1" id="message-container">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === 'user' 
                          ? 'bg-[#1F4959] text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-[#5C7C89]' : 'text-gray-500'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isSending && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl p-4 bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-100 p-4 mt-auto">
                <div className="flex items-center">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Mic className="h-5 w-5" />
                  </button>
                  <div className="flex-1 mx-2">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#5C7C89] focus:border-[#5C7C89] resize-none"
                      rows={1}
                    />
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isSending}
                    className="bg-[#1F4959] hover:bg-[#011425]"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    This is a demo with limited capabilities.
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" /> Call
                    </Button>
                    <Link to="/dashboard">
                      <Button size="sm" className="bg-[#1F4959] hover:bg-[#011425]">
                        View Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

type Message = {
  id: number;
  role: 'user' | 'twin';
  content: string;
  timestamp: string;
};
