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
          <h1 className="text-3xl font-bold text-white">Certificates</h1>
          <p className="text-gray-400 mt-1">
            Kelola sertifikat dan kredensial Anda
          </p>
        </div>
        <CertificateForm />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800 hover:bg-transparent">
              <TableHead className="text-gray-400">#</TableHead>
              <TableHead className="text-gray-400">Certificate</TableHead>
              <TableHead className="text-gray-400">Issuer</TableHead>
              <TableHead className="text-gray-400">Date</TableHead>
              <TableHead className="text-gray-400">Image</TableHead>
              <TableHead className="text-gray-400 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow className="border-gray-800">
                <TableCell
                  colSpan={6}
                  className="text-center text-gray-500 py-12"
                >
                  Belum ada sertifikat. Klik &quot;Add Certificate&quot; untuk menambahkan.
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((certificate, index) => (
                <TableRow
                  key={certificate.id}
                  className="border-gray-800 hover:bg-gray-900/50"
                >
                  <TableCell className="text-gray-500 font-mono text-sm">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-white">{certificate.name}</p>
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {certificate.issuer}
                  </TableCell>
                  <TableCell className="text-gray-400">
                    {certificate.issuedDate}
                  </TableCell>
                  <TableCell>
                    {certificate.imageUrl ? (
                      <span className="text-xs text-green-400">✓ Has image</span>
                    ) : (
                      <span className="text-xs text-gray-600">No image</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <CertificateForm certificate={certificate} />
                      <DeleteButton
                        id={certificate.id}
                        entityName="Certificate"
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
