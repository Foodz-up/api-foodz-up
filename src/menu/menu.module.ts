import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schemas/menu.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
