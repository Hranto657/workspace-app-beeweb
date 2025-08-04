import { Injectable, ConflictException } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      password: hashedPassword,
    });

    const saved = await this.userRepo.save(user);

    const { password, ...rest } = saved;
    return rest;
  }
}
