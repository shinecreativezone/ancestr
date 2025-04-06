
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import Waitlist from "./pages/Waitlist";
import TwinCreate from "./pages/TwinCreate";
import TwinUpload from "./pages/TwinUpload";
import About from "./pages/About";
import AvatarType from "./pages/AvatarType";
import ProfileCreation from "./pages/ProfileCreation";
import PersonalitySliders from "./pages/PersonalitySliders";
import Dashboard from "./pages/Dashboard";
import DemoChat from "./pages/DemoChat";

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
          <Route path="/twin/create" element={<TwinCreate />} />
          <Route path="/twin/upload" element={<TwinUpload />} />
          <Route path="/about" element={<About />} />
          <Route path="/avatar-type" element={<AvatarType />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/personality-sliders" element={<PersonalitySliders />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/demo-chat" element={<DemoChat />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
