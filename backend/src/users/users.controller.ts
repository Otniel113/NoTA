import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotesService } from '../notes/notes.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly notesService: NotesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      username: user.username,
      email: user.email,
      _id: (user as any)._id,
      createdAt: (user as any).createdAt,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:username/notes')
  async findNotes(@Param('username') username: string, @Query('search') search: string) {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // Return only public/member notes, not private ones
    return this.notesService.findSharedByAuthor(user._id.toString(), search);
  }
}
