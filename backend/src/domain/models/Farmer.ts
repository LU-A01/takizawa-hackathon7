/**
 * 農家のデータモデルを定義するインターフェース
 */
export interface Farmer {
  /** 農家のID */
  id: number;
  /** 農家の名前 */
  name: string;
  /** アイコン画像のパス */
  icon: string;
  /** 農家の説明 */
  description: string;
  /** 農家の所在地 */
  location?: string;
  /** 緯度 */
  latitude?: number;
  /** 経度 */
  longitude?: number;
  /** 創業年 */
  establishedYear?: number;
  /** 農場規模 */
  farmSize?: string;
  /** 取得認証・資格 */
  certifications?: string[];
  /** 生産している農作物のリスト */
  products?: string[];
} 