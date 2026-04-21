const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  try {
    const projects = await prisma.project.findMany();
    const certificates = await prisma.certificate.findMany();
    const skills = await prisma.skill.findMany();

    const data = { projects, certificates, skills };
    fs.writeFileSync('db-backup.json', JSON.stringify(data, null, 2));
    console.log("✅ Backup berhasil dibuat: db-backup.json");
  } catch (error) {
    console.error("Gagal melakukan backup", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
