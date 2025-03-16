import type { Farmer } from '$lib/types/Farmer';

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * すべての農家データを取得する
 * @returns 農家データの配列
 */
export async function getAllFarmers(): Promise<Farmer[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/farmers`);

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('農家データの取得中にエラーが発生しました:', error);
    // 開発環境では静的データにフォールバック（本番環境ではより適切なエラーハンドリングが必要）
    return [];
  }
}

/**
 * 指定されたIDの農家データを取得する
 * @param id 農家のID
 * @returns 農家データ
 */
export async function getFarmerById(id: number): Promise<Farmer | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/farmers/${id}`);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`ID ${id} の農家データの取得中にエラーが発生しました:`, error);
    return null;
  }
} 