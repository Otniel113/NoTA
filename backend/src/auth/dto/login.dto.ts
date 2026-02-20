import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Username or email must be a string' })
  @IsNotEmpty({ message: 'Username or email is required' })
  username: string; // Can be username or email

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
