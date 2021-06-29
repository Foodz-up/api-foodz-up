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
  Req,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.create.dto';
import { UpdateUserDTO } from './dto/user.update.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { IsAdminGuard } from 'src/auth/guards/isAdmin.guard';
import { SameUserIdGuard } from 'src/auth/guards/sameUserId.guard';
import { ChangePasswordUserDTO } from './dto/user.changePassword';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //add a user
  @UseGuards(JwtAuthGuard, IsAdminGuard)
  @Post()
  async addUser(@Res() res, @Body() CreateUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(CreateUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'User has been created successfully',
      user,
    });
  }

  @UseGuards(JwtAuthGuard, IsAdminGuard)
  // Retrieve users list
  @Get()
  async getAllUser(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  // Fetch a particular user using ID
  @Get('/dev/:id')
  async getUser(@Res() res, @Param('id') id) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  @Put('/dev/:id')
  async updateUser(
    @Res() res,
    @Param('id') id,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const user = await this.userService.updateUser(id, updateUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUserFromApp(
    @Res() res,
    @GetUser() user,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(
      user.id,
      updateUserDTO,
    );
    if (!updatedUser)
      throw new NotFoundException("L'utilisateur n'existe plus");
    return res.status(HttpStatus.OK).json({
      message: 'Vos informations ont été mises à jour',
      updatedUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async changePasswordFromApp(
    @Body() changePasswordUserDTO: ChangePasswordUserDTO,
    @Res() res,
    @GetUser() user,
  ) {
    const change = await this.userService.changePassword(
      user.id,
      changePasswordUserDTO,
    );
    if (!change) throw new NotFoundException("L'utilisateur n'existe plus");
    return res.status(HttpStatus.OK).json({
      message: 'Votre mot de passe a bien été modifié',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('sponsor')
  async changeSponsorCodeFromApp(
    @Body() body: any,
    @Res() res,
    @GetUser() user,
  ) {
    const change = await this.userService.changeSponsorCode(
      user.id,
      body.sponsorCode,
    );
    if (!change) throw new NotFoundException("L'utilisateur n'existe plus");
    return res.status(HttpStatus.OK).json({
      message: 'Votre code de parrainage est prêt a être partagé',
      sponsorCode: change.sponsorCode,
    });
  }

  @UseGuards(JwtAuthGuard, SameUserIdGuard)
  // Delete a user
  @Delete('/dev/:id')
  async deleteUser(@Res() res, @Param('id') userID) {
    const user = await this.userService.deleteUser(userID);

    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }

  @UseGuards(JwtAuthGuard)
  // Delete a user
  @Delete()
  async deleteUserFromApp(@Res() res, @GetUser() user) {
    await this.userService.deleteUser(user.id);
    return res.status(HttpStatus.OK).json({
      message: 'Votre compte a bien été supprimé',
    });
  }
}
