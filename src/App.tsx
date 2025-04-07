
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import Auth from "./pages/Auth";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/avatar-type" element={
              <RequireAuth>
                <AvatarType />
              </RequireAuth>
            } />
            <Route path="/profile-creation" element={
              <RequireAuth>
                <ProfileCreation />
              </RequireAuth>
            } />
            <Route path="/personality-sliders" element={
              <RequireAuth>
                <PersonalitySliders />
              </RequireAuth>
            } />
            <Route path="/twin/upload" element={
              <RequireAuth>
                <TwinUpload />
              </RequireAuth>
            } />
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="/demo-chat" element={
              <RequireAuth>
                <DemoChat />
              </RequireAuth>
            } />
            
            {/* Redirect old route to new flow */}
            <Route path="/twin/create" element={<Navigate to="/avatar-type" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
