import { RabbitConnect } from './RabbitConnect';
import { Message, Order, FailOrder } from './interfaces';
import { ConsumeMessage } from 'amqplib';

export interface WorkerParams {
  maxRetry?: number;
  active: string;
  exchange: string;
  holdKey?: string;
}

export abstract class Worker<M extends Order> extends RabbitConnect {
  private _maxRetry: number;
  private _active: string;
  private _holdKey: string | undefined;
  protected exchange: string;
  private _currentMessage: Message<M>;
  private _currentConsumeMessage: ConsumeMessage;
  constructor({ active, holdKey, exchange, maxRetry }: WorkerParams) {
    super();
    this._maxRetry = maxRetry || 0;
    this._active = active;
    this._holdKey = holdKey;
    this.exchange = exchange;
  }
  public async subscribe() {
    await this.connect();
    this.chanel.consume(this._active, this.checkMessage.bind(this));
  }
  private async checkMessage(message: ConsumeMessage) {
    this._currentConsumeMessage = message;
    const orderMessage: Message<M> = JSON.parse(message.content.toString());
    if (orderMessage.retry >= this._maxRetry) {
      await this.sendToErrorStorage('Превышен лимит попыток');
    }
    this._currentMessage = orderMessage;
    await this.handler(orderMessage.order || orderMessage);
  }
  protected async sendToErrorStorage(error: string) {
    const message: FailOrder = {
      order: this._currentMessage.order,
      errors: [...this._currentMessage.errors, error],
      retry: this._currentMessage.retry + 1,
      exchange: this.exchange,
      routingKey: this._active
    };
    console.log('Отправка в хранилище ошибок', message);
    this.ack();
  }
  protected async hold(error: string) {
    if (!this._holdKey) {
      return;
    }
    const orderMessage = {
      order: this._currentMessage.order,
      errors: [...this._currentMessage.errors, error],
      retry: this._currentMessage.retry + 1,
    };
    const orderData = Buffer.from(JSON.stringify(orderMessage));
    return this.chanel.publish(this.exchange, this._holdKey, orderData);
  }
  protected async ack() {
    return this.chanel.ack(this._currentConsumeMessage);
  }
  protected abstract handler(message: M): void;
}
