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
      } else if (result?.success) {
        setOpen(false);
      }
    } catch {
      console.error("Failed to save certificate");
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
            Add Certificate
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white">
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
            <Label htmlFor="name" className="text-gray-300">Certificate Name *</Label>
            <Input
              id="name"
              name="name"
              defaultValue={certificate?.name || ""}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="Certificate name"
            />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer" className="text-gray-300">Issuer *</Label>
            <Input
              id="issuer"
              name="issuer"
              defaultValue={certificate?.issuer || ""}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="e.g. Cisco, Google"
            />
            {errors.issuer && (
              <p className="text-sm text-red-400">{errors.issuer[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuedDate" className="text-gray-300">Issued Date *</Label>
            <Input
              id="issuedDate"
              name="issuedDate"
              defaultValue={certificate?.issuedDate || ""}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="2024 or 2024-01-15"
            />
            {errors.issuedDate && (
              <p className="text-sm text-red-400">{errors.issuedDate[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="credentialUrl" className="text-gray-300">Credential URL</Label>
            <Input
              id="credentialUrl"
              name="credentialUrl"
              defaultValue={certificate?.credentialUrl || ""}
              className="bg-gray-800 border-gray-700 text-white"
              placeholder="https://credential-link.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageFile" className="text-gray-300">Certificate Image (Upload)</Label>
            <Input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              className="bg-gray-800 border-gray-700 text-white cursor-pointer"
            />
            {certificate?.imageUrl && (
              <p className="text-xs text-gray-500 mt-1">
                Laman sekarang: <a href={certificate.imageUrl} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Lihat Gambar</a>
              </p>
            )}
            <input type="hidden" name="imageUrl" value={certificate?.imageUrl || ""} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="text-gray-300">Display Order</Label>
            <Input
              id="order"
              name="order"
              type="number"
              defaultValue={certificate?.order || 0}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {isEdit ? "Update Certificate" : "Create Certificate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
