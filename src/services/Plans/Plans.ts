import APIBase from '../Base';
import type { Plan } from '../../typings/PlanTypes';

class APIPlans extends APIBase {
  async getPlans(): Promise<Plan[]> {
    return this.get<Plan[]>('plans');
  }
}


export default APIPlans;