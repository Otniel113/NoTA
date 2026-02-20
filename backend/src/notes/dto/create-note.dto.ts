import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title cannot be more than 100 characters' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MaxLength(1000, { message: 'Content cannot be more than 1000 characters' })
  content: string;

  @IsEnum(['public', 'member'], { message: 'Visibility must be either public or member' })
  @IsOptional()
  visibility?: string;
}
