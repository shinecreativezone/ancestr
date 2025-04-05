
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MessageCircle, Upload, VideoIcon, Mic, FileText, User } from "lucide-react";

export default function Index() {
  return (
    <PageLayout>
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <Testimonials />
      <PricingPreview />
      <JoinWaitlistSection />
    </PageLayout>
  );
}

function Hero() {
  return (
    <section className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Your mother's laugh. Your father's voice.</span>
            <br />
            <span className="text-gray-900">One more story. One more conversation.</span>
            <br />
            <span className="text-forever-700">Forever.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Create a digital twin of your loved ones to preserve their memories, stories, and personality for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/demo">
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
      
      <div className="mt-16 md:mt-24 relative">
        <div className="bg-gray-100 py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="text-center text-white">
                    <p className="text-lg font-medium mb-2">Demo Video Player</p>
                    <p className="text-gray-400">Emotional video of someone talking to their digital twin</p>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 bg-white/20 backdrop-blur-sm border-2 border-white hover:bg-white/30">
                    <VideoIcon className="h-8 w-8 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    {
      icon: <Upload className="h-6 w-6 text-forever-600" />,
      title: "Multi-layered Data",
      description: "Upload voice recordings, videos, documents, personality tests, and memories from others."
    },
    {
      icon: <Heart className="h-6 w-6 text-memory-600" />,
      title: "Personalized Interaction",
      description: "Talk to specific versions of your loved one from different times in their life."
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-warmth-500" />,
      title: "Multiple Interaction Modes",
      description: "Engage through text, voice calls, video chats, or future VR experiences."
    },
  ];
  
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Create Digital Twins That Feel <span className="gradient-text">Real</span>
          </h2>
          <p className="text-xl text-gray-600">
            Our advanced AI technology combines multiple sources of information to create authentic digital representations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 memory-card-hover">
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-10 w-10 text-white" />,
      title: "Collect & Upload",
      description: "Gather photos, videos, voice recordings, writings, and memories from family and friends."
    },
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Create Profile",
      description: "Complete personality questionnaires and provide context about relationships and life events."
    },
    {
      icon: <User className="h-10 w-10 text-white" />,
      title: "Preview & Refine",
      description: "Test your digital twin and refine its responses and personality traits."
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-white" />,
      title: "Connect & Share",
      description: "Start meaningful conversations and share access with family members."
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-gray-600">
            Creating a digital twin is a thoughtful process designed to capture the essence of your loved one.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-0.5 bg-gradient-to-b from-forever-500 to-memory-600 hidden md:block"></div>
            
            <div className="space-y-12 md:space-y-0 relative">
              {steps.map((step, index) => (
                <div key={index} className="md:grid md:grid-cols-2 md:gap-8 items-center">
                  <div className={`md:text-right ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className={`flex ${index % 2 === 1 ? 'md:justify-end' : ''}`}>
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-forever-600 to-memory-600 z-10">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  <div className={`mt-6 md:mt-0 ${index % 2 === 1 ? 'md:order-0' : ''}`}>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 aspect-video flex items-center justify-center p-4">
                      <div className="text-center text-gray-400">
                        <p>Step {index + 1} Illustration</p>
                        <p className="text-sm">Visual representation of the {step.title.toLowerCase()} process</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "I can share my grandfather's stories with my children exactly as he would tell them. It's like he's still with us.",
      name: "Sarah Johnson",
      role: "Early User"
    },
    {
      quote: "Being able to hear my mother's voice again and ask her questions I never got to ask—it's beyond words.",
      name: "Michael Chen",
      role: "Beta Tester"
    },
    {
      quote: "The personality capture is remarkable. The digital twin responds just like my father would have.",
      name: "Elena Rodriguez",
      role: "Family Plan User"
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Meaningful Connections
          </h2>
          <p className="text-xl text-gray-600">
            Hear from people who have experienced the power of Forever Conversations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="mb-6 text-forever-300 flex justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 6.5C11 4.01 8.99 2 6.5 2C4.01 2 2 4.01 2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5ZM22 6.5C22 4.01 19.99 2 17.5 2C15.01 2 13 4.01 13 6.5C13 8.99 15.01 11 17.5 11C19.99 11 22 8.99 22 6.5ZM22 17.5C22 15.01 19.99 13 17.5 13C15.01 13 13 15.01 13 17.5C13 19.99 15.01 22 17.5 22C19.99 22 22 19.99 22 17.5ZM11 17.5C11 15.01 8.99 13 6.5 13C4.01 13 2 15.01 2 17.5C2 19.99 4.01 22 6.5 22C8.99 22 11 19.99 11 17.5Z" fill="currentColor" />
                </svg>
              </div>
              <blockquote className="text-lg text-gray-600 flex-grow mb-6 text-center">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-center">
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  const plans = [
    {
      name: "Basic Twin",
      price: "Free",
      features: [
        "Text-based conversations",
        "Basic personality capture",
        "Up to 50 memories",
        "Single user access"
      ],
      cta: "Join Waitlist",
      popular: false
    },
    {
      name: "Premium Twin",
      price: "$19.99",
      period: "per month",
      features: [
        "Voice conversations",
        "Video interactions",
        "Advanced personality capture",
        "Unlimited memories",
        "Timeline customization",
        "2 user access"
      ],
      cta: "Join Waitlist",
      popular: true
    },
    {
      name: "Family Plan",
      price: "$39.99",
      period: "per month",
      features: [
        "Everything in Premium",
        "Up to 5 Digital Twins",
        "Family shared access (10 users)",
        "Priority customer support",
        "Early access to new features"
      ],
      cta: "Join Waitlist",
      popular: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs, from basic memory preservation to immersive interactions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-sm overflow-hidden flex flex-col ${
                plan.popular ? 'border-2 border-forever-500 ring-4 ring-forever-100 relative' : 'border border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-forever-500 text-white px-4 py-1 text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="p-8 flex-grow">
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
                </div>
                
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <svg className="h-5 w-5 text-forever-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-6 border-t border-gray-100">
                <Link to="/waitlist">
                  <Button 
                    className={`w-full ${plan.popular ? 'btn-gradient' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinWaitlistSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-forever-50 to-memory-50 rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Who would you talk to if you had one more chance?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our waitlist to be among the first to create and experience meaningful conversations with your loved ones.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              />
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              />
              <textarea
                placeholder="If you could speak to someone again, who would it be and what would you say?"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              ></textarea>
              <Button className="w-full py-6 text-lg btn-gradient">
                Join the Waitlist
              </Button>
              <p className="text-xs text-center text-gray-500">
                By joining, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
