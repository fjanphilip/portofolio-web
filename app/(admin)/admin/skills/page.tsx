import { prisma } from "@/lib/prisma";
import { SkillForm } from "@/components/admin/skill-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSkill } from "@/lib/actions/skills";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-950/20 text-blue-400 border-blue-900/30 font-mono text-[10px] tracking-wider uppercase",
  Backend: "bg-emerald-950/20 text-emerald-400 border-emerald-900/30 font-mono text-[10px] tracking-wider uppercase",
  Design: "bg-purple-950/20 text-purple-400 border-purple-900/30 font-mono text-[10px] tracking-wider uppercase",
  Tools: "bg-orange-950/20 text-orange-400 border-orange-900/30 font-mono text-[10px] tracking-wider uppercase",
};

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display-xl uppercase">Skills</h1>
          <p className="text-zinc-400 mt-1 text-sm font-light">
            Kelola daftar keahlian dan teknologi Anda
          </p>
        </div>
        <SkillForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#27272A] bg-[#141313] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#27272A] hover:bg-transparent">
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">#</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Skill Name</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Category</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Order</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow className="border-[#27272A]">
                <TableCell
                  colSpan={5}
                  className="text-center text-zinc-500 py-12"
                >
                  Belum ada skill. Klik &quot;Add Skill&quot; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill, index) => (
                <TableRow
                  key={skill.id}
                  className="border-[#27272A] hover:bg-[#09090B]/50 transition-colors"
                >
                  <TableCell className="text-zinc-500 font-mono text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{skill.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${categoryColors[skill.category] || "text-zinc-400 border-zinc-700"}`}
                    >
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500 font-mono text-sm">
                    {skill.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <SkillForm skill={skill} />
                      <DeleteButton
                        id={skill.id}
                        entityName="Skill"
                        itemName={skill.name}
                        deleteAction={deleteSkill}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
