export enum Types {
  NEW = 'new',
  UPDATE = 'update',
  CANCEL = 'cancel'
}

export enum Keys {
  SEND_SMS = 'notify.sendSms',
  SEND_TO_DELIVERY = 'integrates.delivery',
  HOLD = 'hold'
}

export enum Types {
  QUEUE = 'queue',
  EXCHANGE = 'exchange',
}

export enum ExchangeTypes {
  TOPIC = 'topic',
  DIRECT = 'direct',
  HEADERS = 'headers',
  FANOUT = 'fanout',
}