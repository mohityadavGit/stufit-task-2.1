import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, LoginDto, VerifyOtpDto, SignupHodDto, SignupStudentDto } from './dto';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  private otpStore = new Map(); // In-memory OTP store

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: MailerService
  ) {}

  async signupAdmin(dto: SignupDto) {
    const exists = await this.prisma.adminLogin.findUnique({ where: { email: dto.email } });
    if (exists) throw new BadRequestException('Admin already exists');

    const hash = await bcrypt.hash(dto.password, 10);
   return this.prisma.adminLogin.create({
  data: {
    username: dto.username,
    email: dto.email,
    password_hash: hash,
    full_name: dto.full_name,
    role: 'HOD',
    school_id: dto.school_id, 
  },
});

  }

async signupHod(dto: SignupHodDto) {
  const exists = await this.prisma.adminLogin.findUnique({ where: { email: dto.email } });
  if (exists) throw new BadRequestException('HOD already exists');

  const hash = await bcrypt.hash(dto.password, 10);
  return this.prisma.adminLogin.create({
    data: {
      username: dto.username,
      email: dto.email,
      password_hash: hash,
      full_name: dto.full_name,
      role: 'HOD',
      school_id: dto.school_id,
    },
  });
}

//////////
 async signupStudent(dto: SignupStudentDto) {
  const exists = await this.prisma.student.findUnique({
    where: { email: dto.email },
  });
  if (exists) throw new BadRequestException('Student already exists');

  const hash = await bcrypt.hash(dto.password, 10);
  return this.prisma.student.create({
    data: {
      username: dto.username,
      email: dto.email,
      password_hash: hash,
      full_name: dto.full_name,
      adhar_number: dto.adhar_number,
      school_id: dto.school_id,
    },
  });
}


  async login(dto: LoginDto) {
    
    const admin = await this.prisma.adminLogin.findUnique({ where: { email: dto.email } });

    if (admin && await bcrypt.compare(dto.password, admin.password_hash)) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otp, 10);

      this.otpStore.set(dto.email, {
        otp: hashedOtp,
        role: admin.role,
        type: 'admin',
        id: admin.admin_id,
        expires: Date.now() + 5 * 60 * 1000,
      });

      await this.mailer.sendOtp(dto.email, otp);
      return { message: 'OTP sent to email' };
    }

    //  Student ko check 
    const student = await this.prisma.student.findUnique({ where: { email: dto.email } });

    if (student && await bcrypt.compare(dto.password, student.password_hash)) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otp, 10);

      this.otpStore.set(dto.email, {
        otp: hashedOtp,
        role: 'STUDENT',
        type: 'student',
        id: student.student_id,
        expires: Date.now() + 5 * 60 * 1000,
      });

      await this.mailer.sendOtp(dto.email, otp);
      return { message: 'OTP sent to email' };
    }

    throw new BadRequestException('Invalid email or password');
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const record = this.otpStore.get(dto.email);

    if (!record || Date.now() > record.expires) {
      throw new BadRequestException('OTP expired or not found');
    }

    const match = await bcrypt.compare(dto.otp, record.otp);
    if (!match) throw new BadRequestException('Invalid OTP');

    const payload = {
      sub: record.id,
      email: dto.email,
      role: record.role,
      type: record.type,
    };

    const token = this.jwt.sign(payload);
    return {
      access_token: token,
      role: record.role,
    };
  }
}
