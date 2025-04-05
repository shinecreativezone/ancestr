
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

export default function Waitlist() {
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    story: "",
    reason: "personal"
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formState);
    setSubmitted(true);
  };
  
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32 pb-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Waitlist</h1>
              <p className="text-xl text-gray-600">
                Be among the first to create meaningful digital connections with your loved ones.
              </p>
            </div>
            
            {!submitted ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-10">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formState.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
                          placeholder="Your email address"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                          I'm interested in creating a digital twin for:
                        </label>
                        <select
                          id="reason"
                          name="reason"
                          value={formState.reason}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
                        >
                          <option value="personal">Personal use (for myself or family)</option>
                          <option value="memorial">Memorial purposes</option>
                          <option value="future">Future preservation</option>
                          <option value="business">Business or educational use</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-1">
                          If you could speak to someone again, who would it be and what would you say?
                        </label>
                        <textarea
                          id="story"
                          name="story"
                          value={formState.story}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
                          placeholder="Share your story (optional)"
                        ></textarea>
                      </div>
                      
                      <div className="pt-2">
                        <Button type="submit" className="w-full py-6 text-lg btn-gradient">
                          Join the Waitlist
                        </Button>
                        <p className="mt-3 text-xs text-center text-gray-500">
                          By joining, you agree to our <a href="/terms" className="underline">terms of service</a> and <a href="/privacy" className="underline">privacy policy</a>.
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden text-center p-10">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Thank You for Joining Our Waitlist!</h2>
                <p className="text-gray-600 mb-6">
                  We've received your submission and will contact you as soon as we're ready to welcome you to Forever Conversations.
                </p>
                <p className="text-gray-600 mb-8">
                  In the meantime, you can explore our demo to get a feel for what the experience will be like.
                </p>
                <Button variant="outline" onClick={() => window.location.href = '/demo'}>
                  Try the Demo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
