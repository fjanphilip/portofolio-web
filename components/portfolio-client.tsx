"use client";

import { useState, useEffect, useRef } from "react";
import {
  Github,
  ExternalLink,
  Linkedin,
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Palette,
  Code,
  Server,
  Wrench,
  Award,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { Typewriter } from "@/components/ui/typewriter-text";

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

const categoryMetadata: Record<
  string,
  { description: string; icon: LucideIcon }
> = {
  Design: {
    description:
      "Crafting intuitive, clean, and pixel-perfect interfaces. I don’t just design visuals; I architect user journeys that are structurally sound, highly functional, and seamless to interact with.",
    icon: Palette,
  },
  Frontend: {
    description:
      "Turning complex design frameworks into highly responsive, interactive web applications. Focused on component-driven development, state management, and optimized rendering to ensure a fluid user experience.",
    icon: Code,
  },
  Backend: {
    description:
      "Building robust, secure, and scalable backend systems using clean code principles. Expert in managing data persistence, automated workflows, server infrastructure, and specialized hardware integrations.",
    icon: Server,
  },
};

const getCategoryDetails = (category: string) => {
  const key = Object.keys(categoryMetadata).find(
    (k) => k.toLowerCase() === category.toLowerCase(),
  );
  if (key) {
    return categoryMetadata[key];
  }
  return {
    description:
      "Specialized skills and technologies applied to design, build, and deploy premium modern applications.",
    icon: Code,
  };
};

export function PortfolioClient({
  projects,
  certificates,
  skillsByCategory,
}: PortfolioClientProps) {
  const [activeSection, setActiveSection] = useState("profile");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const imageMaskRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const profileSectionRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const scrollCarousel = (direction: number) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth * 0.4;
      carouselRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Active Section Highlighting
          const sections = [
            "profile",
            "projects",
            "skills",
            "certificates",
            "contact",
          ];
          const scrollPosition = window.scrollY + 150;
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetHeight = element.offsetHeight;
              if (
                scrollPosition >= offsetTop &&
                scrollPosition < offsetTop + offsetHeight
              ) {
                setActiveSection(section);
                break;
              }
            }
          }

          // 2. Scroll Reveal Animations for Hero Section (Direct DOM manipulation for high performance)
          const profile = profileSectionRef.current;
          const mask = imageMaskRef.current;
          const heroText = heroTextRef.current;
          const container = heroContainerRef.current;

          if (profile && mask && heroText && container) {
            const scrollPos = window.scrollY;
            const profileTop = profile.offsetTop;
            const profileHeight = profile.offsetHeight;
            const windowHeight = window.innerHeight;

            const relativeScroll = scrollPos - profileTop;
            const scrollableRange = profileHeight - windowHeight;

            if (relativeScroll >= 0 && relativeScroll <= scrollableRange) {
              const progress = Math.min(relativeScroll / scrollableRange, 1);

              // Text fades out and scales down as we scroll
              const textOpacity = Math.max(1 - progress * 4, 0);
              const textScale = 1 - progress * 0.2;
              heroText.style.opacity = textOpacity.toString();
              heroText.style.transform = `scale(${textScale})`;
              heroText.style.pointerEvents =
                textOpacity < 0.1 ? "none" : "auto";

              // Image reveal logic
              if (progress > 0.1) {
                const revealProgress = Math.min((progress - 0.1) / 0.5, 1);
                const clipValue = 20 - revealProgress * 20;
                const radiusValue = 40 - revealProgress * 40;
                mask.style.clipPath = `inset(${clipValue}% round ${radiusValue}px)`;

                const translateValue = 100 - revealProgress * 100;
                const scaleValue = 0.8 + revealProgress * 0.2;
                mask.style.transform = `translateY(${translateValue}px) scale(${scaleValue})`;
                mask.style.opacity = revealProgress.toString();

                container.style.transform = `translateZ(${revealProgress * 105}px) rotateX(${5 - revealProgress * 5}deg)`;
              } else {
                mask.style.opacity = "0";
              }
            } else if (relativeScroll < 0) {
              heroText.style.opacity = "1";
              heroText.style.transform = "scale(1)";
              heroText.style.pointerEvents = "auto";
              mask.style.opacity = "0";
            } else {
              heroText.style.opacity = "0";
              heroText.style.pointerEvents = "none";
              mask.style.clipPath = "inset(0% round 0px)";
              mask.style.transform = "translateY(0px) scale(1)";
              mask.style.opacity = "1";
              container.style.transform = "translateZ(100px) rotateX(0deg)";
            }
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial trigger
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    if (img) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const moveX = (x - rect.width / 2) / 20;
      const moveY = (y - rect.height / 2) / 20;
      img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const img = card.querySelector("img");
    if (img) {
      img.style.transform = "scale(1) translate(0px, 0px)";
    }
  };

  return (
    <div className="bg-[#09090B] text-[#e5e2e1] font-body-md selection:bg-white selection:text-[#09090B] min-h-screen">
      {/* TopAppBar */}
      <nav className="fixed top-0 w-full z-[60] bg-[#09090B]/80 backdrop-blur-md border-b border-[#444748]/30 flex justify-between items-center h-20 px-6 md:px-16">
        <div className="font-display-xl text-2xl md:text-3xl tracking-tighter text-white lowercase">
          myportfolio
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {[
            { id: "profile", label: "Profile" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "certificates", label: "Certificates" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`font-label-sm text-xs uppercase tracking-widest transition-colors duration-300 ${
                activeSection === item.id
                  ? "text-white"
                  : "text-[#c4c7c8] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("contact")}
            className="font-label-sm text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-305 text-white border-white hover:bg-white hover:text-[#09090B]"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white flex items-center justify-center focus:outline-none w-10 h-10 border border-[#27272A] hover:bg-[#141313] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#09090B] flex flex-col justify-center items-center gap-8 px-6">
          <button
            className="absolute top-6 right-6 text-white flex items-center justify-center focus:outline-none w-10 h-10 border border-[#27272A]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <div className="font-display-xl text-3xl tracking-tighter text-white mb-8 lowercase">
            portofolio
          </div>
          {[
            { id: "profile", label: "Profile" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "certificates", label: "Certificates" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="font-headline-md text-2xl text-[#c4c7c8] hover:text-white uppercase tracking-wider transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              scrollToSection("contact");
              setIsMobileMenuOpen(false);
            }}
            className="font-label-sm text-sm text-white uppercase tracking-widest px-8 py-3 border border-white mt-4 hover:bg-white hover:text-[#09090B] transition-all duration-300"
          >
            CONTACT
          </button>
        </div>
      )}

      <main>
        {/* Redesigned Hero Section */}
        <section
          ref={profileSectionRef}
          className="relative h-[300vh] deep-onyx-bg overflow-clip snap-start snap-always"
          id="profile"
        >
          {/* Technical Metadata */}
          <div className="fixed top-24 left-6 md:left-16 z-40 pointer-events-none opacity-40">
            <p className="font-label-sm text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
              LAT: 34.0522° N • LONG: 118.2437° W
            </p>
          </div>
          <div className="fixed top-24 right-6 md:right-16 z-40 pointer-events-none opacity-40 text-right">
            <p className="font-label-sm text-[9px] md:text-[10px] tracking-[0.2em] uppercase">
              SYS.ACTIVE • PORTFOLIO_V2.0
            </p>
          </div>

          {/* Scroll Content Container */}
          <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-16">
            {/* Text Reveal Content */}
            <div
              ref={heroTextRef}
              className="absolute z-20 text-center transition-all duration-300 transform"
              id="hero-text"
            >
              <p className="font-label-sm text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-[#c4c7c8]">
                FULLSTACK DEVELOPER • DESKTOP • IOT
              </p>
              <h1 className="font-display-xl text-[48px] md:text-[100px] lg:text-[140px] leading-[0.9] font-black uppercase tracking-tighter mb-4 text-white">
                JAN PHILIP FAITH
              </h1>
              <h2 className="font-headline-lg text-lg md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto uppercase min-h-[64px]">
                <Typewriter
                  text={[
                    "UI ARCHITECT building exceptional digital experiences.",
                    "A curated showcase of turning complex designs into reality and integrating robust components into production-ready web systems.",
                  ]}
                  speed={80}
                  delay={2500}
                  loop={true}
                  cursor="|"
                />
              </h2>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => scrollToSection("projects")}
                  className="hero-glow bg-white text-[#09090B] font-label-sm text-xs px-12 py-5 rounded-full uppercase font-black tracking-widest hover:scale-105 transition-all duration-300"
                >
                  GET STARTED
                </button>
              </div>
            </div>

            {/* Scroll-Based Portrait Image - Styled vertical max-w-md aspect-[3/4] on all viewports */}
            <div
              ref={heroContainerRef}
              className="relative w-full max-w-md md:max-w-lg aspect-[3/4] z-10 flex items-center justify-center animate-fade-in-delay-2"
              id="hero-scroll-container"
            >
              <div
                ref={imageMaskRef}
                className="relative w-full h-full overflow-hidden"
                id="image-mask"
                style={{
                  clipPath: "inset(20% round 40px)",
                  transform: "translateY(100px) scale(0.8)",
                  opacity: 0,
                }}
              >
                <Image
                  alt="Professional editorial portrait"
                  className="w-full h-full object-cover grayscale brightness-95 contrast-105"
                  src="/PASFOTO.jpeg"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                  style={{ objectPosition: "center 12%" }}
                />
                {/* Editorial Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Background Large Text - Styled as an ultra-subtle transparent outline stroke watermark */}
            <div className="absolute bottom-10 left-10 opacity-[0.02] pointer-events-none select-none z-0">
              <span
                className="font-display-xl text-[18vw] leading-none uppercase tracking-tighter"
                style={{
                  WebkitTextStroke: "1px #ffffff",
                  color: "transparent",
                }}
              >
                portofolio
              </span>
            </div>
          </div>
        </section>

        {/* Projects Carousel */}
        <section
          className="py-32 bg-[#0e0e0e] border-y border-[#444748]/30 relative z-30 snap-start snap-always"
          id="projects"
        >
          <div className="px-6 md:px-16 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h3 className="font-headline-lg text-3xl md:text-5xl uppercase mb-4 text-white">
                Selected Work
              </h3>
              <p className="text-[#c4c7c8] max-w-md">
                An editorial selection of innovative projects ranging from web
                ecosystems to specialized hardware integration.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                className="w-12 h-12 border border-[#27272A] flex items-center justify-center hover:bg-[#141313] transition-colors duration-300"
                onClick={() => scrollCarousel(-1)}
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <button
                className="w-12 h-12 border border-[#27272A] flex items-center justify-center hover:bg-[#141313] transition-colors duration-300"
                onClick={() => scrollCarousel(1)}
              >
                <ArrowRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto carousel-hide-scrollbar px-6 md:px-16 snap-x snap-mandatory scroll-smooth"
            id="project-carousel"
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => setSelectedProject(project)}
                className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[30vw] snap-start border border-[#27272A] bg-[#141313] group relative overflow-hidden flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:border-white/40 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
              >
                <div className="aspect-[4/5] bg-zinc-900 relative overflow-hidden">
                  {project.imageUrl ? (
                    <Image
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      src={project.imageUrl}
                      fill
                      sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                      <Code className="h-16 w-16 text-zinc-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 gradient-overlay opacity-60"></div>
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest block mb-2 opacity-60 text-[#c4c7c8] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {`${(idx + 1).toString().padStart(2, "0")} / PROJECT`}
                    </span>
                    <h4 className="font-headline-md text-2xl uppercase text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {project.title}
                    </h4>
                    <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <p className="text-sm text-zinc-400 mt-2 line-clamp-3">
                        {project.description}
                      </p>
                      <span className="font-label-sm text-[10px] text-white/70 tracking-widest uppercase block mt-3 hover:text-white transition-colors">
                        READ DETAILS →
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-t border-[#444748]/30 bg-[#141313] flex justify-between items-center z-10 transition-colors duration-500 group-hover:border-white/20">
                  <span className="font-label-sm text-xs text-[#c4c7c8] line-clamp-1">
                    {project.techStack.join(", ")}
                  </span>
                  <div className="flex gap-3 items-center ml-2">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="View Code"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-5 w-5 text-zinc-400 hover:text-white" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors"
                        title="View Demo"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-5 w-5 text-zinc-400 hover:text-white" />
                      </a>
                    )}
                    {!project.repoUrl && !project.demoUrl && (
                      <ArrowRight className="h-5 w-5 text-[#c4c7c8] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section (Bento Style) */}
        <section
          className="py-32 px-6 md:px-16 bg-[#09090B] snap-start snap-always"
          id="skills"
        >
          <h3 className="font-headline-lg text-3xl md:text-5xl uppercase mb-16 text-center text-white">
            Core Disciplines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(skillsByCategory).map(([category, skills]) => {
              const details = getCategoryDetails(category);
              const IconComponent = details.icon;
              return (
                <div
                  key={category}
                  className="border border-[#27272A] p-6 md:p-8 bg-[#141313] flex flex-col justify-between group hover:bg-[#201f1f] transition-colors duration-300 h-full"
                >
                  <div>
                    <IconComponent className="h-10 w-10 mb-8 text-white" />
                    <h4 className="font-headline-md text-2xl mb-6 uppercase tracking-tight text-white">
                      {category}
                    </h4>
                    <p className="text-[#c4c7c8] mb-12 text-sm md:text-base break-words">
                      {details.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="border border-[#27272A] px-3 py-1 font-label-sm text-[10px] uppercase tracking-widest text-[#e5e2e1]"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certificates Section */}
        <section
          className="py-32 px-6 md:px-16 bg-[#09090B] border-t border-[#444748]/30 snap-start snap-always"
          id="certificates"
        >
          <h3 className="font-headline-lg text-3xl md:text-5xl uppercase mb-16 text-center text-white">
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="border border-[#27272A] p-8 bg-[#141313] flex flex-col justify-between group hover:bg-[#201f1f] transition-colors duration-300 h-full"
              >
                <div>
                  {cert.imageUrl ? (
                    <div className="aspect-[16/10] bg-zinc-900 relative overflow-hidden mb-6 border border-zinc-800">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800">
                      <Award className="h-12 w-12 text-zinc-600" />
                    </div>
                  )}
                  <span className="font-label-sm text-[10px] uppercase tracking-widest block mb-2 opacity-60 text-[#c4c7c8]">
                    {cert.issuer}
                  </span>
                  <h4 className="font-headline-md text-xl uppercase tracking-tight text-white mb-2">
                    {cert.name}
                  </h4>
                </div>
                <div className="mt-8 flex justify-between items-end border-t border-zinc-800 pt-6">
                  <span className="font-label-sm text-[11px] text-zinc-400 uppercase tracking-widest">
                    {cert.issuedDate}
                  </span>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-label-sm text-[11px] uppercase tracking-widest text-[#c4c7c8] hover:text-white transition-colors duration-300"
                    >
                      Verify <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA / Contact */}
        <section
          className="min-h-screen px-6 md:px-16 border-t border-[#444748]/30 bg-[#141313] flex flex-col justify-between items-center py-20 snap-start snap-always"
          id="contact"
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl">
            <h3 className="font-display-xl text-3xl md:text-5xl lg:text-7xl uppercase mb-8 tracking-tight text-white">
              HAVE A VISION IN MIND? LET’S BUILD SOMETHING ENDURING.
            </h3>
            <p className="text-[#c4c7c8] max-w-xl mb-16 font-body-lg text-sm md:text-base">
              I am always open to new opportunities, freelance collaborations,
              and ambitious projects. Let&apos;s connect and discuss how we can
              elevate your digital presence and scale your system to the next
              level.
            </p>
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto items-center justify-center">
              <a
                className="bg-white text-[#09090B] px-16 py-8 font-label-sm text-xs uppercase tracking-[0.2em] font-black hover:opacity-90 transition-opacity text-center w-full md:w-auto"
                href="mailto:fjanphilip9.jp@gmail.com"
              >
                Initialize Conversation
              </a>
              <div className="flex flex-wrap gap-4 items-center justify-center mt-8 md:mt-0 px-8">
                <span className="font-label-sm text-[10px] tracking-widest text-[#c4c7c8] uppercase">
                  CONNECT:
                </span>
                <a
                  className="font-label-sm text-xs uppercase hover:text-white text-[#c4c7c8] transition-colors flex items-center gap-2"
                  href="https://github.com/fjanphilip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" /> GITHUB
                </a>
                <a
                  className="font-label-sm text-xs uppercase hover:text-white text-[#c4c7c8] transition-colors flex items-center gap-2"
                  href="https://linkedin.com/in/fjanphilip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-4 w-4" /> LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {/* Footer contained inside the snap section to solve scroll snapping cuts */}
          <footer className="w-full pt-16 border-t border-[#444748]/10 mt-16 snap-end">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
              <div className="font-display-xl text-2xl text-white tracking-tighter lowercase">
                portofolio
              </div>
              <p className="font-label-sm text-[10px] md:text-xs uppercase tracking-widest text-[#c4c7c8]">
                ©2024 JAN PHILIP FAITH — ALL RIGHTS RESERVED
              </p>
              <div className="flex gap-8">
                <a
                  className="font-label-sm text-[10px] md:text-xs uppercase tracking-widest text-[#c4c7c8] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                  href="#"
                >
                  <Linkedin className="h-3 w-3" /> LINKEDIN
                </a>
                <a
                  className="font-label-sm text-[10px] md:text-xs uppercase tracking-widest text-[#c4c7c8] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
                  href="https://github.com/fjanphilip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3 w-3" /> GITHUB
                </a>
                <a
                  className="font-label-sm text-[10px] md:text-xs uppercase tracking-widest text-[#c4c7c8] hover:text-white transition-colors duration-300"
                  href="#"
                >
                  READ.CV
                </a>
              </div>
            </div>
          </footer>
        </section>
      </main>

      {/* Project Detail Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10 transition-opacity duration-300">
          <div className="bg-[#141313] border border-[#27272A] w-full max-w-3xl overflow-hidden relative flex flex-col max-h-[90vh] shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 border border-[#27272A] bg-[#09090B] flex items-center justify-center hover:bg-[#141313] transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Image header */}
            <div className="relative aspect-video w-full bg-zinc-900 border-b border-[#27272A]">
              {selectedProject.imageUrl ? (
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Code className="h-16 w-16 text-zinc-700" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141313] via-transparent to-transparent"></div>
            </div>

            {/* Details body */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
              <div>
                <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#c4c7c8] block mb-2">
                  PROJECT SPECIFICATION
                </span>
                <h3 className="font-display-xl text-2xl md:text-4xl uppercase text-white mb-6">
                  {selectedProject.title}
                </h3>
                <p className="text-zinc-300 font-body-md text-sm md:text-base leading-relaxed mb-8 break-words whitespace-pre-wrap">
                  {selectedProject.description}
                </p>
                <div className="mb-8">
                  <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#c4c7c8] block mb-3">
                    TECH STACK & TOOLS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-[#27272A] px-3 py-1 font-label-sm text-[10px] uppercase tracking-widest text-[#e5e2e1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 border-t border-[#444748]/30 pt-6 mt-4">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white text-[#09090B] py-4 px-6 font-label-sm text-xs uppercase tracking-widest font-black hover:opacity-90 transition-opacity text-center flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-white text-white py-4 px-6 font-label-sm text-xs uppercase tracking-widest font-black hover:bg-white hover:text-[#09090B] transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
