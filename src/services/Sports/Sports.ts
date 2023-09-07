import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { ImageFile } from '@/typings/FileTypes';
import type { Sport } from '@/typings/SportTypes';

class APISports extends APIBase {
  async getSports(): Promise<Sport[]> {
    return this.get<Sport[]>('sports');
  }

  async createSport(sport: Sport): Promise<Sport> {
    return this.post<Sport>('sports', sport)
  }

  async uploadSportImage(file: File): Promise<AxiosResponse<ImageFile>> {
    const formData = new FormData();
    formData.append('sportImage', file);
    return this.postWithFormData<AxiosResponse<ImageFile>>(`sportImage`, formData);
  }

  // async updatePlan(id: string, plan: Plan): Promise<MessageType> {
  //   return this.put<MessageType>(`plan/${id}`, plan);
  // }

  // async deletePlan(id: string): Promise<MessageType> {
  //   return this.delete<MessageType>(`plan/${id}`)
  // }
}


export default APISports;