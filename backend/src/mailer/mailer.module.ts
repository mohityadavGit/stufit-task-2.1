import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],  // export so other modules (like AuthModule) can use it
})
export class MailerModule {}
