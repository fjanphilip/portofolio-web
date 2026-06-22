"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createSkill, updateSkill } from "@/lib/actions/skills";
import { Loader2, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SkillFormProps {
  skill?: {
    id: string;
    name: string;
    category: string;
    iconUrl: string | null;
    order: number;
  };
}

const categories = ["Frontend", "Backend", "Design", "Tools"];

export function SkillForm({ skill }: SkillFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [category, setCategory] = useState(skill?.category || "");
  const { toast } = useToast();

  const isEdit = !!skill;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErrors({});

    // Manually set category since Select doesn't use native form data
    formData.set("category", category);

    try {
      const result = isEdit
        ? await updateSkill(skill.id, formData)
        : await createSkill(formData);

      if (result?.error && typeof result.error === "object") {
        setErrors(result.error as Record<string, string[]>);
        toast({
          variant: "destructive",
          title: "Gagal Menyimpan Keahlian",
          description: "Silakan periksa form dan coba lagi.",
        });
      } else if (result?.success) {
        toast({
          title: isEdit ? "Keahlian Diperbarui" : "Keahlian Ditambahkan",
          description: `Keahlian "${formData.get("name")}" berhasil disimpan.`,
        });
        setOpen(false);
        if (!isEdit) setCategory("");
      }
    } catch (error) {
      console.error("Failed to save skill:", error);
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan keahlian karena kesalahan tidak terduga.",
      });
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
            className="text-zinc-400 hover:text-white hover:bg-[#141313] border border-transparent hover:border-[#27272A] transition-all duration-200"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-white text-black hover:bg-zinc-200 transition-all duration-200 font-bold gap-2">
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#09090B] border-[#27272A] max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white font-bold tracking-tight">
            {isEdit ? "Edit Skill" : "Add New Skill"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {errors._form && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {errors._form[0]}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Skill Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={skill?.name || ""}
              className="bg-[#141313] border-[#27272A] text-white placeholder-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400"
              placeholder="e.g. React, Node.js"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-[#141313] border-[#27272A] text-white focus:ring-1 focus:ring-zinc-400">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-[#09090B] border-[#27272A]">
                {categories.map((cat) => (
                  <SelectItem
                    key={cat}
                    value={cat}
                    className="text-white hover:bg-[#141313] focus:bg-[#141313] focus:text-white cursor-pointer"
                  >
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-400">{errors.category[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconFile" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Skill Icon (Upload)</Label>
            <Input
              id="iconFile"
              name="iconFile"
              type="file"
              accept="image/*"
              className="bg-[#141313] border-[#27272A] text-white cursor-pointer file:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-400"
            />
            {skill?.iconUrl && (
              <p className="text-xs text-zinc-500 mt-1">
                Laman sekarang: <a href={skill.iconUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Lihat Icon</a>
              </p>
            )}
            <input type="hidden" name="iconUrl" value={skill?.iconUrl || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={skill?.order || 0}
              className="bg-[#141313] border-[#27272A] text-white focus-visible:ring-1 focus-visible:ring-zinc-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-zinc-200 transition-all duration-200 font-bold"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isEdit ? "Update Skill" : "Create Skill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
