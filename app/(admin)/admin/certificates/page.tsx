import { prisma } from "@/lib/prisma";
import { CertificateForm } from "@/components/admin/certificate-form";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteCertificate } from "@/lib/actions/certificates";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight font-display-xl uppercase">Certificates</h1>
          <p className="text-zinc-400 mt-1 text-sm font-light">
            Kelola sertifikat dan kredensial Anda
          </p>
        </div>
        <CertificateForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-[#27272A] bg-[#141313] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#27272A] hover:bg-transparent">
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">#</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Certificate</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Issuer</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Date</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider">Image</TableHead>
              <TableHead className="text-zinc-500 font-mono text-xs uppercase tracking-wider text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow className="border-[#27272A]">
                <TableCell
                  colSpan={6}
                  className="text-center text-zinc-500 py-12"
                >
                  Belum ada sertifikat. Klik &quot;Add Certificate&quot; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((certificate, index) => (
                <TableRow
                  key={certificate.id}
                  className="border-[#27272A] hover:bg-[#09090B]/50 transition-colors"
                >
                  <TableCell className="text-zinc-500 font-mono text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{certificate.name}</p>
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {certificate.issuer}
                  </TableCell>
                  <TableCell className="text-zinc-400 font-mono text-sm">
                    {certificate.issuedDate}
                  </TableCell>
                  <TableCell>
                    {certificate.imageUrl ? (
                      <span className="text-xs text-emerald-400 font-mono">✓ HAS IMAGE</span>
                    ) : (
                      <span className="text-xs text-zinc-600 font-mono">NO IMAGE</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <CertificateForm certificate={certificate} />
                      <DeleteButton
                        id={certificate.id}
                        entityName="Certificate"
                        itemName={certificate.name}
                        deleteAction={deleteCertificate}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
