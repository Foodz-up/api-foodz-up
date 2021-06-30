import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ArticleService } from './article.service';
import { CreateArticleDTO } from './dto/create-article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  // add an article
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async addArticle(
    @Res() res,
    @Body() CreateArticleDTO: CreateArticleDTO,
    @GetUser() user,
  ) {
    const article = await this.articleService.addArticleMe(
      CreateArticleDTO,
      user.id,
    );
    return res.status(HttpStatus.OK).json({
      message: "L'article a bien été ajouté au restaurant",
      article,
    });
  }

  // Retrieve articles list
  @Get()
  async getAllArticle(@Res() res) {
    const articles = await this.articleService.getAllArticle();
    return res.status(HttpStatus.OK).json(articles);
  }

  // Fetch a particular article using ID
  @Get('/:id')
  async getArticle(@Res() res, @Param('id') id) {
    const article = await this.articleService.getArticle(id);
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json(article);
  }

  @Put('/:id')
  async updateArticle(
    @Res() res,
    @Param('id') id,
    @Body() createArticleDTO: CreateArticleDTO,
  ) {
    const article = await this.articleService.updateArticle(
      id,
      createArticleDTO,
    );
    if (!article) throw new NotFoundException('Article does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Article has been successfully updated',
      article,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/update')
  async updateArticleMe(
    @Res() res,
    @GetUser() user,
    @Body() createArticleDTO: CreateArticleDTO,
  ) {
    const article = await this.articleService.updateArticleMe(
      user.id,
      createArticleDTO,
    );
    if (!article)
      throw new NotFoundException("Nous n'avons pas trouvé l'article en base");
    return res.status(HttpStatus.OK).json({
      message: 'Votre article a été mis à jour',
      article,
    });
  }

  // Delete a article
  @Delete('/dev/:id')
  async deleteArticle(@Res() res, @Query('articleID') articleID) {
    const article = await this.articleService.deleteArticle(articleID);
    if (!article) throw new NotFoundException('article does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Article has been deleted',
      article,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/delete')
  async deleteArticleMe(
    @Res() res,
    @Body('articleId') articleId,
    @GetUser() user,
  ) {
    const article = await this.articleService.deleteArticleMe(
      user.id,
      articleId,
    );
    if (!article) throw new NotFoundException('article does not exist');
    return res.status(HttpStatus.OK).json({
      message: "L'article a bien été supprimé",
      article,
    });
  }
}
