export type Plan = {
  name: string;
  description: string;
  price: number;
  image: string
}

export interface ImageResponse {
  data: {
    url: string;
    name: string;
  }
}