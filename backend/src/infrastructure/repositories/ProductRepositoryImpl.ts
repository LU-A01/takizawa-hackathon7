import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import type { Product } from '../../domain/models/Product';
import { mockProducts } from '../data/mockProducts';

/**
 * 商品リポジトリの実装クラス
 */
export class ProductRepositoryImpl implements ProductRepository {
  /**
   * 全ての商品を取得する
   */
  async getAllProducts(): Promise<Product[]> {
    return mockProducts;
  }

  /**
   * 指定されたIDの商品を取得する
   * @param id 商品ID
   */
  async getProductById(id: number): Promise<Product | null> {
    const product = mockProducts.find(product => product.id === id);
    return product || null;
  }

  /**
   * 指定された農家の商品を取得する
   * @param farmerId 農家ID
   */
  async getProductsByFarmerId(farmerId: number): Promise<Product[]> {
    // farmerId に基づいて商品をフィルタリング
    // このサンプルでは、農家IDに基づいて商品を手動でマッピング
    switch (farmerId) {
      case 1:
        return mockProducts.filter(product => [1, 2, 3].includes(product.id));
      case 2:
        return mockProducts.filter(product => [4, 5, 6].includes(product.id));
      case 3:
        return mockProducts.filter(product => [7, 8, 9].includes(product.id));
      default:
        return [];
    }
  }
} 