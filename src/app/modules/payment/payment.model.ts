import { Schema, model } from 'mongoose';

const paymentSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'bkash', 'nagad', 'cash', "rocket"],
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        transactionId: {
            type: String,
        },
        status: {
            type: String,
            enum: ['success', 'failed', 'pending'],
            default: 'success',
        },
    },
    { timestamps: true }
);

export const PaymentModel = model('Payment', paymentSchema);
