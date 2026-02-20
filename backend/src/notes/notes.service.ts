import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<NoteDocument> {
    const newNote = new this.noteModel({
      ...createNoteDto,
      author: userId,
    });
    return newNote.save();
  }

  async findAll(userId?: string, search?: string): Promise<NoteDocument[]> {
    const baseFilter = userId ? {} : { visibility: 'public' };

    if (!search) {
      return this.noteModel.find(baseFilter).populate('author', 'username').exec();
    }

    const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const searchRegex = new RegExp(escapeRegex(search), 'i');

    const notes = await this.noteModel.aggregate([
      { $match: baseFilter },
      {
        $lookup: {
          from: 'users',
          let: { authorId: '$author' },
          pipeline: [
            { $match: { $expr: { $eq: [{ $toString: '$_id' }, { $toString: '$$authorId' }] } } }
          ],
          as: 'authorDetails'
        }
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { 'authorDetails.username': searchRegex }
          ]
        }
      },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $not: ['$authorDetails'] },
              then: null,
              else: {
                _id: '$authorDetails._id',
                username: '$authorDetails.username'
              }
            }
          },
          id: '$_id'
        }
      },
      {
        $project: {
          authorDetails: 0
        }
      }
    ]).exec();

    return notes as any;
  }

  async findAllByAuthor(userId: string, search?: string): Promise<NoteDocument[]> {
    const baseFilter: any = { author: userId };

    if (!search) {
      return this.noteModel.find(baseFilter).populate('author', 'username').exec();
    }

    const escapeRegex = (text: string) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const searchRegex = new RegExp(escapeRegex(search), 'i');

    const notes = await this.noteModel.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $toString: '$author' }, userId] }
        }
      },
      {
        $lookup: {
          from: 'users',
          let: { authorId: '$author' },
          pipeline: [
            { $match: { $expr: { $eq: [{ $toString: '$_id' }, { $toString: '$$authorId' }] } } }
          ],
          as: 'authorDetails'
        }
      },
      {
        $unwind: {
          path: '$authorDetails',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { 'authorDetails.username': searchRegex }
          ]
        }
      },
      {
        $addFields: {
          author: {
            $cond: {
              if: { $not: ['$authorDetails'] },
              then: null,
              else: {
                _id: '$authorDetails._id',
                username: '$authorDetails.username'
              }
            }
          },
          id: '$_id'
        }
      },
      {
        $project: {
          authorDetails: 0
        }
      }
    ]).exec();

    return notes as any;
  }

  async findOne(id: string, userId?: string): Promise<NoteDocument> {
    const note = await this.noteModel.findById(id).populate('author', 'username').exec();
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    if (note.visibility === 'member' && !userId) {
      throw new ForbiddenException('You must be logged in to view this note');
    }

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<NoteDocument> {
    const note = await this.findOne(id, userId);
    
    const author = note.author as unknown as UserDocument;
    if (author._id.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to update this note');
    }

    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .populate('author', 'username')
      .exec() as Promise<NoteDocument>;
  }

  async remove(id: string, userId: string): Promise<void> {
    const note = await this.findOne(id, userId);

    const author = note.author as unknown as UserDocument;
    if (author._id.toString() !== userId) {
      throw new ForbiddenException('You are not allowed to delete this note');
    }

    await this.noteModel.findByIdAndDelete(id).exec();
  }
}
