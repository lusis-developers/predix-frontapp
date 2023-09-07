import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { Sport } from '@/typings/SportTypes';
import type { ImageFile } from '@/typings/FileTypes';

class APISports extends APIBase {
  async getSports(): Promise<Sport[]> {
    return this.get<Sport[]>('sports');
  }

  // async createSport(planData: Plan): Promise<Plan> {
  //   return this.post<Plan>('plan', planData)
  // }

  // async uploadSportImage(file: File): Promise<AxiosResponse<ImageFile>> {
  //   const formData = new FormData();
  //   formData.append('planImage', file);
  //   return this.postWithFormData<AxiosResponse<ImageFile>>(`planImage`, formData);
  // }

  // async updatePlan(id: string, plan: Plan): Promise<MessageType> {
  //   return this.put<MessageType>(`plan/${id}`, plan);
  // }

  // async deletePlan(id: string): Promise<MessageType> {
  //   return this.delete<MessageType>(`plan/${id}`)
  // }
}


export default APISports;