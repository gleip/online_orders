import { Types } from '../constants';

export default [
  {
    type: Types.EXCHANGE,
    destination: 'notify',
    source: 'postprocessing',
    routingKey: '#.notify.#',
  },
  {
    type: Types.EXCHANGE,
    destination: 'integrates',
    source: 'postprocessing',
    routingKey: '#.integrates.#',
  },
  {
    type: Types.QUEUE,
    destination: 'generateRoutingKey',
    source: 'postprocessing',
    routingKey: 'generateRoutingKey',
  },
  {
    type: Types.QUEUE,
    destination: 'sendSms',
    source: 'notify',
    routingKey: '#.sendSms.#',
  },
  {
    type: Types.QUEUE,
    destination: 'delivery',
    source: 'integrates',
    routingKey: '#.delivery.#',
  },
  {
    type: Types.QUEUE,
    destination: 'sendSmsHold',
    source: 'notify',
    routingKey: 'sendSmsHold',
  },
  {
    type: Types.QUEUE,
    destination: 'deliveryHold',
    source: 'integrates',
    routingKey: 'deliveryHold',
  },
];
