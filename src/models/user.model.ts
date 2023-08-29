import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserStatus } from 'src/interfaces/user.interface';

@Schema({timestamps: true})
export class User {
    @Prop({required: true})
    first_name: string;

    @Prop({required: true})
    last_name: string;

    @Prop({required: true})
    user_name: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    phone_number: number;

    @Prop({required: true})
    delivery_address: string;

    @Prop({default: true})
    active?: boolean;

    @Prop()
    last_login_date: Date;

    @Prop()
    num_login_attempts: number;

    @Prop({default: 'active'})
    status: UserStatus;


}

export const user_schema = SchemaFactory.createForClass(User);