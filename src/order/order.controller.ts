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
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.createOrder.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // add a order
  @Post()
  @ApiOperation({ summary: 'Client can add an order' })
  async addOrder(@Res() res, @Body() createOrderDTO: CreateOrderDTO) {
    const order = await this.orderService.addOrder(createOrderDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Order has been created successfully',
      order,
    });
  }

  // Retrieve orders list
  @Get()
  @ApiOperation({ summary: 'Client can get all of his order' })
  async getAllOrder(@Res() res) {
    const orders = await this.orderService.getAllOrder();
    return res.status(HttpStatus.OK).json(orders);
  }

  // Fetch a particular order using ID
  @Get('/:id')
  @ApiOperation({ summary: 'Client can get a specific order' })
  async getOrder(@Res() res, @Param('id') id) {
    const order = await this.orderService.getOrder(id);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json(order);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Client can update a order' })
  async updateOrder(
    @Res() res,
    @Param('id') id,
    @Body() createOrderDTO: CreateOrderDTO,
  ) {
    const order = await this.orderService.updateOrder(id, createOrderDTO);
    if (!order) throw new NotFoundException('Order does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Order has been successfully updated',
      order,
    });
  }

  // Delete a order
  @Delete('/:id')
  @ApiOperation({ summary: 'Client can delete one of his order' })
  async deleteOrder(@Res() res, @Query('orderID') orderID) {
    const order = await this.orderService.deleteOrder(orderID);
    if (!order) throw new NotFoundException('Order does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Order has been deleted',
      order,
    });
  }
}
