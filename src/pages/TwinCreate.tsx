
import { PageLayout } from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Upload, FileText, User, MessageCircle, CircleCheck, CircleIcon, Mic } from "lucide-react";
import { Link } from "react-router-dom";

export default function TwinCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  
  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Upload Content" },
    { id: 3, name: "Personality" },
    { id: 4, name: "Relationships" },
    { id: 5, name: "Preview" }
  ];
  
  const goToStep = (step: number) => {
    if (step > 0 && step <= steps.length) {
      setCurrentStep(step);
    }
  };
  
  return (
    <PageLayout>
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Create Your Digital Twin</h1>
              <p className="text-gray-600">
                Follow the steps below to create a meaningful digital representation of your loved one.
              </p>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div 
                      onClick={() => goToStep(step.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                        step.id < currentStep
                          ? 'bg-forever-500 text-white'
                          : step.id === currentStep
                            ? 'bg-white border-2 border-forever-500 text-forever-500'
                            : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.id < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <span className={`text-sm mt-2 ${
                      step.id === currentStep ? 'text-forever-700 font-medium' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="h-1 bg-gray-100 relative">
                <div 
                  className="absolute top-0 left-0 h-1 bg-forever-500 transition-all duration-500"
                  style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-10">
                {currentStep === 1 && <BasicInfoStep onNext={() => goToStep(2)} />}
                {currentStep === 2 && (
                  <UploadStep 
                    onNext={() => goToStep(3)} 
                    onBack={() => goToStep(1)}
                  />
                )}
                {currentStep === 3 && (
                  <PersonalityStep 
                    onNext={() => goToStep(4)} 
                    onBack={() => goToStep(2)}
                  />
                )}
                {currentStep === 4 && (
                  <RelationshipsStep 
                    onNext={() => goToStep(5)} 
                    onBack={() => goToStep(3)}
                  />
                )}
                {currentStep === 5 && (
                  <PreviewStep
                    onBack={() => goToStep(4)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function BasicInfoStep({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Basic Information</h2>
      <p className="text-gray-600 mb-8">Let's start with some basic information about the person you want to create a digital twin for.</p>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              placeholder="First name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              placeholder="Last name"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Year
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              placeholder="Year of birth"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Age or Year of Passing
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
              placeholder="Current age or year of passing"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Relationship
          </label>
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
          >
            <option value="">Select relationship</option>
            <option value="parent">Parent</option>
            <option value="grandparent">Grandparent</option>
            <option value="spouse">Spouse/Partner</option>
            <option value="sibling">Sibling</option>
            <option value="friend">Friend</option>
            <option value="child">Child</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brief Description
          </label>
          <textarea
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
            placeholder="A brief description of the person (e.g., personality traits, occupation, notable characteristics)"
          ></textarea>
        </div>
        
        <div className="pt-4">
          <Button onClick={onNext} className="w-full py-6 text-lg btn-gradient">
            Continue to Upload Content
          </Button>
        </div>
      </div>
    </div>
  );
}

function UploadStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const uploadTypes = [
    {
      icon: <FileText className="h-8 w-8 text-forever-600" />,
      title: "Documents & Letters",
      description: "Upload letters, emails, journal entries, or other written materials",
      formats: "PDF, DOC, TXT, etc."
    },
    {
      icon: <Mic className="h-8 w-8 text-forever-600" />,
      title: "Voice Recordings",
      description: "Upload existing audio files or record new voice samples",
      formats: "MP3, WAV, M4A, etc."
    },
    {
      icon: <Upload className="h-8 w-8 text-forever-600" />,
      title: "Photos & Videos",
      description: "Upload photos and video footage to help create visual representation",
      formats: "JPG, PNG, MP4, MOV, etc."
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Upload Content</h2>
      <p className="text-gray-600 mb-8">
        The more content you provide, the more authentic your digital twin will be. You can always add more later.
      </p>
      
      <div className="space-y-8">
        {uploadTypes.map((type, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1">{type.icon}</div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{type.title}</h3>
                <p className="text-gray-600 mb-2">{type.description}</p>
                <p className="text-sm text-gray-500 mb-4">Supported formats: {type.formats}</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-forever-400 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 mb-1">Drag and drop files here, or click to browse</p>
                  <p className="text-xs text-gray-400">Maximum file size: 100MB</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="btn-gradient">
            Continue to Personality
          </Button>
        </div>
      </div>
    </div>
  );
}

function PersonalityStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const personalityCategories = [
    {
      title: "Values & Beliefs",
      questions: [
        "What were/are their core values?",
        "What were/are their religious or spiritual beliefs?",
        "What political or social causes were/are important to them?"
      ]
    },
    {
      title: "Communication Style",
      questions: [
        "How would you describe their communication style?",
        "Did/do they have any common phrases or sayings?",
        "How did/do they typically respond to conflict?"
      ]
    },
    {
      title: "Interests & Hobbies",
      questions: [
        "What were/are their favorite activities or hobbies?",
        "What topics would they talk about most enthusiastically?",
        "Were/are there any subjects they strongly disliked discussing?"
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Personality Profile</h2>
      <p className="text-gray-600 mb-8">
        Help us understand their personality, preferences, and communication style.
      </p>
      
      <div className="space-y-10">
        {personalityCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-xl font-medium mb-4">{category.title}</h3>
            <div className="space-y-6">
              {category.questions.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question}
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 input-gradient-focus"
                    placeholder="Your answer"
                  ></textarea>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="btn-gradient">
            Continue to Relationships
          </Button>
        </div>
      </div>
    </div>
  );
}

function RelationshipsStep({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [relationships, setRelationships] = useState([
    { name: "", relation: "", significance: "" }
  ]);
  
  const addRelationship = () => {
    setRelationships([...relationships, { name: "", relation: "", significance: "" }]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Important Relationships</h2>
      <p className="text-gray-600 mb-8">
        Add information about the key people in their life to help create accurate relationship memories.
      </p>
      
      <div className="space-y-8">
        {relationships.map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Person {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 input-gradient-focus"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 input-gradient-focus"
                  placeholder="e.g., Daughter, Friend, Colleague"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Significance & Memories
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 input-gradient-focus"
                placeholder="Describe their relationship and any significant shared memories"
              ></textarea>
            </div>
          </div>
        ))}
        
        <div>
          <Button variant="outline" onClick={addRelationship} className="w-full">
            + Add Another Person
          </Button>
        </div>
        
        <div className="pt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="btn-gradient">
            Continue to Preview
          </Button>
        </div>
      </div>
    </div>
  );
}

function PreviewStep({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CircleCheck className="h-8 w-8 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4 text-center">Almost Ready!</h2>
      <p className="text-gray-600 mb-8 text-center">
        We're processing your information to create your digital twin. This typically takes 24-48 hours.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium mb-4">Twin Creation Progress</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Data Processing</span>
              <span className="text-sm text-gray-500">In Progress</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-forever-500 h-2 rounded-full" style={{ width: "25%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Personality Modeling</span>
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-200 h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Voice Synthesis</span>
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-200 h-2 rounded-full" style={{ width: "0%" }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <CircleCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-gray-700">Basic information recorded</span>
        </div>
        <div className="flex items-center">
          <CircleCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-gray-700">Content uploads received</span>
        </div>
        <div className="flex items-center">
          <CircleCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-gray-700">Personality profile created</span>
        </div>
        <div className="flex items-center">
          <CircleCheck className="h-5 w-5 text-green-600 mr-2" />
          <span className="text-gray-700">Relationship information recorded</span>
        </div>
        <div className="flex items-center">
          <CircleIcon className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-500">Processing and training AI model</span>
        </div>
      </div>
      
      <div className="pt-8 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Link to="/demo">
          <Button className="btn-gradient">
            Try the Demo While You Wait
          </Button>
        </Link>
      </div>
    </div>
  );
}
