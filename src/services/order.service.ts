import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManageOrderRequestDto } from 'src/dto/request/manage.order.request.dto';
import { IOrder } from 'src/interfaces/order.interface';
import { Order } from 'src/models/order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private order_model: Model<Order>,
  ) {}

  async create_order(
    order: ManageOrderRequestDto,
    user_id: string,
  ): Promise<IOrder> {
    const new_order = await this.order_model.create({
      ...order,
      user_id,
    });

    const result = await new_order.save();

    return result;
  }

  async get_customer_orders(page: number, user_id: string): Promise<IOrder[]> {
    const page_size = 5;
    const skip = page_size * (page - 1);

    const all_orders = await this.order_model
      .find({ user_id })
      .populate('user_id')
      .sort({ price: 1 })
      .skip(skip)
      .limit(page_size)
      .exec();

    return all_orders;
  }
}
