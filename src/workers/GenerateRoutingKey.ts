import { Worker } from '../Worker';
import {
  isOrderWithPhone,
  isOrderWithDeliveryAddress,
  Order,
  Message,
} from '../interfaces';
import { Keys } from '../constants';

export class GenerateRoutingKey extends Worker<Order> {
  constructor() {
    super({
      active: 'generateRoutingKey',
      exchange: 'postprocessing',
    });
  }
  protected async handler(order: Order) {
    try {
      const routingKey: string[] = [];
      if (isOrderWithPhone(order)) {
        routingKey.push(Keys.SEND_SMS);
      }
      if (isOrderWithDeliveryAddress(order)) {
        routingKey.push(Keys.SEND_TO_DELIVERY);
      }
      const message: Message<Order> = {
        retry: 0,
        errors: [],
        order,
      };
      await this.chanel.publish(
        this.exchange,
        routingKey.join('.'),
        Buffer.from(JSON.stringify(message)),
      );
      await this.ack();
    } catch (error) {
      console.error(error);
      await this.sendToErrorStorage(error);
    }
  }
}
