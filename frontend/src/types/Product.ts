/**
 * 加工動画の型定義
 */
export interface ProcessVideo {
  id: number;
  title: string;
  videoUrl: string;
  description: string;
  likes: number;
}

/**
 * 商品の型定義
 */
export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  harvestSeason: string;
  price: number;
  videoUrl: string;
  farmerId: number;
  salesLocation?: string;
  processVideos?: ProcessVideo[];
} 