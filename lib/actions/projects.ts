"use server";

import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { uploadFileToSupabase } from "@/lib/supabase";

export async function getProjects() {
  return prisma.project.findMany({ orderBy: { order: "asc" } });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({ where: { id } });
}

export async function createProject(formData: FormData) {
  let finalImageUrl = formData.get("imageUrl") as string || "";
  const imageFile = formData.get("imageFile") as File | null;

  if (imageFile && imageFile.size > 0) {
    try {
      finalImageUrl = await uploadFileToSupabase(imageFile);
    } catch (e: any) {
      return { error: { _form: [`Gagal mengupload gambar: ${e?.message || JSON.stringify(e)}`] } };
    }
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    techStack: formData.get("techStack") as string,
    imageUrl: finalImageUrl,
    demoUrl: formData.get("demoUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    order: formData.get("order") as string,
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { techStack, ...rest } = parsed.data;
  // Convert comma-separated string to JSON array
  const techArray = techStack.split(",").map((t) => t.trim()).filter(Boolean);

  await prisma.project.create({
    data: {
      ...rest,
      techStack: JSON.stringify(techArray),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  let finalImageUrl = formData.get("imageUrl") as string || "";
  const imageFile = formData.get("imageFile") as File | null;

  if (imageFile && imageFile.size > 0) {
    try {
      finalImageUrl = await uploadFileToSupabase(imageFile);
    } catch (e) {
      return { error: { _form: ["Gagal mengupload gambar"] } };
    }
  }

  const raw = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    techStack: formData.get("techStack") as string,
    imageUrl: finalImageUrl,
    demoUrl: formData.get("demoUrl") as string,
    repoUrl: formData.get("repoUrl") as string,
    order: formData.get("order") as string,
  };

  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { techStack, ...rest } = parsed.data;
  const techArray = techStack.split(",").map((t) => t.trim()).filter(Boolean);

  await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      techStack: JSON.stringify(techArray),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { success: true };
}
