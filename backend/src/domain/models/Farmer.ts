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
  /** 生産している農作物のリスト */
  products: string[];
} 