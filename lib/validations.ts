import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  techStack: z.string().min(1, "Tech stack wajib diisi"), // comma-separated, will be stored as JSON array
  imageUrl: z.string().optional().default(""),
  demoUrl: z.string().optional().default(""),
  repoUrl: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export const certificateSchema = z.object({
  name: z.string().min(1, "Nama sertifikat wajib diisi"),
  issuer: z.string().min(1, "Penerbit wajib diisi"),
  issuedDate: z.string().min(1, "Tanggal terbit wajib diisi"),
  credentialUrl: z.string().optional().default(""),
  imageUrl: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Nama skill wajib diisi"),
  category: z.enum(["Frontend", "Backend", "Design", "Tools"], {
    errorMap: () => ({ message: "Pilih kategori yang valid" }),
  }),
  iconUrl: z.string().optional().default(""),
  order: z.coerce.number().int().default(0),
});

export const loginSchema = z.object({
  password: z.string().min(1, "Password wajib diisi"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type CertificateFormValues = z.infer<typeof certificateSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
