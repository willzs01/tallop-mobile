interface OnboardingField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'number';
  placeholder?: string;
  options?: string[];
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'info' | 'form' | 'multiSelect';
  fields?: OnboardingField[];
  options?: string[];
  maxSelections?: number;
}

export const userOnboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to Tallop",
    description: "Let's create your personalized career path together. This process will take about 5-7 minutes.",
    type: "info"
  },
  {
    id: "gender",
    title: "Tell us about yourself",
    description: "This helps us personalize your experience",
    type: "form",
    fields: [
      {
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          "Male",
          "Female",
          "Prefer not to say"
        ]
      }
    ]
  },
  {
    id: "education",
    title: "Educational Background",
    description: "Tell us about your academic journey",
    type: "form",
    fields: [
      {
        id: "educationLevel",
        label: "Highest Level of Education",
        type: "select",
        options: [
          "High School",
          "Some College",
          "Associate Degree",
          "Bachelor Degree",
          "Master Degree",
          "Doctorate",
          "Other"
        ]
      },
      {
        id: "fieldOfStudy",
        label: "Field of Study",
        type: "text",
        placeholder: "E.g., Computer Science, Business, etc."
      },
      {
        id: "graduationYear",
        label: "Graduation Year",
        type: "number",
        placeholder: "YYYY"
      }
    ]
  },
  {
    id: "workExperience",
    title: "Work Experience",
    description: "Share your professional background",
    type: "form",
    fields: [
      {
        id: "yearsOfExperience",
        label: "Years of Work Experience",
        type: "select",
        options: [
          "No experience",
          "1-2 years",
          "3-5 years",
          "6-10 years",
          "10+ years"
        ]
      },
      {
        id: "currentIndustry",
        label: "Current/Most Recent Industry",
        type: "select",
        options: [
          "Technology",
          "Healthcare",
          "Finance",
          "Education",
          "Manufacturing",
          "Retail",
          "Other"
        ]
      },
      {
        id: "currentRole",
        label: "Current/Most Recent Role",
        type: "text",
        placeholder: "E.g., Software Engineer, Project Manager"
      }
    ]
  },
  {
    id: "skills",
    title: "Skills Assessment",
    description: "Select your top skills",
    type: "multiSelect",
    options: [
      "Programming",
      "Data Analysis",
      "Project Management",
      "Leadership",
      "Communication",
      "Problem Solving",
      "Design",
      "Marketing",
      "Sales",
      "Research",
      "Writing",
      "Public Speaking"
    ],
    maxSelections: 5
  },
  {
    id: "interests",
    title: "Career Interests",
    description: "What type of work interests you?",
    type: "multiSelect",
    options: [
      "Technical Development",
      "Creative Work",
      "Analysis & Strategy",
      "Management & Leadership",
      "Customer Relations",
      "Research & Development",
      "Teaching & Training",
      "Entrepreneurship"
    ],
    maxSelections: 3
  },
  {
    id: "workStyle",
    title: "Work Style Preferences",
    description: "Tell us about your ideal work environment",
    type: "form",
    fields: [
      {
        id: "workEnvironment",
        label: "Preferred Work Environment",
        type: "select",
        options: [
          "Remote",
          "Hybrid",
          "Office-based",
          "Field work",
          "Flexible"
        ]
      },
      {
        id: "teamSize",
        label: "Preferred Team Size",
        type: "select",
        options: [
          "Solo work",
          "Small team (2-5)",
          "Medium team (6-15)",
          "Large team (15+)",
          "No preference"
        ]
      },
      {
        id: "workSchedule",
        label: "Preferred Work Schedule",
        type: "select",
        options: [
          "Standard business hours",
          "Flexible hours",
          "Night shift",
          "Weekend availability",
          "Project-based"
        ]
      }
    ]
  },
  {
    id: "goals",
    title: "Career Goals",
    description: "What are you looking to achieve?",
    type: "form",
    fields: [
      {
        id: "shortTermGoal",
        label: "Short-term Career Goal (1-2 years)",
        type: "text",
        placeholder: "E.g., Learn new programming language"
      },
      {
        id: "longTermGoal",
        label: "Long-term Career Goal (5+ years)",
        type: "text",
        placeholder: "E.g., Become a Technical Lead"
      },
      {
        id: "salaryExpectation",
        label: "Desired Salary Range",
        type: "select",
        options: [
          "Under $40,000",
          "$40,000 - $60,000",
          "$60,000 - $80,000",
          "$80,000 - $100,000",
          "$100,000 - $150,000",
          "$150,000+"
        ]
      }
    ]
  },
  {
    id: "challenges",
    title: "Career Challenges",
    description: "What obstacles are you facing?",
    type: "multiSelect",
    options: [
      "Lack of experience",
      "Skills gap",
      "Career transition",
      "Limited networking",
      "Work-life balance",
      "Salary expectations",
      "Job market competition",
      "Geographic limitations"
    ],
    maxSelections: 3
  },
  {
    id: "personalityTraits",
    title: "Work Personality",
    description: "How would you describe yourself?",
    type: "multiSelect",
    options: [
      "Analytical",
      "Creative",
      "Detail-oriented",
      "Leadership-focused",
      "Team player",
      "Independent worker",
      "Problem solver",
      "Innovation-driven",
      "Results-oriented",
      "People-focused"
    ],
    maxSelections: 4
  },
  {
    id: "learningStyle",
    title: "Learning Preferences",
    description: "How do you prefer to learn new skills?",
    type: "multiSelect",
    options: [
      "Online courses",
      "Hands-on practice",
      "Mentorship",
      "Reading documentation",
      "Video tutorials",
      "Group workshops",
      "Trial and error",
      "Academic courses"
    ],
    maxSelections: 3
  },
  {
    id: "completion",
    title: "Almost There!",
    description: "We are ready to generate your personalized career recommendations.",
    type: "info"
  }
];

export interface OnboardingResponse {
  gender?: string;
  [key: string]: any;
}

export const initialOnboardingResponse: OnboardingResponse = {
  gender: "",
  educationLevel: "",
  fieldOfStudy: "",
  graduationYear: "",
  yearsOfExperience: "",
  currentIndustry: "",
  currentRole: "",
  skills: [],
  interests: [],
  workEnvironment: "",
  teamSize: "",
  workSchedule: "",
  shortTermGoal: "",
  longTermGoal: "",
  salaryExpectation: "",
  challenges: [],
  personalityTraits: [],
  learningStyle: []
};

