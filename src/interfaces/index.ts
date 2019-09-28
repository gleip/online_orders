import { Types, ExchangeTypes } from '../constants';
import { Options } from 'amqplib';

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  total: number;
}

export interface Order {
  clientName: string;
  type: Types;
  city: string;
  email?: string;
  phone?: string;
  products: Product[];
  totalSum: number;
  deliveryAddress?: string;
}

export interface OrderWithPhone extends Order {
  phone: string;
}

export const isOrderWithPhone = (order: Order): order is OrderWithPhone => Boolean(order.phone);

export interface OrderWithEmail extends Order {
  email: string;
}

export const isOrderWithEmail = (order: Order): order is OrderWithPhone => Boolean(order.email);

export interface Message<O extends Order> {
  errors: string[];
  retry: number;
  order: O;
}

export interface OrderWithDeliveryAddress extends Order {
  deliveryAddress: string;
}

export const isOrderWithDeliveryAddress = (order: Order): order is OrderWithDeliveryAddress =>
  Boolean(order.deliveryAddress);

export interface FailOrder extends Message<Order> {
  exchange: string;
  routingKey: string;
}

export interface Queue {
  name: string;
  options: Options.AssertQueue;
}

export interface Exchange {
  name: string;
  type: ExchangeTypes;
}

export interface Binding {
  type: Types;
  destination: string;
  source: string;
  routingKey: string;
}

export interface PipelineConfig {
  queues: Queue[];
  exchanges: Exchange[];
  bindings: Binding[];
}
