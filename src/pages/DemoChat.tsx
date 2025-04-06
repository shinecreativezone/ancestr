import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Send, Mic, Menu, Phone, X } from "lucide-react";

export default function DemoChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      role: 'twin' as const, 
      content: "Hello, dear. It's so nice to see you. What would you like to talk about today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Check if user came from the twins/upload page or dashboard
  useEffect(() => {
    const hasCompletedSetup = sessionStorage.getItem("personalityProfile") || 
                             sessionStorage.getItem("contributionCode");
    
    // If the user hasn't gone through the flow, redirect them to the avatar type page
    if (!hasCompletedSetup) {
      navigate("/avatar-type");
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

  return (
    <PageLayout>
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
              <div className="flex-1 p-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-memory-100 flex items-center justify-center mr-3">
                  <span className="text-memory-700 font-medium">G</span>
                </div>
                <div>
                  <h2 className="font-medium">Grandma Mae</h2>
                  <p className="text-xs text-gray-500">Demo Digital Twin</p>
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
                      <option>Current (Age 78)</option>
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
            
            <div className="h-[500px] overflow-y-auto p-4 flex flex-col space-y-4" id="message-container">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.role === 'user' 
                        ? 'bg-forever-500 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        message.role === 'user' ? 'text-forever-200' : 'text-gray-500'
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
            
            <div className="border-t border-gray-100 p-4">
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
                    className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-forever-200 focus:border-forever-400 resize-none"
                    rows={1}
                  />
                </div>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isSending}
                  className="btn-gradient"
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
                    <Button size="sm" className="btn-gradient">
                      View Dashboard
                    </Button>
                  </Link>
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
