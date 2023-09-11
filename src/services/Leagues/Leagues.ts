import { AxiosResponse } from 'axios';

import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { ImageFile } from '@/typings/FileTypes';
import type { League } from '@/typings/LeagueTypes';

class APILeagues extends APIBase {
  async getLeagues(): Promise<League[]> {
    return this.get<League[]>('leagues');
  }

  async createLeagues(league: League): Promise<League> {
    return this.post<League>('leagues', league)
  }

  async uploadLeagueImage(file: File): Promise<AxiosResponse<ImageFile>> {
    const formData = new FormData();
    formData.append('leagueImage', file);
    return this.postWithFormData<AxiosResponse<ImageFile>>(`leagueImage`, formData);
  }

  async updateLeague(id: string, league: League): Promise<ResponseMessageType> {
    const data = {
      id: id,
      ...league
    }
    return this.put<ResponseMessageType>(`leagues/${id}`, data);
  }

  async deleteLeague(id: string): Promise<ResponseMessageType> {
    return this.delete<ResponseMessageType>(`leagues/${id}`)
  }
}


export default APILeagues;