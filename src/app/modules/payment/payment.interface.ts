import { Types } from 'mongoose';

export interface IPayment {
    amount: number;
    paymentMethod: 'card' | 'bkash' | 'nagad' | 'cash' | "rocket";
    userId: Types.ObjectId;
    transactionId?: string;
    status?: 'success' | 'failed' | 'pending';
    createdAt?: Date;
    updatedAt?: Date;
}
