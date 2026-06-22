"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeleteButtonProps {
  id: string;
  entityName: string;
  itemName?: string;
  deleteAction: (id: string) => Promise<{ success?: boolean; error?: string }>;
}

export function DeleteButton({ id, entityName, itemName, deleteAction }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteAction(id);
      if (result?.success) {
        toast({
          title: "Berhasil Dihapus",
          description: itemName
            ? `${entityName} "${itemName}" berhasil dihapus secara permanen.`
            : `${entityName} berhasil dihapus secara permanen.`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Menghapus",
          description: result?.error || `Gagal menghapus ${entityName}${itemName ? ` "${itemName}"` : ""}.`,
        });
      }
    } catch (error) {
      console.error("Failed to delete", error);
      toast({
        variant: "destructive",
        title: "Gagal Menghapus",
        description: `Terjadi kesalahan saat menghapus ${entityName}${itemName ? ` "${itemName}"` : ""}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all duration-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#09090B] border-[#27272A] max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white font-bold tracking-tight">
            Hapus {entityName}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400 text-xs">
            Aksi ini tidak bisa dibatalkan. {entityName} {itemName && `"${itemName}" `}akan dihapus secara permanen dari basis data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel className="bg-[#141313] text-white border-[#27272A] hover:bg-[#27272A] hover:text-white transition-all duration-200 text-xs py-1.5 h-8">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-900 text-red-100 hover:bg-red-800 transition-all duration-200 text-xs py-1.5 h-8 font-semibold"
          >
            {loading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
            ) : (
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
            )}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
