import { API_BASE_URL } from '../config';
import type { Product } from '../types/Product';

/**
 * 全商品を取得する
 * @returns 商品の配列
 */
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('商品データの取得に失敗しました:', error);
    return [];
  }
};

/**
 * 指定されたIDの商品を取得する
 * @param id 商品ID
 * @returns 商品データ
 */
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`商品ID ${id} の取得に失敗しました:`, error);
    return null;
  }
};

/**
 * 指定された農家の商品を取得する
 * @param farmerId 農家ID
 * @returns 商品の配列
 */
export const getProductsByFarmerId = async (farmerId: number): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/farmers/${farmerId}/products`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`農家ID ${farmerId} の商品取得に失敗しました:`, error);
    return [];
  }
}; 