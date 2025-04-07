
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Send, Mic, Menu, Phone, X, ArrowLeft, VolumeX, Volume2, PlusCircle, Clock } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { getInitials, textToSpeech, generateAvatarHeadshot } from "@/utils/avatarUtils";
import { toast } from "@/hooks/use-toast";
import { Avatar as AvatarType, Conversation, Message as MessageType, TwinSettings } from "@/types/supabase";
import { format } from "date-fns";

export default function DemoChat() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const avatarId = searchParams.get('id');
  
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [avatarProfile, setAvatarProfile] = useState<AvatarType | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [settings, setSettings] = useState<TwinSettings>({
    timePeriod: 'current',
    emotionalState: 'neutral'
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const fetchAvatar = async () => {
      if (!user || !avatarId) {
        return;
      }
      
      try {
        // Fetch avatar details
        const { data: avatar, error } = await supabase
          .from("avatars")
          .select("*")
          .eq("id", avatarId)
          .single();
          
        if (error) {
          console.error("Error fetching avatar:", error);
          return;
        }
        
        if (!avatar) {
          toast({
            title: "Avatar not found",
            description: "The requested digital twin could not be found.",
            variant: "destructive"
          });
          navigate("/dashboard");
          return;
        }
        
        setAvatarProfile(avatar);
        
        // If no composite image exists and we have photos, generate one
        if (!avatar.composite_image && avatar.photos && avatar.photos.length >= 2) {
          const headshot = await generateAvatarHeadshot(avatarId, avatar.photos);
          if (headshot) {
            avatar.composite_image = headshot;
            // Refresh avatar data
            setAvatarProfile({...avatar});
          }
        }
        
        // Fetch all conversations for this avatar
        await fetchConversations(avatarId);
      } catch (error) {
        console.error("Error in initialization:", error);
        toast({
          title: "Error",
          description: "There was a problem loading the chat.",
          variant: "destructive"
        });
      }
    };
    
    fetchAvatar();
  }, [user, avatarId, navigate]);

  const fetchConversations = async (avatarId: string) => {
    try {
      // Fetch all conversations for this avatar
      const { data: allConversations, error: convoError } = await supabase
        .from("conversations")
        .select("*")
        .eq("avatar_id", avatarId)
        .order("created_at", { ascending: false });
        
      if (convoError) {
        console.error("Error fetching conversations:", convoError);
        return;
      }
      
      if (allConversations && allConversations.length > 0) {
        setConversations(allConversations);
        
        // Load the most recent conversation by default
        await loadConversation(allConversations[0].id);
      } else {
        // Start a new conversation if none exist
        await startNewConversation();
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };
  
  const loadConversation = async (convoId: string) => {
    try {
      setConversationId(convoId);
      
      // Fetch messages for this conversation
      const { data: conversationMessages, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convoId)
        .order("timestamp", { ascending: true });
        
      if (messagesError) {
        console.error("Error fetching messages:", messagesError);
        return;
      }
      
      if (conversationMessages) {
        setMessages(conversationMessages as MessageType[]);
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };
  
  const startNewConversation = async () => {
    if (!user || !avatarProfile) return;
    
    try {
      // Clear the current messages
      setMessages([]);
      setConversationId(null);
      
      // Add initial message
      const displayName = avatarProfile.first_name ? 
        `${avatarProfile.first_name}${avatarProfile.last_name ? ' ' + avatarProfile.last_name : ''}` : 
        'Grandma Mae';
      
      const initialMessage: MessageType = { 
        id: '1', 
        role: 'twin', 
        content: `Hello, dear. It's ${avatarProfile.first_name || 'Grandma Mae'} here. It's so nice to see you. What would you like to talk about today?`,
        timestamp: new Date().toISOString(),
        conversation_id: ''
      };
      
      setMessages([initialMessage]);
      
      // This will create a new conversation when the first message is sent
    } catch (error) {
      console.error("Error starting new conversation:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !user || !avatarProfile) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
      conversation_id: conversationId || ''
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsSending(true);
    
    try {
      // Get the access token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("No session found");
      }
      
      // Format previous messages for context
      const pastMessages = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke("chat-with-twin", {
        body: {
          message: userMessage.content,
          avatarId: avatarProfile.id,
          conversationId: conversationId,
          pastMessages: pastMessages,
          settings: settings
        }
      });
      
      if (error) {
        throw error;
      }
      
      // Update conversation ID if this is a new conversation
      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId);
        
        // Fetch updated conversations
        await fetchConversations(avatarProfile.id);
      }
      
      // Add AI response to messages
      const twinMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'twin',
        content: data.message,
        timestamp: data.timestamp || new Date().toISOString(),
        conversation_id: data.conversationId || conversationId || ''
      };
      
      setMessages(prev => [...prev, twinMessage]);
      
      // Convert the message to speech
      const audioData = await textToSpeech(data.message, avatarProfile, settings);
      if (audioData && audioRef.current) {
        audioRef.current.src = audioData;
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem communicating with your digital twin.",
        variant: "destructive"
      });
      
      // Add a fallback message if the API call fails
      const fallbackMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'twin',
        content: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        timestamp: new Date().toISOString(),
        conversation_id: conversationId || ''
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);
  
  // Handle audio ended event
  useEffect(() => {
    const audioElement = audioRef.current;
    
    const handleAudioEnded = () => {
      setIsPlaying(false);
    };
    
    if (audioElement) {
      audioElement.addEventListener('ended', handleAudioEnded);
    }
    
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleAudioEnded);
      }
    };
  }, []);
  
  const displayName = avatarProfile?.first_name ? 
    `${avatarProfile.first_name}${avatarProfile.last_name ? ' ' + avatarProfile.last_name : ''}` : 
    'Grandma Mae';

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
                  {(avatarProfile?.composite_image || avatarProfile?.photos?.[0]) ? (
                    <AvatarImage 
                      src={avatarProfile.composite_image || avatarProfile.photos[0]} 
                      alt={displayName} 
                    />
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
                      
                      {avatarProfile.year_of_birth && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Birth Year:</span>
                          <span className="font-medium">{avatarProfile.year_of_birth}</span>
                        </div>
                      )}
                      
                      {avatarProfile.year_of_death && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Death Year:</span>
                          <span className="font-medium">{avatarProfile.year_of_death}</span>
                        </div>
                      )}
                      
                      {avatarProfile.birth_place && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Birthplace:</span>
                          <span className="font-medium">{avatarProfile.birth_place}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500">No profile information available</p>
                  )}
                </div>
                
                {/* Past conversations section */}
                <div className="w-full mt-6">
                  <h4 className="font-medium text-gray-700 mb-2">Past Conversations</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {conversations.map((convo) => (
                      <button
                        key={convo.id}
                        onClick={() => loadConversation(convo.id)}
                        className={`w-full text-left p-2 rounded text-sm flex items-center ${
                          conversationId === convo.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {format(new Date(convo.created_at), 'MMM d, yyyy h:mm a')}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={startNewConversation}
                    variant="outline" 
                    className="w-full mt-3 flex items-center justify-center"
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Start New Conversation
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Right column - Chat interface */}
            <div className="w-full md:w-2/3 bg-white rounded-r-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="flex border-b border-gray-100">
                <div className="flex-1 p-4 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#5C7C89] flex items-center justify-center mr-3">
                    {(avatarProfile?.composite_image || avatarProfile?.photos?.[0]) ? (
                      <img 
                        src={avatarProfile.composite_image || avatarProfile.photos[0]} 
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover" 
                      />
                    ) : (
                      <span className="text-white font-medium">{getInitials(displayName).charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium">{displayName}</h2>
                    <p className="text-xs text-gray-500">Digital Twin</p>
                  </div>
                </div>
                <div className="p-4 flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleAudio}
                    className="text-gray-500"
                  >
                    {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
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
                      <select 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={settings.timePeriod}
                        onChange={(e) => setSettings({...settings, timePeriod: e.target.value as any})}
                      >
                        <option value="current">Current (Age {new Date().getFullYear() - Number(avatarProfile?.year_of_birth || 1945)})</option>
                        <option value="middleAge">Middle Age (50s)</option>
                        <option value="youngAdult">Young Adult (20s)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Emotional State</label>
                      <select 
                        className="w-full p-2 border border-gray-300 rounded"
                        value={settings.emotionalState}
                        onChange={(e) => setSettings({...settings, emotionalState: e.target.value as any})}
                      >
                        <option value="neutral">Neutral</option>
                        <option value="happy">Happy</option>
                        <option value="reflective">Reflective</option>
                        <option value="nostalgic">Nostalgic</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
              
              <ScrollArea className="h-[400px] flex-1" ref={messageContainerRef}>
                <div className="p-4 flex flex-col space-y-4" id="message-container">
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
              </ScrollArea>
              
              {/* Hidden audio element for speech */}
              <audio ref={audioRef} style={{ display: 'none' }} />
              
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
                    Chat with your digital twin
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
