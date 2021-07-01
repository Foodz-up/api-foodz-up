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
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetUser } from 'src/auth/guards/get-user.decorator';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // add a order
  @Post()
  async addOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO) {
    const order = await this.orderService.addOrder(createOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    });
  }

  // Retrieve orders list
  @Get()
  async getAllOrder(@Res() res) {
    const orders = await this.orderService.getAllOrder();
    return res.status(HttpStatus.OK).json(orders);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getOrderMe(@Res() res, @GetUser() user) {
    const orders = await this.orderService.getOrderMe(user.id);
    if (!orders)
      throw new NotFoundException(
        "Vous n'avez pas encore réalisé de commandes",
      );
    return res.status(HttpStatus.OK).json({
      message: 'Vos commandes on été récupérées',
      orders,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me/restaurator')
  async getOrderMeRestaurator(@Res() res, @GetUser() user) {
    const orders = await this.orderService.getOrderMeRestaurator(user.id);
    if (!orders)
      throw new NotFoundException("Vous n'avez pas encore de commandes");
    return res.status(HttpStatus.OK).json({
      message: 'Vos commandes on été récupérées',
      orders,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me/driver')
  async getOrderMeDriver(@Res() res, @GetUser() user) {
    const orders = await this.orderService.getOrderMeDriver(user.id);
    if (!orders)
      throw new NotFoundException("Vous n'avez pas encore de commandes");
    return res.status(HttpStatus.OK).json({
      message: 'Vos commandes on été récupérées',
      orders,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/driver')
  async getOrderDeliver(@Res() res, @GetUser() user) {
    const orders = await this.orderService.getOrderDeliver();
    if (!orders)
      throw new NotFoundException("Il n'y a pas de commandes pour le moment");
    return res.status(HttpStatus.OK).json({
      message: 'Les commandes disponibles ont étaient récupéré',
      orders,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/me/update')
  async updateOrderClient(@Res() res, @GetUser() user, @Body() body) {
    const order = await this.orderService.updateOrderClient(user.id, body);
    if (!order)
      throw new NotFoundException('La mise à jours de la commande a échouée');
    return res.status(HttpStatus.OK).json({
      message: `La commande est passé au status : "${order.status}"`,
      order,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update')
  async updateOrderClientfromDriver(@Res() res, @Body() body) {
    const order = await this.orderService.updateOrderClientfromDriver(body);
    if (!order)
      throw new NotFoundException('La mise à jours de la commande a échouée');
    return res.status(HttpStatus.OK).json({
      message: `La commande est passé au status : "${order.status}"`,
      order,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async addOrderMe(
    @Res() res,
    @Body() createOrderDTO: CreateOrderDTO,
    @GetUser() user,
  ) {
    const order = await this.orderService.addOrderMe(user, createOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    });
  }

  // Fetch a particular order using ID
  @Get('/:id')
  async getOrder(@Res() res, @Param('id') id) {
    const order = await this.orderService.getOrder(id);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json(order);
  }

  // @Put('/:id')
  // async updateOrder(
  //   @Res() res,
  //   @Param('id') id,
  //   @Body() createOrderDTO: CreateOrderDTO,
  // ) {
  //   const order = await this.orderService.updateOrder(id, createOrderDTO);
  //   if (!order) throw new NotFoundException('Order does not exist!');
  //   return res.status(HttpStatus.OK).json({
  //     message: 'Order has been successfully updated',
  //     order,
  //   });
  // }

  // Delete a order
  @Delete('/:id')
  async deleteOrder(@Res() res, @Query('orderID') orderID) {
    const order = await this.orderService.deleteOrder(orderID);
    if (!order) throw new NotFoundException('Order does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted',
      order,
    });
  }
}
