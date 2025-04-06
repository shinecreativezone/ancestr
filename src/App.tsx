
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Waitlist from "./pages/Waitlist";
import About from "./pages/About";
import AvatarType from "./pages/AvatarType";
import ProfileCreation from "./pages/ProfileCreation";
import PersonalitySliders from "./pages/PersonalitySliders";
import Dashboard from "./pages/Dashboard";
import DemoChat from "./pages/DemoChat";
import TwinUpload from "./pages/TwinUpload";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/about" element={<About />} />
          <Route path="/avatar-type" element={<AvatarType />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/personality-sliders" element={<PersonalitySliders />} />
          <Route path="/twin/upload" element={<TwinUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo-chat" element={<DemoChat />} />
          
          {/* Redirect old route to new flow */}
          <Route path="/twin/create" element={<Navigate to="/avatar-type" replace />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
