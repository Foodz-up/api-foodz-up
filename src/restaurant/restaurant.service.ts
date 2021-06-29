import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRestaurant } from '../interfaces';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<IRestaurant>,
  ) {}
  // fetch all restaurant
  async getAllRestaurant(): Promise<IRestaurant[]> {
    const restaurant = await this.restaurantModel.find();
    return restaurant;
  }
  // Get a single customer
  async getRestaurant(customerID): Promise<IRestaurant> {
    const customer = await this.restaurantModel.findOne({ id: customerID });
    return customer;
  }

  // post a single customer
  async addRestaurant(
    userId: number,
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<IRestaurant> {
    createRestaurantDTO.editor = userId;
    const newRestaurant = await new this.restaurantModel(createRestaurantDTO);
    return newRestaurant.save();
  }
  // Edit customer details
  async updateRestaurant(
    customerID,
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<IRestaurant> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      { id: customerID },
      createRestaurantDTO,
      { new: true },
    );
    return updatedRestaurant;
  }
  // Delete a customer
  async deleteRestaurant(customerID): Promise<any> {
    const deletedRestaurant = await this.restaurantModel.findOneAndDelete({
      id: customerID,
    });
    return deletedRestaurant;
  }

  async getRestaurantMe(editorId: number): Promise<IRestaurant> {
    const customer = await this.restaurantModel.findOne({ editor: editorId });
    return customer;
  }

  async updateRestaurantMe(
    customerID,
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<IRestaurant> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      { editor: customerID },
      createRestaurantDTO,
      { new: true, useFindAndModify: true },
    );
    return updatedRestaurant;
  }

  async deleteRestaurantMe(customerID): Promise<any> {
    const deletedRestaurant = await this.restaurantModel.findOneAndDelete(
      {
        editor: customerID,
      },
      { useFindAndModify: true },
    );
    return deletedRestaurant;
  }
}
