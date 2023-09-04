import APIBase from '../Base';
import type { Plan } from '../../typings/PlanTypes';
import type { ImageFile } from '@/typings/FileTypes';

class APIPlans extends APIBase {
  async getPlans(): Promise<Plan[]> {
    return this.get<Plan[]>('plans');
  }

  async createPlan(planData: Plan): Promise<Plan> {
    return this.post<Plan>('plan', planData)
  }

  async uploadPlanImage(file: File): Promise<ImageFile> {
    const formData = new FormData();
    formData.append('planImage', file);
    return this.postWithFormData<ImageFile>(`planImage`, formData);
  } 
}


export default APIPlans;