import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder, IRestaurant, IUser } from '../interfaces';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<IOrder>,
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<IRestaurant>,
  ) {}
  // fetch all order
  async getAllOrder(): Promise<IOrder[]> {
    const order = await this.orderModel.find();
    return order;
  }
  // Get a single customer
  async getOrder(customerID): Promise<IOrder> {
    const customer = await this.orderModel.findOne({ id: customerID });
    return customer;
  }

  async getOrderMe(clientId: number): Promise<Array<IOrder>> {
    const orders = await this.orderModel.find({
      'client.id': clientId,
    });
    console.log({ orders });

    return orders;
  }

  async getOrderMeRestaurator(userId: number): Promise<Array<IOrder>> {
    const restaurantOwner = await this.restaurantModel.findOne({
      editor: userId,
    });
    console.log({ restaurantOwner });
    const newId = restaurantOwner._id.toString();

    const orders = await this.orderModel.find({
      'restaurant._id': newId,
    });
    console.log({ orders });

    return orders;
  }
  // post a single customer
  async addOrder(createOrderDTO: CreateOrderDTO): Promise<IOrder> {
    const newOrder = await new this.orderModel(createOrderDTO);
    return newOrder.save();
  }

  async addOrderMe(
    user: IUser,
    createOrderDTO: CreateOrderDTO,
  ): Promise<IOrder> {
    createOrderDTO.client = user;
    const newOrder = await new this.orderModel(createOrderDTO);
    return newOrder.save();
  }

  // Edit customer details
  // async updateOrder(
  //   customerID,
  //   createOrderDTO: CreateOrderDTO,
  // ): Promise<IOrder> {
  //   const updatedOrder = await this.orderModel.findOneAndUpdate(
  //     customerID,
  //     createOrderDTO,
  //     { new: true },
  //   );
  //   return updatedOrder;
  // }
  // Delete a customer
  async deleteOrder(customerID): Promise<any> {
    const deletedOrder = await this.orderModel.findOneAndRemove(customerID);
    return deletedOrder;
  }
}
