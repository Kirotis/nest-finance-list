import { Types } from 'mongoose';
import { Plan } from 'src/repository';

export type PlanView = Plan & {
  id: Types.ObjectId;
  logCount?: number;
  currentMoney?: number;
};
