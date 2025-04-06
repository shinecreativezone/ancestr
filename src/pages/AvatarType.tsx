
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Heart, Link as LinkIcon } from "lucide-react";

export default function AvatarType() {
  const navigate = useNavigate();
  const [contributionCode, setContributionCode] = useState("");
  const [contributionDialog, setContributionDialog] = useState(false);
  const [codeError, setCodeError] = useState("");

  const handleTypeSelection = (type: "self" | "loved_one") => {
    // Store the selection in session storage to maintain it across pages
    sessionStorage.setItem("avatarType", type);
    navigate("/profile-creation");
  };

  const handleContribution = () => {
    // Simple validation - in a real app, you'd validate this against your backend
    if (!contributionCode.trim()) {
      setCodeError("Please enter a valid code or link");
      return;
    }
    
    // Simulate validation
    if (contributionCode.length < 6) {
      setCodeError("Invalid code format. Codes must be at least 6 characters.");
      return;
    }

    // Clear any errors and proceed
    setCodeError("");
    setContributionDialog(false);
    
    // Store contribution code and redirect to appropriate page
    sessionStorage.setItem("contributionCode", contributionCode);
    navigate("/twin/upload"); // Skip directly to upload page for contributions
  };

  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Avatar</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose how you'd like to create your digital twin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* Card A: For Yourself */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => handleTypeSelection("self")}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-500" />
                </div>
                <CardTitle>For Yourself</CardTitle>
                <CardDescription>I'm creating an avatar for myself.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Create a digital twin of yourself to preserve your memories, style, and personality.
                </p>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            {/* Card B: For a Loved One */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => handleTypeSelection("loved_one")}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-gray-500" />
                </div>
                <CardTitle>For a Loved One</CardTitle>
                <CardDescription>I'm creating an avatar for someone I care about.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Preserve the memory or personality of someone special through a digital twin.
                </p>
                <Button className="w-full mt-6">Get Started</Button>
              </CardContent>
            </Card>

            {/* Card C: Contribute to Existing */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]"
              onClick={() => setContributionDialog(true)}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <LinkIcon className="h-8 w-8 text-gray-500" />
                </div>
                <CardTitle>Contribute to Existing</CardTitle>
                <CardDescription>I have a code or link to an existing avatar.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Add your memories, photos or voice recordings to enhance an existing digital twin.
                </p>
                <Button className="w-full mt-6">Enter Code</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Contribution Dialog */}
      <Dialog open={contributionDialog} onOpenChange={setContributionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contribute to an Existing Avatar</DialogTitle>
            <DialogDescription>
              Enter the code or paste the link you received to contribute to an existing avatar.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Avatar Code or Link</Label>
              <Input
                id="code"
                value={contributionCode}
                onChange={(e) => setContributionCode(e.target.value)}
                placeholder="Enter code or paste link here"
                className={codeError ? "border-red-500" : ""}
              />
              {codeError && (
                <p className="text-red-500 text-sm">{codeError}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setContributionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleContribution}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
