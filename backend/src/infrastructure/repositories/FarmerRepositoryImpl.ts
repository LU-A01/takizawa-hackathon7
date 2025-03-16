import type { Farmer } from '../../domain/models/Farmer';
import type { FarmerRepository } from '../../domain/repositories/FarmerRepository';
import { mockFarmers } from '../data/mockFarmers';

/**
 * 農家データリポジトリの実装クラス
 * モックデータを使用してFarmerRepositoryインターフェースを実装
 */
export class FarmerRepositoryImpl implements FarmerRepository {
  /**
   * すべての農家データを取得する
   * @returns 農家データの配列
   */
  async getAllFarmers(): Promise<Farmer[]> {
    // 実際のアプリケーションではデータベースから取得する
    return mockFarmers;
  }

  /**
   * 指定されたIDの農家データを取得する
   * @param id 農家のID
   * @returns 農家データ、見つからない場合はnull
   */
  async getFarmerById(id: number): Promise<Farmer | null> {
    // 実際のアプリケーションではデータベースから取得する
    const farmer = mockFarmers.find(farmer => farmer.id === id);
    return farmer || null;
  }
} 