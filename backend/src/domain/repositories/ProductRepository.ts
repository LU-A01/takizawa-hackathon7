import type { Product } from '../models/Product';

/**
 * 商品データのリポジトリインターフェース
 */
export interface ProductRepository {
  /**
   * 全ての商品を取得する
   */
  getAllProducts(): Promise<Product[]>;

  /**
   * 指定されたIDの商品を取得する
   * @param id 商品ID
   */
  getProductById(id: number): Promise<Product | null>;

  /**
   * 指定された農家の商品を取得する
   * @param farmerId 農家ID
   */
  getProductsByFarmerId(farmerId: number): Promise<Product[]>;
} 