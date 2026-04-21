const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  if (!fs.existsSync('db-backup.json')) {
    console.error("File db-backup.json tidak ditemukan!");
    return;
  }

  const raw = fs.readFileSync('db-backup.json', 'utf8');
  const data = JSON.parse(raw);

  console.log("Sedang memulihkan data portofolio ke Supabase PostgreSQL...");

  try {
    for (const project of data.projects || []) {
      await prisma.project.create({ data: project });
    }
    console.log(`✅ Restore ${data.projects.length} Projects`);

    for (const cert of data.certificates || []) {
      await prisma.certificate.create({ data: cert });
    }
    console.log(`✅ Restore ${data.certificates.length} Certificates`);

    for (const skill of data.skills || []) {
      await prisma.skill.create({ data: skill });
    }
    console.log(`✅ Restore ${data.skills.length} Skills`);

    console.log("🔥 MIGRASI DATA SUKSES!");
  } catch (err) {
    console.error("Gagal melakukan restore", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
