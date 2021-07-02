import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMenu } from './interfaces/menu.interface';
import { CreateMenuDTO } from './dto/menu.createMenu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('Menu')
    private readonly menuModel: Model<IMenu>,
  ) {}
  // fetch all menu
  async getAllMenu(): Promise<IMenu[]> {
    const menu = await this.menuModel.find();
    return menu;
  }
  // Get a single customer
  async getMenu(customerID): Promise<IMenu> {
    const customer = await this.menuModel.findOne({ id: customerID });
    return customer;
  }
  // post a single customer
  async addMenu(createMenuDTO: CreateMenuDTO): Promise<IMenu> {
    const newMenu = await new this.menuModel(createMenuDTO);
    return newMenu.save();
  }
  // Edit customer details
  async updateMenu(customerID, createMenuDTO: CreateMenuDTO): Promise<IMenu> {
    const updatedMenu = await this.menuModel.findOneAndUpdate(
      customerID,
      createMenuDTO,
      { new: true },
    );
    return updatedMenu;
  }
  // Delete a customer
  async deleteMenu(customerID): Promise<any> {
    const deleteMenu = await this.menuModel.findOneAndRemove(customerID);
    return deleteMenu;
  }
}
