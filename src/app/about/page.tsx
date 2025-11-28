"use client";
import {
  Target,
  Heart,
  Zap,
  Shield,
  Users,
  Code2,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description:
      "Our mission is to democratize coding education and make it accessible to everyone, regardless of their financial situation.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "We believe in the power of community. Our learners support each other, share knowledge, and grow together.",
  },
  {
    icon: Zap,
    title: "Quality Content",
    description:
      "We maintain the highest standards in our curriculum, ensuring every course is comprehensive, up-to-date, and practical.",
  },
  {
    icon: Shield,
    title: "Always Free",
    description:
      "No hidden costs, no premium tiers. We're committed to keeping all our courses completely free forever.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    description: "Former software engineer at Google with a passion for education",
  },
  {
    name: "Michael Chen",
    role: "Head of Curriculum",
    description: "15+ years teaching computer science at top universities",
  },
  {
    name: "Emily Rodriguez",
    role: "Lead Developer",
    description: "Full-stack developer specializing in educational platforms",
  },
  {
    name: "David Kim",
    role: "Community Manager",
    description: "Dedicated to fostering an inclusive learning environment",
  },
];

const roadmapSteps = [
  {
    phase: "Phase 1",
    title: "Foundations",
    duration: "Weeks 1-4",
    topics: ["HTML & CSS Basics", "JavaScript Fundamentals", "Git & GitHub", "Command Line"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    phase: "Phase 2",
    title: "Frontend Development",
    duration: "Weeks 5-12",
    topics: ["React.js", "State Management", "API Integration", "Responsive Design"],
    color: "from-purple-500 to-pink-500",
  },
  {
    phase: "Phase 3",
    title: "Backend Development",
    duration: "Weeks 13-20",
    topics: ["Node.js & Express", "Databases (SQL & NoSQL)", "Authentication", "RESTful APIs"],
    color: "from-green-500 to-emerald-500",
  },
  {
    phase: "Phase 4",
    title: "Advanced Topics",
    duration: "Weeks 21-28",
    topics: ["TypeScript", "Testing", "DevOps", "Cloud Deployment"],
    color: "from-orange-500 to-red-500",
  },
  {
    phase: "Phase 5",
    title: "Specialization",
    duration: "Weeks 29-36",
    topics: ["Choose Your Path", "Mobile Development", "Data Science", "AI/ML"],
    color: "from-indigo-500 to-purple-500",
  },
  {
    phase: "Phase 6",
    title: "Career Ready",
    duration: "Weeks 37-40",
    topics: ["Portfolio Projects", "Interview Prep", "Resume Building", "Job Search"],
    color: "from-rose-500 to-pink-500",
  },
];

const milestones = [
  { year: "2020", event: "CodeLearn Founded", description: "Started with 10 free courses" },
  { year: "2021", event: "10K Students", description: "Reached our first major milestone" },
  { year: "2022", event: "50 Courses", description: "Expanded curriculum significantly" },
  { year: "2023", event: "50K Students", description: "Community grew 5x" },
  { year: "2024", event: "100K+ Students", description: "Became a leading free platform" },
];

const partnerships = [
  { name: "Tech Giants", description: "Collaborating with industry leaders" },
  { name: "Universities", description: "Academic partnerships worldwide" },
  { name: "Startups", description: "Supporting the innovation ecosystem" },
  { name: "Non-Profits", description: "Making education accessible to all" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white/20 hover:bg-white/20 border border-white/30 mb-6">
              About CodeLearn
            </span>
            <h1 className="text-5xl lg:text-6xl mb-6">Empowering Future Developers</h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8">
              We are on a mission to make quality coding education accessible to
              everyone, everywhere, completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-blue-600 hover:bg-gray-100">
                Start Learning Now
              </button>
              <button className="px-6 py-3 text-lg font-semibold rounded-lg border border-white text-white hover:bg-white/10 flex items-center gap-2 justify-center">
                <Play className="h-5 w-5" /> Watch Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white py-12 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl text-blue-600 mb-2">100K+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Free Courses</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>
                  CodeLearn was founded in 2020 with a simple yet powerful vision:
                  to eliminate financial barriers in coding education. We believe
                  that everyone deserves the opportunity to learn programming,
                  regardless of their economic background.
                </p>
                <p>
                  What started as a small collection of free tutorials has grown
                  into a comprehensive learning platform serving over 100,000
                  students worldwide. Our courses are created by industry experts
                  and educators who are passionate about sharing their knowledge.
                </p>
                <p>
                  We have helped thousands of students launch successful careers in
                  tech, build their own projects, and discover the joy of coding.
                  And we are just getting started.
                </p>
              </div>
              <div className="flex gap-4 mt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>100% Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>No Ads</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Learning Roadmap */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl mb-4">Your Learning Roadmap</h2>
            <p className="text-xl text-gray-600">
              A comprehensive path from beginner to professional developer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-6">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-4`}
                  >
                    {index + 1}
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 mb-3">
                    {step.phase}
                  </span>
                  <h3 className="text-xl mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{step.duration}</p>
                  <ul className="space-y-2">
                    {step.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Code2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Milestones that shaped CodeLearn</p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-indigo-300 to-purple-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-6 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="lg:w-5/12">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6">
                      <div className="text-3xl text-blue-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl mb-2">{milestone.event}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  <div className="hidden lg:block lg:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind CodeLearn</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl mb-1">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl mb-4">Our Partners</h2>
            <p className="text-xl text-gray-600">
              Working together to democratize education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships.map((partner, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl mb-6">Join Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you are here to learn or to contribute, we are excited to have
            you as part of our community. Together, we can make coding education
            accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 text-lg font-semibold rounded-lg bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center gap-2">
              Start Learning Free
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="px-6 py-3 text-lg font-semibold rounded-lg border border-white text-white hover:bg-white/10">
              Become an Instructor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
