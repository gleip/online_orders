import { Worker } from '../Worker';
import { OrderWithPhone } from '../interfaces';

export class SendSms extends Worker<OrderWithPhone> {
  constructor() {
    super({
      active: 'sendSms',
      exchange: 'notify',
      holdKey: 'sendSmsHold',
      maxRetry: process.env.MAX_RETRY ? parseInt(process.env.MAX_RETRY) : 5,
    });
  }
  protected async handler(message: OrderWithPhone) {
    try {
      console.log('Отправка sms на номер: ', message.phone);
      this.ack();
    } catch (error) {
      await this.hold(error);
    }
  }
}
