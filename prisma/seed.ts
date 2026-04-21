import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Skills ---
  const skills = [
    // Frontend
    { name: "React", category: "Frontend", order: 1 },
    { name: "Next.js", category: "Frontend", order: 2 },
    { name: "TypeScript", category: "Frontend", order: 3 },
    { name: "Tailwind CSS", category: "Frontend", order: 4 },
    { name: "Vue.js", category: "Frontend", order: 5 },
    // Backend
    { name: "Node.js", category: "Backend", order: 1 },
    { name: "PHP", category: "Backend", order: 2 },
    { name: "Laravel", category: "Backend", order: 3 },
    { name: "Python", category: "Backend", order: 4 },
    { name: "C++", category: "Backend", order: 5 },
    { name: "MySQL", category: "Backend", order: 6 },
    // Design
    { name: "Adobe Photoshop", category: "Design", order: 1 },
    { name: "Autodesk Inventor", category: "Design", order: 2 },
    { name: "Fritzing", category: "Design", order: 3 },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`  ✅ Created ${skills.length} skills`);

  // --- Projects ---
  const projects = [
    {
      title: "Feature Selection for rice plant using Naive Bayes",
      description:
        "This project implements a machine learning approach to classify rice crop quality based on agronomic features, using two methods: Naive Bayes with all features, and Naive Bayes with feature selection using the Chi-Square method.",
      techStack: JSON.stringify(["Python", "Streamlit"]),
      imageUrl: "/project/streamlit.jpg",
      demoUrl: "https://gvmgrmiocqhjeftgqkygsy.streamlit.app/",
      repoUrl:
        "https://github.com/fjanphilip/Klasifikasi-Tanaman-Padi-Menggunakan-Naive-Bayes-dan-Seleksi-Fitur-Chi-Square",
      order: 1,
    },
    {
      title: "Oil Filtering Data",
      description:
        "Developed a desktop application using PyQt to filter data and monitor the inflow and outflow of oil volume. This project focuses on providing an efficient and user-friendly tool for accurate oil transaction tracking.",
      techStack: JSON.stringify(["Python", "PyQt"]),
      imageUrl: "/project/filtering_oil.jpg",
      demoUrl: "https://github.com/fjanphilip/PyQt-Filtering-Data",
      repoUrl: "https://github.com/fjanphilip/PyQt-Filtering-Data",
      order: 2,
    },
    {
      title: "IoT - Water Filtering",
      description:
        "Integrated sensor data to monitor water quality and automate filtration processes, enabling real-time monitoring and remote control to improve the efficiency and reliability of the clean water supply system.",
      techStack: JSON.stringify(["C++", "Arduino", "Blynk"]),
      imageUrl: "/project/walter_filtering.jpg",
      demoUrl: "https://github.com/fjanphilip/IoT-Water-Filtering",
      repoUrl: "https://github.com/fjanphilip/IoT-Water-Filtering",
      order: 3,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`  ✅ Created ${projects.length} projects`);

  // --- Certificates ---
  const certificates = [
    {
      name: "Fundamental CyberSec",
      issuer: "Coding Studio",
      issuedDate: "2024",
      imageUrl: "/certificate/75BB79A5E8-75BB5C58B9-75AF8E57EB.jpg",
      order: 1,
    },
    {
      name: "Python Core",
      issuer: "Coding SoloLearn",
      issuedDate: "2019",
      imageUrl: "/certificate/48079ad9-4405-49ee-b75a-4de54b8f811b.jpg",
      order: 2,
    },
    {
      name: "Digital Literacy",
      issuer: "Kominfo",
      issuedDate: "2021",
      imageUrl: "/certificate/1271160701020001.jpg",
      order: 3,
    },
    {
      name: "CCNA SRWE",
      issuer: "Cisco",
      issuedDate: "2022",
      imageUrl: "/certificate/CCNASRWEUpdate20250610-28-9bm8gb-1.jpg",
      order: 4,
    },
    {
      name: "Python Introduce",
      issuer: "DataCamp",
      issuedDate: "2019",
      imageUrl: "/certificate/certificate-1.jpg",
      order: 5,
    },
    {
      name: "CCNAv7",
      issuer: "Cisco",
      issuedDate: "2022",
      imageUrl:
        "/certificate/CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_fjanphilip9-jp-gmail-com_20175d96-9d1e-4812-9c63-2c66141b5fb1.jpg",
      order: 6,
    },
  ];

  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log(`  ✅ Created ${certificates.length} certificates`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
