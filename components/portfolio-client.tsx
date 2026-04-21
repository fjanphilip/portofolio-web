"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Award,
  Code,
  Palette,
  Database,
  Globe,
  User,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Wrench,
} from "lucide-react";
import Image from "next/image";

// Map category to icon
const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Code,
  Backend: Database,
  Design: Palette,
  Tools: Wrench,
};

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  demoUrl: string | null;
  repoUrl: string | null;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issuedDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
}

interface PortfolioClientProps {
  projects: Project[];
  certificates: Certificate[];
  skillsByCategory: Record<string, { name: string; iconUrl: string | null }[]>;
}

export function PortfolioClient({
  projects,
  certificates,
  skillsByCategory,
}: PortfolioClientProps) {
  const [activeSection, setActiveSection] = useState("profile");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = ["profile", "skills", "projects", "certificates", "contact"];
        const scrollPosition = window.scrollY + 150;
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }, 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-center space-x-8">
            {[
              { id: "profile", label: "Profile" },
              { id: "skills", label: "Skills" },
              { id: "projects", label: "Projects" },
              { id: "certificates", label: "Certificates" },
              { id: "contact", label: "Contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-all duration-500 relative group px-3 py-2 rounded-md ${
                  activeSection === item.id
                    ? "text-white bg-gray-800/50"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-500 ${
                    activeSection === item.id ? "w-8" : "group-hover:w-6"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Profile Jumbotron */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto max-w-6xl text-center">
          <User className="h-20 w-20 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">PROFILE</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Get to know who I am, my journey, and what drives my passion for creating exceptional digital experiences
          </p>
          <div className="mt-12 animate-fade-in-delay-2">
            <Button
              onClick={() => scrollToSection("profile")}
              variant="outline"
              size="lg"
              className="border-gray-600 text-black hover:bg-gray-800 hover:scale-105 hover:text-white transition-all duration-300"
            >
              Explore My Story
            </Button>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section id="profile" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Hi, I&apos;m <span className="text-white">Jan Philip Faith</span>
                </h2>
                <p className="text-2xl text-gray-400">Web - Desktop - IoT Developer</p>
              </div>
              <p className="text-lg leading-relaxed text-gray-300 max-w-2xl">
                Fullstack Developer with medium-level Laravel expertise since 2020, experienced in PHP, JavaScript, and Python. Strong team player with good communication skills, adaptability, and a growth mindset.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=fjanphilip9.jp@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 gap-2">
                    <Mail className="h-4 w-4" />
                    Get In Touch
                  </Button>
                </a>
                <a href="https://github.com/fjanphilip" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-600 text-black hover:bg-gray-800 hover:text-white gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View GitHub
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 rounded-full overflow-hidden border-2 border-gray-700 shadow-xl">
                  <Image
                    src="/PASFOTO.jpeg?height=320&width=320"
                    alt="Jan Philip Faith - Full Stack Developer"
                    width={320}
                    height={320}
                    className="object-cover relative -top-10"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-black p-3 rounded-full">
                  <Code className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Jumbotron */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Code className="h-20 w-20 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">SKILLS</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Discover the technologies, tools, and methodologies I use to build amazing digital solutions
          </p>
          <div className="mt-12 animate-fade-in-delay-2">
            <Button
              onClick={() => scrollToSection("skills")}
              variant="outline"
              size="lg"
              className="border-gray-600 text-black hover:bg-gray-800 hover:scale-105 hover:text-white transition-all duration-300"
            >
              View My Expertise
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Content — Dynamic */}
      <section id="skills" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).length > 0 ? (
              Object.entries(skillsByCategory).map(([category, skills]) => {
                const IconComponent = categoryIcons[category] || Code;
                return (
                  <Card
                    key={category}
                    className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all duration-300"
                  >
                    <CardHeader className="text-center">
                      <IconComponent className="h-12 w-12 mx-auto text-white mb-4" />
                      <CardTitle className="text-white">{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {skills.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-12">
                Skills belum ditambahkan.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Projects Jumbotron */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <Briefcase className="h-20 w-20 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">PROJECTS</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Explore my portfolio of innovative projects, from web applications to mobile solutions
          </p>
          <div className="mt-12 animate-fade-in-delay-2">
            <Button
              onClick={() => scrollToSection("projects")}
              variant="outline"
              size="lg"
              className="border-gray-600 text-black hover:bg-gray-800 hover:scale-105 hover:text-white transition-all duration-300"
            >
              See My Work
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Content — Dynamic */}
      <section id="projects" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="aspect-video bg-gray-800">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        width={350}
                        height={200}
                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Briefcase className="h-12 w-12 text-gray-700" />
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-gray-600 text-gray-300"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-black-300 hover:bg-gray-800 hover:text-white gap-2"
                          >
                            <Github className="h-4 w-4" />
                            Code
                          </Button>
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-black-300 hover:bg-gray-800 hover:text-white gap-2"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-12">
                Projects belum ditambahkan.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Certificates Jumbotron */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <GraduationCap className="h-20 w-20 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">CERTIFICATES</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Professional certifications and achievements that validate my expertise and continuous learning
          </p>
          <div className="mt-12 animate-fade-in-delay-2">
            <Button
              onClick={() => scrollToSection("certificates")}
              variant="outline"
              size="lg"
              className="border-gray-600 text-black hover:bg-gray-800 hover:scale-105 hover:text-white transition-all duration-300"
            >
              View Credentials
            </Button>
          </div>
        </div>
      </section>

      {/* Certificates Content — Dynamic */}
      <section id="certificates" className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <CardHeader className="text-center">
                    {cert.imageUrl ? (
                      <img src={cert.imageUrl} alt={cert.name} className="rounded-md" />
                    ) : (
                      <div className="w-full h-40 bg-gray-800 rounded-md flex items-center justify-center">
                        <Award className="h-12 w-12 text-gray-700" />
                      </div>
                    )}
                    <CardTitle className="text-white text-[20px]">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-400 -mt-2 mb-2">
                      Certified by {cert.issuer}
                    </p>
                    <p className="text-sm text-gray-500">{cert.issuedDate}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-500 col-span-3 text-center py-12">
                Certificates belum ditambahkan.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contact Jumbotron */}
      <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <MessageCircle className="h-20 w-20 mx-auto mb-8 text-white animate-pulse" />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">CONTACT</h1>
          <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay">
            Ready to start your next project? Let&apos;s discuss how we can bring your ideas to life
          </p>
          <div className="mt-12 animate-fade-in-delay-2">
            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              size="lg"
              className="border-gray-600 text-black hover:bg-gray-800 hover:text-white hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section id="contact" className="py-20 px-6 bg-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-1 gap-16 text-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">Let&apos;s Work Together</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I&apos;m always interested in new opportunities and exciting projects. Let&apos;s discuss how we can
                  bring your ideas to life.
                </p>
              </div>

              <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-300">fjanphilip9.jp@email.com</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-300">+62 813-5915-2965</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-gray-300">Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">&copy; 2024 Jan Philip Faith. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
