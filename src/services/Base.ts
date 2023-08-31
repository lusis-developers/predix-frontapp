import axios, { AxiosResponse } from 'axios';

class APIBase {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_PREDIX_API || 'http://localhost:8000/api';
  }

  private buildUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`;
  }

  protected async get<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`GET request to ${url} failed: ${error.message}`);
    }
  }

  protected async post<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST request to ${url} failed: ${error.message}`);
    }
  }

  protected async put<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.put(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`PUT request to ${url} failed: ${error.message}`);
    }
  }

  protected async patch<T>(endpoint: string, data: any): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.patch(url, data);
      return response.data;
    } catch (error) {
      throw new Error(`PATCH request to ${url} failed: ${error.message}`);
    }
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    const url = this.buildUrl(endpoint);
    try {
      const response: AxiosResponse<T> = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(`DELETE request to ${url} failed: ${error.message}`);
    }
  }
}

export default APIBase;