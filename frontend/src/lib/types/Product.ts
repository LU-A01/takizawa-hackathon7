/**
 * 農作物のデータモデルを定義するインターフェース
 */
export interface Product {
  /** 商品のID */
  id: number;
  /** 商品名 */
  name: string;
  /** 商品画像のパス */
  image: string;
  /** 商品の説明 */
  description: string;
  /** 収穫時期 */
  harvestSeason: string;
  /** 価格の目安 */
  price: string;
  /** 紹介動画のURL */
  videoUrl: string;
  /** 栽培過程の動画 */
  processVideos?: ProcessVideo[];
  /** 農家のID */
  farmerId: number;
}

/**
 * 栽培過程の動画モデル
 */
export interface ProcessVideo {
  /** 動画ID */
  id: number;
  /** タイトル */
  title: string;
  /** 動画URL */
  videoUrl: string;
  /** 説明 */
  description: string;
  /** いいね数 */
  likes: number;
} 