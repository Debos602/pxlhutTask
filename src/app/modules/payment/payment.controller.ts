import { Request, Response } from 'express';
import { paymentServices } from './payment.service';

const confirmationController = async (req: Request, res: Response) => {
  const payload = req.body;

  // Call the service
  const result = await paymentServices.checkoutPaymentService(
    payload
  );
  res.send(result);
};

export const paymentController = {
  confirmationController,
};
