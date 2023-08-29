import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderController } from 'src/controllers/order.controller';
import { Order, order_schema } from 'src/models/order.model';
import { OrderService } from 'src/services/order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: order_schema }]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
