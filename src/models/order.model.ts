import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'src/models/user.model';

@Schema({timestamps: true})
export class Order {
    @Prop({ type: 'ObjectId', ref: User.name })
    user_id: string;
  
    @Prop({ required: true })
    products: string[];
  
    @Prop({ required: true, default: 0 })
    quantity: number;
  
    @Prop({ required: true })
    price: number;
}

export const order_schema = SchemaFactory.createForClass(Order);