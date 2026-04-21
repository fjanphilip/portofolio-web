"use server";

import { prisma } from "@/lib/prisma";
import { skillSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { uploadFileToSupabase } from "@/lib/supabase";

export async function getSkills() {
  return prisma.skill.findMany({ orderBy: { order: "asc" } });
}

export async function getSkillsByCategory() {
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

  const grouped: Record<string, typeof skills> = {};
  for (const skill of skills) {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  }

  return grouped;
}

export async function getSkillById(id: string) {
  return prisma.skill.findUnique({ where: { id } });
}

export async function createSkill(formData: FormData) {
  let finalIconUrl = formData.get("iconUrl") as string || "";
  let iconFile = formData.get("iconFile") as File | null;

  if (iconFile && iconFile.size > 0) {
    try {
      finalIconUrl = await uploadFileToSupabase(iconFile);
    } catch (e) {
      return { error: { _form: ["Gagal mengupload icon"] } };
    }
  }

  const raw = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    iconUrl: finalIconUrl,
    order: formData.get("order") as string,
  };

  const parsed = skillSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.skill.create({ data: parsed.data });

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function updateSkill(id: string, formData: FormData) {
  let finalIconUrl = formData.get("iconUrl") as string || "";
  let iconFile = formData.get("iconFile") as File | null;

  if (iconFile && iconFile.size > 0) {
    try {
      finalIconUrl = await uploadFileToSupabase(iconFile);
    } catch (e) {
      return { error: { _form: ["Gagal mengupload icon"] } };
    }
  }

  const raw = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    iconUrl: finalIconUrl,
    order: formData.get("order") as string,
  };

  const parsed = skillSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.skill.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { success: true };
}
