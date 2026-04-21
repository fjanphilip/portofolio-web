"use server";

import { prisma } from "@/lib/prisma";
import { certificateSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { uploadFileToSupabase } from "@/lib/supabase";

export async function getCertificates() {
  return prisma.certificate.findMany({ orderBy: { order: "asc" } });
}

export async function getCertificateById(id: string) {
  return prisma.certificate.findUnique({ where: { id } });
}

export async function createCertificate(formData: FormData) {
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
    name: formData.get("name") as string,
    issuer: formData.get("issuer") as string,
    issuedDate: formData.get("issuedDate") as string,
    credentialUrl: formData.get("credentialUrl") as string,
    imageUrl: finalImageUrl,
    order: formData.get("order") as string,
  };

  const parsed = certificateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.certificate.create({ data: parsed.data });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}

export async function updateCertificate(id: string, formData: FormData) {
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
    name: formData.get("name") as string,
    issuer: formData.get("issuer") as string,
    issuedDate: formData.get("issuedDate") as string,
    credentialUrl: formData.get("credentialUrl") as string,
    imageUrl: finalImageUrl,
    order: formData.get("order") as string,
  };

  const parsed = certificateSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await prisma.certificate.update({
    where: { id },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}

export async function deleteCertificate(id: string) {
  await prisma.certificate.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
  return { success: true };
}
