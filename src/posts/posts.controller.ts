import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { PostModel } from './post.model';
import { IsNotEmpty } from 'class-validator'

class CreatePostDto {
  @ApiProperty({ description: '文章标题', example: '文章标题1' })
  @IsNotEmpty({ message: '请填写标题'})
  title: string;
  @ApiProperty({ description: '文章内容', example: '文章内容1' })
  content: string;
}

@Controller('posts')
@ApiTags('文章')
export class PostsController {
  @Get()
  @ApiOperation({ summary: '博客列表' })
  async index() {
    return await PostModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  async create(@Body() createPostDto: CreatePostDto) {
    await PostModel.create(createPostDto);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async detail(@Param('id') id: string) {
    return await PostModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑文章' })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await PostModel.findByIdAndUpdate(id, updatePostDto);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    await PostModel.findByIdAndRemove(id);
    return {
      success: true,
    };
  }
}




