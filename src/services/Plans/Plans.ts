import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { MessageType, Plan } from '../../typings/PlanTypes';
import type { ImageFile } from '@/typings/FileTypes';

class APIPlans extends APIBase {
  async getPlans(): Promise<Plan[]> {
    return this.get<Plan[]>('plans');
  }

  async createPlan(planData: Plan): Promise<Plan> {
    return this.post<Plan>('plan', planData)
  }

  async uploadPlanImage(file: File): Promise<AxiosResponse<ImageFile>> {
    const formData = new FormData();
    formData.append('planImage', file);
    return this.postWithFormData<AxiosResponse<ImageFile>>(`planImage`, formData);
  }

  async updatePlan(plan: Plan): Promise<MessageType> {
    return this.put<MessageType>(`plan/${plan._id}`, plan);
  }
}


export default APIPlans;