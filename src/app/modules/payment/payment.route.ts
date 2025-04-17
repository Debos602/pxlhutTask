import { Router } from 'express';
import { paymentController } from './payment.controller';

const router = Router();

router.post('/payments/checkout', paymentController.confirmationController);

// app.get('/', (req, res) => {
//     const template = await paymentServices.confirmationService(req.query, );
//       res.send(template));
//     });

export const PaymentRoutes = router;
