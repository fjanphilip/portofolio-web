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
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">
            Kelola daftar project portfolio Anda
          </p>
        </div>
        <ProjectForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">#</TableHead>
              <TableHead className="text-gray-400">Title</TableHead>
              <TableHead className="text-gray-400">Tech Stack</TableHead>
              <TableHead className="text-gray-400">Links</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow className="border-gray-800">
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 py-12"
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
                    className="border-gray-800 hover:bg-gray-900/50"
                  >
                    <TableCell className="text-gray-500 font-mono text-sm">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{project.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1 max-w-[300px]">
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
                            className="bg-gray-800 text-gray-300 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {techStack.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="bg-gray-800 text-gray-500 text-xs"
                          >
                            +{techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 text-xs">
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            Demo
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:underline"
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
