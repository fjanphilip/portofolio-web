import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/project-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteProject } from "@/lib/actions/projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display-xl uppercase">Projects</h1>
          <p className="text-zinc-400 mt-1 text-sm font-light">
            Kelola daftar project portfolio Anda
          </p>
        </div>
        <ProjectForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#27272A] bg-[#141313] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#27272A] hover:bg-transparent">
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">#</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Title</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Tech Stack</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Links</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow className="border-[#27272A]">
                <TableCell
                  colSpan={5}
                  className="text-center text-zinc-500 py-12"
                >
                  Belum ada project. Klik &quot;Add Project&quot; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => {
                let techStack: string[] = [];
                try {
                  techStack = JSON.parse(project.techStack);
                } catch {
                  techStack = [project.techStack];
                }

                return (
                  <TableRow
                    key={project.id}
                    className="border-[#27272A] hover:bg-[#09090B]/50 transition-colors"
                  >
                    <TableCell className="text-zinc-500 font-mono text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-sm text-zinc-500 line-clamp-1 max-w-[300px]">
                          {project.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {techStack.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-[#09090B] text-zinc-400 border border-[#27272A] hover:bg-[#09090B] text-[10px] tracking-wider uppercase font-mono"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {techStack.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-[#09090B] text-zinc-600 border border-[#27272A] hover:bg-[#09090B] text-[10px] tracking-wider uppercase font-mono"
                          >
                            +{techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 text-xs font-mono">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 hover:underline"
                          >
                            Demo
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-400 hover:text-zinc-300 hover:underline"
                          >
                            Repo
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <ProjectForm project={project} />
                        <DeleteButton
                          id={project.id}
                          entityName="Project"
                          itemName={project.title}
                          deleteAction={deleteProject}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
