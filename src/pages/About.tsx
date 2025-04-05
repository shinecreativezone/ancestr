
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About Forever</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're on a mission to preserve the essence of our loved ones through 
                technology, allowing meaningful conversations to transcend time.
              </p>
            </div>
            
            <div className="prose prose-lg max-w-4xl mx-auto">
              <h2>Our Mission</h2>
              <p>
                Forever was founded with a simple yet profound belief: that the wisdom, 
                stories, and love of our most cherished people shouldn't be lost to time. 
                We're building technology that preserves not just memories, but the 
                experience of conversation – the back-and-forth, the laughter, the insights 
                that make relationships meaningful.
              </p>
              
              <h2>How It Works</h2>
              <p>
                Our platform uses advanced AI to create digital twins of loved ones by 
                analyzing their writing, voice recordings, video footage, and memories shared 
                by family and friends. These inputs create a rich, nuanced representation that 
                captures the essence of a person – their values, stories, communication style, 
                and memories.
              </p>
              
              <h2>Our Values</h2>
              <ul>
                <li><strong>Authenticity:</strong> We strive to create twins that genuinely reflect the person they represent.</li>
                <li><strong>Empathy:</strong> We understand the deeply emotional nature of our work and approach it with care.</li>
                <li><strong>Privacy:</strong> Your data and memories are treated with the utmost respect and security.</li>
                <li><strong>Accessibility:</strong> We believe everyone should have access to this technology, regardless of technical ability.</li>
              </ul>
              
              <h2>Join Our Journey</h2>
              <p>
                We're in the early stages of this journey and welcome you to join us. Whether you're 
                looking to preserve your own stories, immortalize the wisdom of an elder, or reconnect 
                with someone you've lost, we're building Forever for you.
              </p>
            </div>
            
            <div className="flex justify-center mt-10">
              <Link to="/twin/create">
                <Button className="btn-gradient px-8 py-6 text-lg">
                  Create Your First Twin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
