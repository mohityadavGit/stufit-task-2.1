import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async sendOtp(to: string, otp: string) {
    await this.transporter.sendMail({
      from: `"Medical Dashboard" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Your OTP for login',
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });
  }
}
