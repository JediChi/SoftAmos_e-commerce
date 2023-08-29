export interface IOrder {
    id? : string;
    user_id?: string;
    products: string[];
    quantity?: number;
    price?: number;
    created_at?: Date;
    updated_at?: Date;
    page?: number;
}