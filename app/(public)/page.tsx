import { prisma } from "@/lib/prisma";
import { PortfolioClient } from "@/components/portfolio-client";

export default async function HomePage() {
  const [projects, certificates, skillsRaw] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  // Group skills by category
  const skillsByCategory: Record<string, { name: string; iconUrl: string | null }[]> = {};
  for (const skill of skillsRaw) {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push({
      name: skill.name,
      iconUrl: skill.iconUrl,
    });
  }

  // Parse techStack from JSON string
  const parsedProjects = projects.map((p) => {
    let techStack: string[] = [];
    try {
      techStack = JSON.parse(p.techStack);
    } catch {
      techStack = [p.techStack];
    }
    return { ...p, techStack };
  });

  return (
    <PortfolioClient
      projects={parsedProjects}
      certificates={certificates}
      skillsByCategory={skillsByCategory}
    />
  );
}
