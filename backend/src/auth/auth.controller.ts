import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupDto,
  SignupHodDto,
  SignupStudentDto,
  LoginDto,
  VerifyOtpDto,
  SignupParentDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // HOD signup only (ADMIN and SUPER_ADMIN created by seed script)
  @Post('signup/admin')
  signupAdmin(@Body() dto: SignupDto) {
    return this.authService.signupAdmin(dto);
  }

  @Post('signup/hod')
  signupHod(@Body() dto: SignupHodDto) {
    return this.authService.signupHod(dto);
  }

  @Post('signup/student')
  signupStudent(@Body() dto: SignupStudentDto) {
    return this.authService.signupStudent(dto);
  }
@Post('signup/parent')
  signupParent(@Body() dto: SignupParentDto) {
    return this.authService.signupParent(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
