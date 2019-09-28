import { Worker } from '../Worker';
import { OrderWithDeliveryAddress } from '../interfaces';

export class Delivery extends Worker<OrderWithDeliveryAddress> {
  constructor() {
    super({
      active: 'delivery',
      exchange: 'interates',
      holdKey: 'deliveryHold',
      maxRetry: process.env.MAX_RETRY ? parseInt(process.env.MAX_RETRY) : 5,
    });
  }
  protected async handler(message: OrderWithDeliveryAddress) {
    try {
      console.log('Отправка заказа в службу доставки на адрес: ', message.deliveryAddress);
      this.ack();
    } catch (error) {
      await this.hold(error);
    }
  }
}
