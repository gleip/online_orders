import { Pipeline } from './Pipeline';
import { pipelineConfig } from './pipeline';
import { GenerateRoutingKey } from './workers/GenerateRoutingKey';
import { SendSms } from './workers/SendSms';
import { Delivery } from './workers/Delivery';

(async () => {
  try {
    const pipeline = new Pipeline(pipelineConfig);
    const generateRoutingKey = new GenerateRoutingKey();
    const sendSms = new SendSms();
    const delivery = new Delivery();
    await pipeline.create();
    await Promise.all([generateRoutingKey.subscribe(), sendSms.subscribe(), delivery.subscribe()]);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
