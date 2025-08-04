import { Body, Controller, Post, Req } from "@nestjs/common";
import { UseGuards, Get } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { GetUser } from "./decorators/get-user.decorator";
import { User } from "../user/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: Request & { user: { sub: number; email: string } }) {
    console.log(req.user, "req.user in me");
    const userId = req.user.sub;
    return this.authService.getUserById(userId);
  }
}
