import axios from 'axios';
import { Error } from 'mongoose';
import config from '../../config';
import { IPayment } from './payment.interface';

export const initiatPayment = async (paymentData: IPayment) => {
  try {
    const response = await axios.post(process.env.Payment_url!, {
      store_id: config.Store_Id,
      signature_key: config.Signature_Key,
      tran_id: paymentData.transactionId,
      success_url: `https://task-pxl-hut.vercel.app//api/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `https://task-pxl-hut.vercel.app/api/confirmation?status=failed`,
      cancel_url: 'https://car-rental-backend-nine.vercel.app',
      amount: paymentData.amount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_add1: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      type: 'json',
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed initiating payment');
  }

  // console.log('Payment API response:', response);
};

