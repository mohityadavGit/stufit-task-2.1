import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");

  // Naye passwords ko yahan set karo
  const passwordHashSuperAdmin = await bcrypt.hash('123456', 10);
  const passwordHashAdmin = await bcrypt.hash('123456', 10);

  await prisma.adminLogin.upsert({
    where: { email: 'mohityadav.ai2026@gmail.com' },
    update: {},
    create: {
      username: 'superadmin',
      email: 'mohityadav.ai2026@gmail.com',
      password_hash: passwordHashSuperAdmin,
      full_name: 'Super Admin',
      role: 'SUPER_ADMIN',
      is_active: true,
      school_id: null,
    },
  });
  console.log("SUPER_ADMIN seeded");

  await prisma.adminLogin.upsert({
    where: { email: '26jaihindjan@gmail.com' },
    update: {},
    create: {
      username: 'admin1',
      email: '26jaihindjan@gmail.com',
      password_hash: passwordHashAdmin,
      full_name: 'Admin One',
      role: 'ADMIN',
      is_active: true,
      school_id: 1,
    },
  });
  console.log("ADMIN seeded");
}

main()
  .then(() => {
    console.log("Seeding finished successfully.");
  })
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
