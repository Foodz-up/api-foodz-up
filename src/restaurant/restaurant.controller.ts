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
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { CreateRestaurantDTO } from './dto/restaurant.createRestaurant.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  // add a restaurant
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  @ApiOperation({ summary: 'Restaurator can add a restaurant' })
  async addRestaurant(
    @Res() res,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
    @GetUser() user,
  ) {
    const restaurant = await this.restaurantService.addRestaurant(
      user.id,
      createRestaurantDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: `Votre restaurant "${restaurant.name}" a était créé avec succès`,
      restaurant,
    });
  }

  // Retrieve restaurants list
  @Get()
  @ApiOperation({ summary: 'Restaurator can get all of his restaurants' })
  async getAllRestaurant(@Res() res) {
    const restaurants = await this.restaurantService.getAllRestaurant();
    return res.status(HttpStatus.OK).json({
      message:
        "Vous avez récupéré l'ensemble des restaurant présent sur le site",
      restaurants,
    });
  }

  // Fetch a particular restaurant using ID
  @Get('/dev/:id')
  @ApiOperation({ summary: 'Restaurator can get a specific restaurant' })
  async getRestaurant(@Res() res, @Param('id') id) {
    const restaurant = await this.restaurantService.getRestaurant(id);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res.status(HttpStatus.OK).json(restaurant);
  }

  // Fetch a particular restaurant using ID
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getRestaurantMe(@Res() res, @GetUser() user) {
    const restaurant = await this.restaurantService.getRestaurantMe(user.id);
    if (!restaurant)
      throw new NotFoundException(
        "Vous n'avez pas de restaurant. Vous pouvez en créer un pour commencer l'aventure",
      );
    return res.status(HttpStatus.OK).json({ restaurant });
  }

  @Put('/dev/:id')
  @ApiOperation({ summary: 'Restaurator can update a restaurant' })
  async updateRestaurant(
    @Res() res,
    @Param('id') id,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ) {
    const restaurant = await this.restaurantService.updateRestaurant(
      id,
      createRestaurantDTO,
    );
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been successfully updated',
      restaurant,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put('/me')
  async updateRestaurantMe(
    @Res() res,
    @GetUser() user,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ) {
    const restaurant = await this.restaurantService.updateRestaurantMe(
      user.id,
      createRestaurantDTO,
    );
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Votre restaurant a été mis à jour', restaurant });
  }

  // Delete a restaurant
  @Delete('/dev/:id')
  @ApiOperation({ summary: 'Restaurator can delete one of his restaurant' })
  async deleteRestaurant(@Res() res, @Param('id') restaurantID) {
    const restaurant = await this.restaurantService.deleteRestaurant(
      restaurantID,
    );
    if (!restaurant) throw new NotFoundException('Restaurant does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been deleted',
      restaurant,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteRestaurantMe(@Res() res, @GetUser() user) {
    const restaurant = await this.restaurantService.deleteRestaurantMe(user.id);
    if (!restaurant)
      throw new NotFoundException("Attention : Vous n'avez pas de restaurant");
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Votre restaurant a été supprimé', restaurant });
  }
}
