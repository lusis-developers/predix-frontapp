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

  async updatePlan(id: string, plan: Plan): Promise<MessageType> {
    return this.put<MessageType>(`plan/${id}`, plan);
  }

  async deletePlan(id: string): Promise<MessageType> {
    return this.delete<MessageType>(`plan/${id}`)
  }
}


export default APIPlans;