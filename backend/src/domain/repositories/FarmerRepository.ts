import type { Farmer } from '../models/Farmer';

/**
 * 農家データへのアクセスを提供するリポジトリのインターフェース
 */
export interface FarmerRepository {
  /**
   * すべての農家データを取得する
   * @returns 農家データの配列
   */
  getAllFarmers(): Promise<Farmer[]>;

  /**
   * 指定されたIDの農家データを取得する
   * @param id 農家のID
   * @returns 農家データ、見つからない場合はnull
   */
  getFarmerById(id: number): Promise<Farmer | null>;
} 