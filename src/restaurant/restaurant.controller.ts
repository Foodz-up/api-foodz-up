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
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
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
  @Post()
  @ApiOperation({ summary: 'Restaurator can add a restaurant' })
  async addRestaurant(
    @Res() res,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ) {
    const restaurant = await this.restaurantService.addRestaurant(
      createRestaurantDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Restaurant has been created successfully',
      restaurant,
    });
  }

  // Retrieve restaurants list
  @Get()
  @ApiOperation({ summary: 'Restaurator can get all of his restaurants' })
  async getAllRestaurant(@Res() res) {
    const restaurants = await this.restaurantService.getAllRestaurant();
    return res.status(HttpStatus.OK).json(restaurants);
  }

  // Fetch a particular restaurant using ID
  @Get('/:id')
  @ApiOperation({ summary: 'Restaurator can get a specific restaurant' })
  async getRestaurant(@Res() res, @Param('id') id) {
    const restaurant = await this.restaurantService.getRestaurant(id);
    if (!restaurant) throw new NotFoundException('Restaurant does not exist!');
    return res.status(HttpStatus.OK).json(restaurant);
  }

  @Put('/:id')
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

  // Delete a restaurant
  @Delete('/:id')
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
}
