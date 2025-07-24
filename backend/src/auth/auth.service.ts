import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  SignupDto,
  LoginDto,
  VerifyOtpDto,
  SignupHodDto,
  SignupStudentDto,
  SignupParentDto, // ✅ Add this line
} from './dto';



import { MailerService } from '../mailer/mailer.service';
import { calculateAge } from '../common/utils/date-phase.util';

@Injectable()
export class AuthService {
  private otpStore = new Map<
    string,
    { otp: string; role: string; type: string; id: string; expires: number }
  >();

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailer: MailerService,
  ) {}

  // Admin Signup (HOD only)
  async signupAdmin(dto: SignupDto) {
    if (dto.role !== 'HOD') {
      throw new BadRequestException('Only HOD role can signup here');
    }

    if (!dto.school_id) {
      throw new BadRequestException('school_id is mandatory for HOD');
    }

    const exists = await this.prisma.adminLogin.findFirst({
      where: { email: dto.email },
    });
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

  // HOD Signup
  async signupHod(dto: SignupHodDto) {
    if (!dto.school_id) {
      throw new BadRequestException('school_id is mandatory for HOD');
    }

    const exists = await this.prisma.adminLogin.findFirst({
      where: { email: dto.email },
    });
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

  // Student signup
  async signupStudent(dto: SignupStudentDto) {
    const emailExists = await this.prisma.student.findFirst({
      where: { email: dto.email },
    });
    if (emailExists)
      throw new BadRequestException('Student with email already exists');

    const usernameExists = await this.prisma.student.findFirst({
      where: { username: dto.username },
    });
    if (usernameExists)
      throw new BadRequestException('Student with username already exists');

    if (!dto.school_id) {
      throw new BadRequestException('school_id is mandatory for Student');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const student = await this.prisma.student.create({
      data: {
        username: dto.username,
        email: dto.email,
        password_hash: hash,
        full_name: dto.full_name,
        adhar_number: dto.adhar_number,
        school_id: dto.school_id,
        session: dto.session,
        grade: dto.grade,
        gender: dto.gender,
        admission_date: dto.admission_date
          ? new Date(dto.admission_date)
          : undefined,
        dob: dto.dob ? new Date(dto.dob) : undefined,
      },
    });

    // 🧠 Add age in response
    const age = student.dob ? calculateAge(student.dob) : null;

    return {
      ...student,
      age,
    };
  }
  //parent signup
  async signupParent(dto: SignupParentDto) {
  const parentExists = await this.prisma.parent.findFirst({
    where: { email: dto.email },
  });

  if (parentExists) {
    throw new BadRequestException('Parent with this email already exists');
  }

  const hash = await bcrypt.hash(dto.password, 10);

  const parent = await this.prisma.parent.create({
    data: {
      full_name: dto.full_name,
      email: dto.email,
      password_hash: hash,
      phone_number: dto.phone_number,
    },
  });

  return {
    message: 'Parent account created successfully',
    parent_id: parent.parent_id,
    email: parent.email,
  };
}


  //Login with proper checks and debugging logs
  async login(dto: LoginDto) {
  console.log('Login attempt for:', dto.email);

  // Step 1: Check in adminLogin
  const admin = await this.prisma.adminLogin.findFirst({
    where: { email: dto.email },
  });
  console.log('Admin record:', admin);

  if (admin) {
    const isPasswordValid = await bcrypt.compare(dto.password, admin.password_hash);
    console.log('Admin password valid?', isPasswordValid);
    if (!isPasswordValid) throw new BadRequestException('Invalid email or password');

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

  // Step 2: Check in student
  const student = await this.prisma.student.findFirst({
    where: { email: dto.email },
  });
  console.log('Student record:', student);

  if (student) {
    const isPasswordValid = await bcrypt.compare(dto.password, student.password_hash);
    console.log('Student password valid?', isPasswordValid);
    if (!isPasswordValid) throw new BadRequestException('Invalid email or password');

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

  // Step 3: Check in parent
  const parent = await this.prisma.parent.findFirst({
    where: { email: dto.email },
  });
  console.log('Parent record:', parent);

  if (parent) {
    const isPasswordValid = await bcrypt.compare(dto.password, parent.password_hash || '');
    console.log('Parent password valid?', isPasswordValid);
    if (!isPasswordValid) throw new BadRequestException('Invalid email or password');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    this.otpStore.set(dto.email, {
      otp: hashedOtp,
      role: 'PARENT',
      type: 'parent',
      id: parent.parent_id,
      expires: Date.now() + 5 * 60 * 1000,
    });

    await this.mailer.sendOtp(dto.email, otp);
    return { message: 'OTP sent to email' };
  }

  // If not found anywhere
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

  let profileData: any = null;

  if (record.type === 'student') {
    const student = await this.prisma.student.findUnique({
      where: { student_id: record.id },
      select: {
        student_id: true,
        username: true,
        email: true,
        full_name: true,
        adhar_number: true,
        school_id: true,
        session: true,
        grade: true,
        gender: true,
        admission_date: true,
        dob: true,
      },
    });

    if (!student) throw new BadRequestException('Student not found');

    profileData = {
      ...student,
      age: student.dob ? calculateAge(student.dob) : null,
    };
  } else if (record.type === 'admin') {
    const admin = await this.prisma.adminLogin.findUnique({
      where: { admin_id: record.id },
      select: {
        admin_id: true,
        username: true,
        email: true,
        full_name: true,
        role: true,
        school_id: true,
      },
    });

    if (!admin) throw new BadRequestException('Admin not found');

    profileData = {
      admin_id: admin.admin_id,
      username: admin.username,
      email: admin.email,
      full_name: admin.full_name,
      role: admin.role,
      school_id: admin.school_id,
      is_super_admin: admin.role === 'SUPER_ADMIN',
      is_school_admin: admin.role === 'ADMIN',
      is_hod: admin.role === 'HOD',
    };
  } else if (record.type === 'parent') {
    const parent = await this.prisma.parent.findUnique({
      where: { parent_id: record.id },
      select: {
        parent_id: true,
        full_name: true,
        email: true,
        phone_number: true,
      },
    });

    if (!parent) throw new BadRequestException('Parent not found');

    profileData = {
      ...parent,
    };
  }

  return {
    access_token: token,
    role: record.role,
    profile: profileData,
  };
}

}
