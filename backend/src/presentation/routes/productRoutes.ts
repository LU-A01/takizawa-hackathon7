import { Hono } from 'hono';
import { ProductController } from '../controllers/ProductController';
import { ProductRepositoryImpl } from '../../infrastructure/repositories/ProductRepositoryImpl';

export const productRoutes = (app: Hono) => {
  const productRepository = new ProductRepositoryImpl();
  const productController = new ProductController(productRepository);

  // 全商品の取得
  app.get('/api/products', (c) => productController.getAllProducts(c));

  // IDによる商品の取得
  app.get('/api/products/:id', (c) => productController.getProductById(c));

  // 農家IDによる商品の取得
  app.get('/api/farmers/:farmerId/products', (c) => productController.getProductsByFarmerId(c));

  return app;
}; 