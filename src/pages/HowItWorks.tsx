
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, FileText, Mic, MessageCircle, VideoIcon, User, Database, VolumeX, BookOpen, CircleUser } from "lucide-react";

export default function HowItWorks() {
  return (
    <PageLayout>
      <div className="pt-24 md:pt-32 pb-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How Forever Works</h1>
            <p className="text-xl text-gray-600">
              Creating a digital twin is a thoughtful process designed to capture the essence of your loved ones and preserve their memories for generations.
            </p>
          </div>
          
          <InputTypes />
          <ProcessSteps />
          <InteractionModes />
          <FAQ />
          
          <div className="mt-20 text-center">
            <Link to="/demo">
              <Button className="mx-2" variant="outline" size="lg">Try the Demo</Button>
            </Link>
            <Link to="/waitlist">
              <Button className="mx-2 btn-gradient" size="lg">Join the Waitlist</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function InputTypes() {
  const inputTypes = [
    {
      icon: <Mic className="w-12 h-12 text-forever-500" />,
      title: "Voice Recordings",
      description: "Upload existing audio or record new conversations to capture voice, speech patterns, and storytelling style."
    },
    {
      icon: <VideoIcon className="w-12 h-12 text-forever-500" />,
      title: "Video Footage",
      description: "Share videos to help our system analyze expressions, gestures, and visual mannerisms."
    },
    {
      icon: <FileText className="w-12 h-12 text-forever-500" />,
      title: "Written Materials",
      description: "Letters, emails, journals, and other writings help capture authentic writing style and perspectives."
    },
    {
      icon: <Database className="w-12 h-12 text-forever-500" />,
      title: "Personality Questionnaires",
      description: "Answer detailed questions about preferences, beliefs, opinions, and life philosophies."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-forever-500" />,
      title: "Family Stories",
      description: "Collect and share important stories, memories, and significant life events."
    },
    {
      icon: <CircleUser className="w-12 h-12 text-forever-500" />,
      title: "Third-Party Memories",
      description: "Invite family and friends to contribute their memories and perspectives."
    }
  ];

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-6 text-center">Multi-layered Input Types</h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        The more information you provide, the more authentic and accurate your digital twin will be.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {inputTypes.map((type, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm memory-card-hover">
            <div className="mb-4">{type.icon}</div>
            <h3 className="text-xl font-bold mb-2">{type.title}</h3>
            <p className="text-gray-600">{type.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSteps() {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Create a Profile",
      description: "Create your account and set up a profile for the loved one you want to digitally preserve."
    },
    {
      number: 2,
      title: "Upload Content",
      description: "Start uploading voice recordings, videos, photographs, letters, and other meaningful content."
    },
    {
      number: 3,
      title: "Complete Questionnaires",
      description: "Fill out detailed personality questionnaires to capture traits, preferences, and life experiences."
    },
    {
      number: 4,
      title: "Add Timeline & Context",
      description: "Create a timeline of important life events and relationships to provide context."
    },
    {
      number: 5,
      title: "Preview & Refine",
      description: "Interact with an early version of your digital twin and provide feedback to improve accuracy."
    },
    {
      number: 6,
      title: "Share with Family",
      description: "Invite family members to contribute their memories and interact with the digital twin."
    }
  ];

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-6 text-center">The Creation Process</h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Creating a digital twin is a collaborative journey that evolves over time.
      </p>
      
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute top-0 bottom-0 left-12 w-0.5 bg-gray-200 hidden md:block"></div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex">
              <div className="hidden md:flex flex-shrink-0 w-24 h-24 bg-forever-50 rounded-full items-center justify-center border-4 border-white z-10">
                <span className="text-forever-700 text-3xl font-bold">{step.number}</span>
              </div>
              <div className="md:ml-8 flex-1">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InteractionModes() {
  const modes = [
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "Text Conversations",
      description: "Chat with your digital twin through text messages for thoughtful, in-depth conversations."
    },
    {
      icon: <Mic className="w-8 h-8 text-white" />,
      title: "Voice Calls",
      description: "Have audio conversations using voice synthesis to recreate authentic speech patterns."
    },
    {
      icon: <VideoIcon className="w-8 h-8 text-white" />,
      title: "Video Chats",
      description: "Engage in face-to-face video conversations with an AI-generated visual representation."
    },
    {
      icon: <VolumeX className="w-8 h-8 text-white" />,
      title: "Silent Mode",
      description: "Text-only interaction that focuses on the content of communication without voice or video."
    }
  ];

  return (
    <section className="mb-24">
      <h2 className="text-3xl font-bold mb-6 text-center">Interaction Modes</h2>
      <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Connect with your digital twin in the way that feels most meaningful to you.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modes.map((mode, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden memory-card-hover">
            <div className="bg-gradient-to-br from-forever-600 to-memory-600 p-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                {mode.icon}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
              <p className="text-gray-600">{mode.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      question: "How accurate will my digital twin be?",
      answer: "The accuracy depends on the quality and quantity of data provided. With sufficient voice recordings, videos, and written materials, our AI can create a remarkably authentic representation of your loved one's personality, speech patterns, and mannerisms."
    },
    {
      question: "Can I create a twin of someone who has passed away?",
      answer: "Yes, as long as you have sufficient materials like recordings, videos, writings, and memories from people who knew them well. While it won't be a perfect recreation, it can provide meaningful connection and preserve their stories."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We employ bank-level encryption and strict privacy controls. You maintain ownership of all your data, and we never share it with third parties without your explicit permission."
    },
    {
      question: "How long does it take to create a digital twin?",
      answer: "The initial version can be ready within 1-2 weeks of uploading sufficient materials. However, the twin continues to improve over time as you add more data and provide feedback."
    }
  ];

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
