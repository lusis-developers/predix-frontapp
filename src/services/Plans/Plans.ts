import APIBase from '../Base';
import type { Plan, ImageResponse } from '../../typings/PlanTypes';

class APIPlans extends APIBase {
  async getPlans(): Promise<Plan[]> {
    return this.get<Plan[]>('plans');
  }

  async uploadImage(imageFile: string): Promise <ImageResponse> {
    const formData = new FormData();
    formData.append('planImage', imageFile);
    return this.post<ImageResponse>('planImage', formData);
  }

  async createPlan(planData: Plan): Promise<Plan> {
    return this.post<Plan>('plan', planData)
  }
}


export default APIPlans;