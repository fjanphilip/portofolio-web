"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCertificate, updateCertificate } from "@/lib/actions/certificates";
import { Loader2, Plus, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CertificateFormProps {
  certificate?: {
    id: string;
    name: string;
    issuer: string;
    issuedDate: string;
    credentialUrl: string | null;
    imageUrl: string | null;
    order: number;
  };
}

export function CertificateForm({ certificate }: CertificateFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { toast } = useToast();

  const isEdit = !!certificate;

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setErrors({});

    try {
      const result = isEdit
        ? await updateCertificate(certificate.id, formData)
        : await createCertificate(formData);

      if (result?.error && typeof result.error === "object") {
        setErrors(result.error as Record<string, string[]>);
        toast({
          variant: "destructive",
          title: "Gagal Menyimpan Sertifikat",
          description: "Silakan periksa form dan coba lagi.",
        });
      } else if (result?.success) {
        toast({
          title: isEdit ? "Sertifikat Diperbarui" : "Sertifikat Ditambahkan",
          description: `Sertifikat "${formData.get("name")}" berhasil disimpan.`,
        });
        setOpen(false);
      }
    } catch (error) {
      console.error("Failed to save certificate:", error);
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: "Gagal menyimpan sertifikat karena kesalahan tidak terduga.",
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
            Add Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-[#09090B] border-[#27272A] max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-bold tracking-tight">
            {isEdit ? "Edit Certificate" : "Add New Certificate"}
          </DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          {errors._form && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm">
              {errors._form[0]}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Certificate Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={certificate?.name || ""}
              className="bg-[#141313] border-[#27272A] text-white placeholder-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400"
              placeholder="Certificate name"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Issuer *</Label>
            <Input
              id="issuer"
              name="issuer"
              defaultValue={certificate?.issuer || ""}
              className="bg-[#141313] border-[#27272A] text-white placeholder-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400"
              placeholder="e.g. Cisco, Google"
            />
            {errors.issuer && (
              <p className="text-sm text-red-400">{errors.issuer[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuedDate" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Issued Date *</Label>
            <Input
              id="issuedDate"
              name="issuedDate"
              defaultValue={certificate?.issuedDate || ""}
              className="bg-[#141313] border-[#27272A] text-white placeholder-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400"
              placeholder="2024 or 2024-01-15"
            />
            {errors.issuedDate && (
              <p className="text-sm text-red-400">{errors.issuedDate[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialUrl" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Credential URL</Label>
            <Input
              id="credentialUrl"
              name="credentialUrl"
              defaultValue={certificate?.credentialUrl || ""}
              className="bg-[#141313] border-[#27272A] text-white placeholder-zinc-600 focus-visible:ring-1 focus-visible:ring-zinc-400"
              placeholder="https://credential-link.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Certificate Image (Upload)</Label>
            <Input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              className="bg-[#141313] border-[#27272A] text-white cursor-pointer file:text-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-400"
            />
            {certificate?.imageUrl && (
              <p className="text-xs text-zinc-500 mt-1">
                Laman sekarang: <a href={certificate.imageUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Lihat Gambar</a>
              </p>
            )}
            <input type="hidden" name="imageUrl" value={certificate?.imageUrl || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="text-zinc-300 text-xs uppercase tracking-wider font-semibold">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={certificate?.order || 0}
              className="bg-[#141313] border-[#27272A] text-white focus-visible:ring-1 focus-visible:ring-zinc-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-zinc-200 transition-all duration-200 font-bold"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isEdit ? "Update Certificate" : "Create Certificate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
