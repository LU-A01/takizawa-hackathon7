import type { Context } from 'hono';
import type { FarmerRepository } from '../../domain/repositories/FarmerRepository';

/**
 * 農家データに関連するリクエストを処理するコントローラー
 */
export class FarmerController {
  private farmerRepository: FarmerRepository;

  /**
   * コンストラクタ
   * @param farmerRepository 農家データのリポジトリ
   */
  constructor(farmerRepository: FarmerRepository) {
    this.farmerRepository = farmerRepository;
  }

  /**
   * すべての農家データを取得する
   * @param c Hono Context オブジェクト
   */
  async getAllFarmers(c: Context): Promise<Response> {
    try {
      const farmers = await this.farmerRepository.getAllFarmers();
      return c.json(farmers, 200);
    } catch (error) {
      console.error('農家データの取得中にエラーが発生しました:', error);
      return c.json({ message: '内部サーバーエラーが発生しました' }, 500);
    }
  }

  /**
   * 指定されたIDの農家データを取得する
   * @param c Hono Context オブジェクト
   */
  async getFarmerById(c: Context): Promise<Response> {
    try {
      const id = parseInt(c.req.param('id'), 10);
      if (isNaN(id)) {
        return c.json({ message: '無効なIDです' }, 400);
      }

      const farmer = await this.farmerRepository.getFarmerById(id);
      if (!farmer) {
        return c.json({ message: '農家が見つかりませんでした' }, 404);
      }

      return c.json(farmer, 200);
    } catch (error) {
      console.error('農家データの取得中にエラーが発生しました:', error);
      return c.json({ message: '内部サーバーエラーが発生しました' }, 500);
    }
  }
} 