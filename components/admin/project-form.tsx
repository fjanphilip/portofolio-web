"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createProject, updateProject } from "@/lib/actions/projects";
import { Loader2, Plus, Pencil } from "lucide-react";

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    description: string;
    techStack: string;
    imageUrl: string | null;
    demoUrl: string | null;
    repoUrl: string | null;
    order: number;
  };
}

export function ProjectForm({ project }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const isEdit = !!project;

  // Parse techStack from JSON array to comma-separated string for editing
  const defaultTechStack = project?.techStack
    ? (() => {
        try {
          return JSON.parse(project.techStack).join(", ");
        } catch {
          return project.techStack;
        }
      })()
    : "";

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErrors({});

    try {
      const result = isEdit
        ? await updateProject(project.id, formData)
        : await createProject(formData);

      if (result?.error && typeof result.error === "object") {
        setErrors(result.error as Record<string, string[]>);
      } else if (result?.success) {
        setOpen(false);
      }
    } catch {
      console.error("Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-white text-black hover:bg-gray-200 gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isEdit ? "Edit Project" : "Add New Project"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {errors._form && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {errors._form[0]}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={project?.title || ""}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Project title"
            />
            {errors.title && (
              <p className="text-sm text-red-400">{errors.title[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description *</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description || ""}
              className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              placeholder="Project description"
            />
            {errors.description && (
              <p className="text-sm text-red-400">{errors.description[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack" className="text-gray-300">Tech Stack * (comma separated)</Label>
            <Input
              id="techStack"
              name="techStack"
              defaultValue={defaultTechStack}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="React, Next.js, TypeScript"
            />
            {errors.techStack && (
              <p className="text-sm text-red-400">{errors.techStack[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile" className="text-gray-300">Project Image (Upload)</Label>
            <Input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              className="bg-gray-800 border-gray-700 text-white cursor-pointer"
            />
            {project?.imageUrl && (
              <p className="text-xs text-gray-500 mt-1">
                Laman sekarang: <a href={project.imageUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Lihat Gambar</a>. Kosongkan jika tidak ingin merubah gambar.
              </p>
            )}
            {/* Field untuk mempertahankan URL gambar yang lama jika tidak diupdate */}
            <input type="hidden" name="imageUrl" value={project?.imageUrl || ""} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="demoUrl" className="text-gray-300">Demo URL</Label>
              <Input
                id="demoUrl"
                name="demoUrl"
                defaultValue={project?.demoUrl || ""}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://demo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="repoUrl" className="text-gray-300">Repo URL</Label>
              <Input
                id="repoUrl"
                name="repoUrl"
                defaultValue={project?.repoUrl || ""}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="text-gray-300">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={project?.order || 0}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isEdit ? "Update Project" : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
