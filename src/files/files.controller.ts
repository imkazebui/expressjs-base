import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FileDto } from './files.dto';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor() {}

  @ApiOperation({ summary: 'Upload file' })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  upload(@Body() body: FileDto, @UploadedFile() file: Express.Multer.File) {
    return {
      body,
      file,
    };
  }
}
