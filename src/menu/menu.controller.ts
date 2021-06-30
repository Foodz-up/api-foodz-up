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
import { MenuService } from './menu.service';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/guards/get-user.decorator';

@Controller('menus')
export class MenuController {
  constructor(private menuService: MenuService) {}

  // add a menu
  @Post()
  async addMenu(@Res() res, @Body() createMenuDTO: CreateMenuDTO) {
    const menu = await this.menuService.addMenu(createMenuDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been created successfully',
      menu,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async addMenuMe(
    @Res() res,
    @Body() createMenuDTO: CreateMenuDTO,
    @GetUser() user,
  ) {
    const menu = await this.menuService.addMenuMe(user.id, createMenuDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Le menu a bien été ajouté au restaurant',
      menu,
    });
  }

  // Retrieve menu list
  @Get()
  async getAllMenu(@Res() res) {
    const menu = await this.menuService.getAllMenu();
    return res.status(HttpStatus.OK).json(menu);
  }

  // Fetch a particular menu using ID
  @Get('/:id')
  async getMenu(@Res() res, @Param('id') id) {
    const menu = await this.menuService.getMenu(id);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return res.status(HttpStatus.OK).json(menu);
  }

  @Put('/:id')
  async updateMenu(
    @Res() res,
    @Param('id') id,
    @Body() createMenuDTO: CreateMenuDTO,
  ) {
    const menu = await this.menuService.updateMenu(id, createMenuDTO);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been successfully updated',
      menu,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/update')
  async updateMenuMe(
    @Res() res,
    @Body() createMenuDTO: CreateMenuDTO,
    @GetUser() user,
  ) {
    const menu = await this.menuService.updateMenuMe(user.id, createMenuDTO);
    if (!menu) throw new NotFoundException('Menu does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been successfully updated',
      menu,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/delete')
  async deleteMenuMe(@Res() res, @Body('menuId') menuId, @GetUser() user) {
    const menu = await this.menuService.deleteMenuMe(user.id, menuId);
    if (!menu) throw new NotFoundException('Menu does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been deleted',
      menu,
    });
  }

  // Delete a menu
  @Delete('/:id')
  async deleteMenu(@Res() res, @Query('menuID') menuID) {
    const menu = await this.menuService.deleteMenu(menuID);
    if (!menu) throw new NotFoundException('Menu does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Menu has been deleted',
      menu,
    });
  }
}
