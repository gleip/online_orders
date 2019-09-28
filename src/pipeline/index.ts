import { PipelineConfig } from '../interfaces';
import exchanges from './exchanges';
import queues from './queues';
import bindings from './bindigs';

export const pipelineConfig: PipelineConfig = {
  exchanges,
  queues,
  bindings,
};
