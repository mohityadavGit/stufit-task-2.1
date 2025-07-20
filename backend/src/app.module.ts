import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { MailerModule } from './mailer/mailer.module';
import { RbacModule } from './rbac/rbac.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, StudentsModule, MedicalRecordsModule, MailerModule, RbacModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
