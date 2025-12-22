import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { BlacklistedToken, BlacklistedTokenDocument } from './schemas/blacklisted-token.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(BlacklistedToken.name) private blacklistedTokenModel: Model<BlacklistedTokenDocument>,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;

    // Check if username exists
    const existingUsername = await this.usersService.findOneByUsername(username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email exists
    const existingEmail = await this.usersService.findOneByEmail(email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });

    return {
      message: 'User registered successfully',
      userId: user._id,
    };
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // Find user by username or email
    const user = await this.usersService.findOneByUsernameOrEmail(username);

    if (!user) {
      throw new UnauthorizedException('Username, email, or password is incorrect');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Username, email, or password is incorrect');
    }

    // Generate JWT
    const payload = { sub: user._id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string) {
    const blacklistedToken = new this.blacklistedTokenModel({ token });
    await blacklistedToken.save();
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await this.blacklistedTokenModel.findOne({ token }).exec();
    return !!blacklistedToken;
  }
}
