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
  Frontend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Backend: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Tools: "bg-orange-500/10 text-orange-400 border-orange-500/20",
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
          <h1 className="text-3xl font-bold text-white">Skills</h1>
          <p className="text-gray-400 mt-1">
            Kelola daftar keahlian dan teknologi Anda
          </p>
        </div>
        <SkillForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">#</TableHead>
              <TableHead className="text-gray-400">Skill Name</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Order</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.length === 0 ? (
              <TableRow className="border-gray-800">
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-12"
                >
                  Belum ada skill. Klik &quot;Add Skill&quot; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              skills.map((skill, index) => (
                <TableRow
                  key={skill.id}
                  className="border-gray-800 hover:bg-gray-900/50"
                >
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{skill.name}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${categoryColors[skill.category] || "text-gray-400 border-gray-600"}`}
                    >
                      {skill.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {skill.order}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <SkillForm skill={skill} />
                      <DeleteButton
                        id={skill.id}
                        entityName="Skill"
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
