
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Preserving memories</span>
                <br />
                <span className="text-gray-900">for future generations</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Ancestr was founded with a simple yet profound mission: to keep the voices, 
                wisdom, and stories of our loved ones alive forever.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1606818616331-32cf95937c9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Family looking through old photo albums" 
                  className="rounded-2xl shadow-md w-full h-80 object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  After losing his grandmother, our founder wished he had recorded more of her stories, 
                  her voice, and her wisdom. This personal experience inspired the vision for Ancestr.
                </p>
                <p className="text-gray-600">
                  We believe that every person carries a unique perspective, invaluable wisdom, 
                  and stories that should be preserved for future generations. Through advanced AI technology, 
                  we're making it possible to create detailed digital twins that capture the essence of our 
                  loved ones.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="flex flex-col justify-center md:order-2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Technology</h2>
                <p className="text-gray-600 mb-4">
                  Ancestr combines multiple AI technologies to create authentic digital representations of people:
                </p>
                <ul className="space-y-2 text-gray-600 mb-4">
                  <li className="flex items-start">
                    <span className="text-warmth-500 mr-2">•</span>
                    <span>Advanced language models that learn communication patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warmth-500 mr-2">•</span>
                    <span>Voice synthesis that captures unique speech patterns</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warmth-500 mr-2">•</span>
                    <span>Visual technology that brings memories to life</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-warmth-500 mr-2">•</span>
                    <span>Personality modeling based on multi-source data</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1533497197926-df3ebf99f721?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern technology with vintage photos" 
                  className="rounded-2xl shadow-md w-full h-80 object-cover"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Values</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We approach our work with deep respect for the memories and legacies we help preserve.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-forever-100 flex items-center justify-center mb-4">
                    <span className="text-forever-600 font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Respect</h3>
                  <p className="text-gray-600">
                    We handle personal memories and stories with the utmost care and respect.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-memory-100 flex items-center justify-center mb-4">
                    <span className="text-memory-600 font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Authenticity</h3>
                  <p className="text-gray-600">
                    We strive to create digital twins that genuinely reflect the unique aspects of each person.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-warmth-100 flex items-center justify-center mb-4">
                    <span className="text-warmth-600 font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Privacy</h3>
                  <p className="text-gray-600">
                    We protect the personal data and memories entrusted to us with rigorous security measures.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Preserve Your Stories?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/avatar-type">
                  <Button size="lg" variant="outline" className="text-lg px-6 h-14 font-medium">
                    Try the Demo
                  </Button>
                </Link>
                <Link to="/waitlist">
                  <Button size="lg" className="text-lg px-6 h-14 font-medium btn-gradient">
                    Join Waitlist <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
