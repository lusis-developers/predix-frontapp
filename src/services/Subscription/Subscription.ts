import { AxiosResponse } from 'axios';

import APIBase from '../Base';

class APISubscription extends APIBase {
  async updateSubscription(planId: string): Promise<AxiosResponse> {
    return this.patch(`subscription`, { planId });
  }

  async removeSubscription(planId: string): Promise<AxiosResponse> {
    return this.patch(`remove-subscription`, { planId });
  }
}


export default APISubscription;