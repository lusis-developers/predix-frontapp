import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { Plan } from '../../typings/PlanTypes';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { ImageFile } from '@/typings/FileTypes';

class APIPlans extends APIBase {
  async getPlans(): Promise<Plan[]> {
    return this.get<Plan[]>('plans');
  }

  async createPlan(planData: Plan): Promise<Plan> {
    return this.post<Plan>('plans', planData)
  }

  async uploadPlanImage(file: File): Promise<AxiosResponse<ImageFile>> {
    const formData = new FormData();
    formData.append('planImage', file);
    return this.postWithFormData<AxiosResponse<ImageFile>>(`planImage`, formData);
  }

  async updatePlan(id: string, plan: Plan): Promise<ResponseMessageType> {
    return this.put<ResponseMessageType>(`plans/${id}`, plan);
  }

  async deletePlan(id: string): Promise<ResponseMessageType> {
    return this.delete<ResponseMessageType>(`plans/${id}`)
  }
}


export default APIPlans;