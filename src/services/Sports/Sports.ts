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

  async updateSport(id: string, sport: Sport): Promise<ResponseMessageType> {
    const data = {
      id: id,
      ...sport
    }
    return this.put<ResponseMessageType>(`sports/${id}`, data);
  }

  async deleteSport(id: string): Promise<ResponseMessageType> {
    return this.delete<ResponseMessageType>(`sports/${id}`)
  }
}


export default APISports;