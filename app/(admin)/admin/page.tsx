import { prisma } from "@/lib/prisma";
import { Briefcase, Award, Code, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const [projectCount, certificateCount, skillCount] = await Promise.all([
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.skill.count(),
  ]);

  const stats = [
    {
      title: "Projects",
      count: projectCount,
      icon: Briefcase,
      href: "/admin/projects",
      gradient: "from-blue-500/10 to-blue-600/5",
      iconColor: "text-blue-400",
    },
    {
      title: "Certificates",
      count: certificateCount,
      icon: Award,
      href: "/admin/certificates",
      gradient: "from-emerald-500/10 to-emerald-600/5",
      iconColor: "text-emerald-400",
    },
    {
      title: "Skills",
      count: skillCount,
      icon: Code,
      href: "/admin/skills",
      gradient: "from-purple-500/10 to-purple-600/5",
      iconColor: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-display-xl uppercase">Dashboard</h1>
        <p className="text-zinc-400 mt-1 text-sm font-light">
          Selamat datang di Admin Panel. Kelola portfolio Anda dari sini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-[#141313] border-[#27272A] hover:border-zinc-500 transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-extrabold text-white font-mono tracking-tight">{stat.count}</div>
              <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider font-mono">Total items</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <Card className="bg-[#141313] border-[#27272A]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2 text-sm font-mono uppercase tracking-wider">
            <TrendingUp className="h-4 w-4 text-zinc-400" />
            Quick Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-zinc-400 font-light">
          <p>
            • Gunakan menu di sidebar untuk mengelola{" "}
            <strong className="text-white font-medium">Projects</strong>,{" "}
            <strong className="text-white font-medium">Certificates</strong>, dan{" "}
            <strong className="text-white font-medium">Skills</strong>.
          </p>
          <p>
            • Setiap perubahan akan langsung terlihat di halaman publik
            portfolio.
          </p>
          <p>
            • Atur <strong className="text-white font-medium">Display Order</strong> untuk
            mengontrol urutan tampilan item.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
