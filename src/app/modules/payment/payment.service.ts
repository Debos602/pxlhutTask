import { PaymentModel } from './payment.model';
import { join } from 'path';
import { readFileSync } from 'fs';
import { IPayment } from './payment.interface';


const checkoutPaymentService = async (payload: IPayment) => {

  const result = await PaymentModel.create({
    ...payload
  });


  const filePath = join(__dirname, '../../../../public/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  // Use 'message' to reflect payment status
  template = template.replace('{{message}}', payload.status === 'success' ? 'Payment Successful' : 'Payment Failed');

  return {
    template,
    result
  };
};

export const paymentServices = {
  checkoutPaymentService,
};
