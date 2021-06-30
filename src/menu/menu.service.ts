import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IMenu, IRestaurant } from '../interfaces';
import { CreateMenuDTO } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('Menu')
    private readonly menuModel: Model<IMenu>,
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<IRestaurant>,
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

  async addMenuMe(
    userId: number,
    createMenuDTO: CreateMenuDTO,
  ): Promise<IMenu> {
    const newMenu = await new this.menuModel(createMenuDTO);
    await this.restaurantModel.findOneAndUpdate(
      { editor: userId },
      { $push: { menus: createMenuDTO } },
      { new: true, useFindAndModify: true },
    );
    console.log({ userId, createMenuDTO, newMenu });
    return newMenu;
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

  async updateMenuMe(
    userId: number,
    createMenuDTO: CreateMenuDTO,
  ): Promise<IMenu> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate(
      { editor: userId, menus: { $elemMatch: { id: createMenuDTO.id } } },
      { $set: { 'menus.$': createMenuDTO } },
      { new: true, useFindAndModify: true },
    );

    const updatedMenu = updatedRestaurant.menus.find(
      (menus) => menus.id === createMenuDTO.id,
    );
    console.log({ createMenuDTO, d: updatedMenu });
    return updatedMenu;
  }

  async deleteMenuMe(userId: number, menuId: number): Promise<any> {
    const deletedMenus = await this.restaurantModel.findOneAndUpdate(
      { editor: userId },
      { $pull: { menus: { id: menuId } } },
      { multi: true, new: true, useFindAndModify: true },
    );
    return deletedMenus;
  }

  // Delete a customer
  async deleteMenu(customerID): Promise<any> {
    const deleteMenu = await this.menuModel.findOneAndRemove(customerID);
    return deleteMenu;
  }
}
