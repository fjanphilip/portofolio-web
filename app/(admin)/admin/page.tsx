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
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Selamat datang di Admin Panel. Kelola portfolio Anda dari sini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={`bg-black bg-gradient-to-br ${stat.gradient} border-gray-800 hover:border-gray-700 transition-all duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white">{stat.count}</div>
              <p className="text-xs text-gray-500 mt-1">Total items</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Info */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-gray-400" />
            Quick Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-400">
          <p>
            • Gunakan menu di sidebar untuk mengelola{" "}
            <strong className="text-white">Projects</strong>,{" "}
            <strong className="text-white">Certificates</strong>, dan{" "}
            <strong className="text-white">Skills</strong>.
          </p>
          <p>
            • Setiap perubahan akan langsung terlihat di halaman publik
            portfolio.
          </p>
          <p>
            • Atur <strong className="text-white">Display Order</strong> untuk
            mengontrol urutan tampilan item.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
