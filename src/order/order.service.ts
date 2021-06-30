import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IOrder, IUser } from '../interfaces';
import { CreateOrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order')
    private readonly orderModel: Model<IOrder>,
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
    const customer = await this.orderModel.find({
      'client.id': clientId,
    });
    console.log({ customer });

    return customer;
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
