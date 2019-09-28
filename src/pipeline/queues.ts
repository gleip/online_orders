export default [
  {
    name: 'generateRoutingKey',
    options: {
      durable: true,
    },
  },
  {
    name: 'sendSms',
    options: {
      durable: true,
    },
  },
  {
    name: 'delivery',
    options: {
      durable: true,
    },
  },
  {
    name: 'sendSmsHold',
    options: {
      durable: true,
      deadLetterExchange: 'notify',
      deadLetterRoutingKey: 'sendSms',
      messageTtl: 60000,
    },
  },
  {
    name: 'deliveryHold',
    options: {
      durable: true,
      deadLetterExchange: 'integrates',
      deadLetterRoutingKey: 'delivery',
      messageTtl: 60000,
    },
  },
];
