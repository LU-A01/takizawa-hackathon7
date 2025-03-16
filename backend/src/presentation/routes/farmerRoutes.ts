import { Hono } from 'hono';
import { FarmerController } from '../controllers/FarmerController';
import { FarmerRepositoryImpl } from '../../infrastructure/repositories/FarmerRepositoryImpl';

/**
 * 農家データのAPIルートを設定する
 * @returns Hono アプリインスタンス
 */
export function setupFarmerRoutes(): Hono {
  const app = new Hono();
  const farmerRepository = new FarmerRepositoryImpl();
  const farmerController = new FarmerController(farmerRepository);

  // すべての農家データを取得するエンドポイント
  app.get('/farmers', (c) => farmerController.getAllFarmers(c));

  // IDによる農家データを取得するエンドポイント
  app.get('/farmers/:id', (c) => farmerController.getFarmerById(c));

  return app;
} 