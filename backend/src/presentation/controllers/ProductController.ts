import type { Context } from 'hono';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';

/**
 * 商品関連のコントローラー
 */
export class ProductController {
  private productRepository: ProductRepository;

  /**
   * コンストラクタ
   * @param productRepository 商品リポジトリ
   */
  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  /**
   * 全商品を取得する
   * @param c コンテキスト
   * @returns レスポンス
   */
  async getAllProducts(c: Context) {
    try {
      const products = await this.productRepository.getAllProducts();
      return c.json(products);
    } catch (error) {
      console.error('Error fetching all products:', error);
      return c.json({ error: 'Failed to fetch products' }, 500);
    }
  }

  /**
   * 指定されたIDの商品を取得する
   * @param c コンテキスト
   * @returns レスポンス
   */
  async getProductById(c: Context) {
    try {
      const id = Number(c.req.param('id'));
      if (isNaN(id)) {
        return c.json({ error: 'Invalid product ID' }, 400);
      }

      const product = await this.productRepository.getProductById(id);
      if (!product) {
        return c.json({ error: 'Product not found' }, 404);
      }

      return c.json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return c.json({ error: 'Failed to fetch product' }, 500);
    }
  }

  /**
   * 指定された農家の商品を取得する
   * @param c コンテキスト
   * @returns レスポンス
   */
  async getProductsByFarmerId(c: Context) {
    try {
      const farmerId = Number(c.req.param('farmerId'));
      if (isNaN(farmerId)) {
        return c.json({ error: 'Invalid farmer ID' }, 400);
      }

      const products = await this.productRepository.getProductsByFarmerId(farmerId);
      return c.json(products);
    } catch (error) {
      console.error('Error fetching products by farmer ID:', error);
      return c.json({ error: 'Failed to fetch products' }, 500);
    }
  }
} 