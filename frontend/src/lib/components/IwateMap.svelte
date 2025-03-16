<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { Farmer } from "../types/Farmer";
    import { browser } from "$app/environment";
    import type { LatLngExpression, LatLngTuple } from "leaflet";

    export let farmers: Farmer[] = [];

    let mapContainer: HTMLElement;
    let map: any;
    let markers: any[] = [];
    let debug = "";
    let leafletModule: any = null;

    // 岩手県の中心座標（盛岡市付近）
    const IWATE_CENTER: LatLngTuple = [39.7036, 141.1527];
    const DEFAULT_ZOOM = 9;

    // デバッグ用の関数
    function logDebug(message: string) {
        console.log(`[IwateMap Debug] ${message}`);
        debug += message + "\n";
    }

    // カラーマーカーの生成（位置が識別しやすいようにランダムカラーを使用）
    function generateColorMarker(index: number) {
        if (!browser || !leafletModule) return null;

        try {
            // 農家ごとに異なる色のマーカーを使用
            const colors = [
                "#3388ff",
                "#33a02c",
                "#e31a1c",
                "#ff7f00",
                "#6a3d9a",
            ];
            const color = colors[index % colors.length];

            return leafletModule.divIcon({
                className: "bg-transparent border-0",
                html: `
                    <div class="w-6 h-6 rounded-full border-2 border-green-600/70 shadow-md" style="background-color: ${color};"></div>
                `,
                iconSize: [24, 24],
                iconAnchor: [12, 12],
                popupAnchor: [0, -12],
            });
        } catch (error) {
            logDebug(`カラーマーカー作成エラー: ${error}`);
            return null;
        }
    }

    // 農家のアイコンを使用したマーカーの生成
    function generateFarmerIcon(farmer: Farmer) {
        if (!browser || !leafletModule) return null;

        try {
            return leafletModule.divIcon({
                className: "bg-transparent border-0",
                html: `
                    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white ring-2 ring-green-600/70 bg-white shadow-lg">
                        <img src="${farmer.icon}" alt="${farmer.name}" class="w-full h-full object-cover" 
                             onerror="this.onerror=null; this.src='/images/default-farmer.jpg';">
                    </div>
                `,
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                popupAnchor: [0, -20],
            });
        } catch (error) {
            logDebug(`農家アイコン作成エラー: ${error}`);
            return null;
        }
    }

    // Leafletのデフォルトマーカーアイコン
    function getDefaultIcon() {
        if (!browser || !leafletModule) return null;

        try {
            return leafletModule.icon({
                iconUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                shadowUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41],
                shadowSize: [41, 41],
            });
        } catch (error) {
            logDebug(`デフォルトアイコン作成エラー: ${error}`);
            return null;
        }
    }

    onMount(async () => {
        if (!browser) return;

        logDebug(`マウント開始: 農家データ数=${farmers.length}`);

        try {
            // 動的にLeafletをインポート
            const L = await import("leaflet");
            leafletModule = L; // グローバル変数に保存
            logDebug("Leafletを読み込みました");

            // スタイルシートの読み込み
            if (!document.getElementById("leaflet-css")) {
                const linkEl = document.createElement("link");
                linkEl.id = "leaflet-css";
                linkEl.rel = "stylesheet";
                linkEl.href =
                    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(linkEl);
                logDebug("Leaflet CSSを追加しました");
            }

            // 地図の初期化
            map = L.map(mapContainer).setView(IWATE_CENTER, DEFAULT_ZOOM);
            logDebug("地図を初期化しました");

            // タイルレイヤーの追加（OpenStreetMap）
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            logDebug("タイルレイヤーを追加しました");

            // 岩手県の大まかな境界線を描画
            const iwateOutline: LatLngTuple[] = [
                [40.45, 141.3], // 北端
                [40.4, 142.0], // 北東
                [39.9, 142.1], // 東
                [39.0, 142.0], // 南東
                [38.75, 141.5], // 南
                [38.8, 140.8], // 南西
                [39.5, 140.6], // 西
                [40.2, 140.7], // 北西
                [40.45, 141.3], // 北端（閉じる）
            ];

            L.polyline(iwateOutline, {
                color: "rgba(0, 128, 0, 0.4)",
                weight: 1.5,
            }).addTo(map);
            logDebug("県境界線を描画しました");

            // 岩手県ラベルを追加
            L.marker(IWATE_CENTER, {
                icon: L.divIcon({
                    className: "bg-transparent border-0",
                    html: '<div class="text-2xl font-bold text-green-800 opacity-30">岩手県</div>',
                    iconSize: [100, 40],
                    iconAnchor: [50, 20],
                }),
            }).addTo(map);
            logDebug("県ラベルを追加しました");

            // 農家データをコンソールに出力（デバッグ用）
            console.log("マッピング用の農家データ:", JSON.stringify(farmers));
            logDebug(`農家データの数: ${farmers.length}`);

            // 農家データに緯度経度があるか確認
            const validFarmers = farmers.filter(
                (f) => f.latitude && f.longitude,
            );
            logDebug(`有効な位置情報を持つ農家の数: ${validFarmers.length}`);

            // 農家のマーカーを追加
            addFarmerMarkers();
        } catch (error) {
            logDebug(`初期化エラー: ${error}`);
            console.error("地図の初期化中にエラーが発生しました:", error);
        }
    });

    // 農家マーカーの追加
    function addFarmerMarkers() {
        if (!map || !browser || !leafletModule) {
            logDebug(
                "マップまたはブラウザが利用できないためマーカー追加をスキップします",
            );
            return;
        }

        try {
            // 古いマーカーを削除
            clearMarkers();
            logDebug("既存のマーカーをクリアしました");

            // 各農家のマーカーを追加
            farmers.forEach((farmer, index) => {
                if (farmer.latitude && farmer.longitude) {
                    try {
                        const position: LatLngTuple = [
                            farmer.latitude,
                            farmer.longitude,
                        ];
                        logDebug(
                            `マーカー${index + 1}を追加: ${farmer.name}, 位置: [${position}]`,
                        );

                        // 農家のアイコンを使用
                        const markerIcon = generateFarmerIcon(farmer);

                        if (!markerIcon) {
                            logDebug(
                                `マーカー${index + 1}のアイコン生成に失敗しました`,
                            );
                            return;
                        }

                        const marker = leafletModule
                            .marker(position, {
                                icon: markerIcon,
                            })
                            .addTo(map);

                        // ポップアップの追加
                        marker.bindPopup(`
                          <div class="p-2">
                            <div class="font-bold text-lg">${farmer.name}</div>
                            <div class="text-sm text-gray-600">${farmer.location || ""}</div>
                            <a href="/farmers/${farmer.id}" class="text-green-600 hover:underline mt-2 inline-block">詳細を見る</a>
                          </div>
                        `);

                        markers.push(marker);
                    } catch (err) {
                        logDebug(
                            `マーカー${index + 1}の追加中にエラー: ${err}`,
                        );
                    }
                } else {
                    logDebug(`農家ID${farmer.id}は位置情報がありません`);
                }
            });

            logDebug(`マーカー追加完了: ${markers.length}個のマーカー`);
        } catch (error) {
            logDebug(`マーカー追加中にエラー: ${error}`);
            console.error("マーカーの追加中にエラーが発生しました:", error);
        }
    }

    // マーカーのクリア
    function clearMarkers() {
        if (!map) return;

        markers.forEach((marker) => {
            map.removeLayer(marker);
        });
        markers = [];
    }

    // コンポーネント破棄時の処理
    onDestroy(() => {
        if (map && browser) {
            map.remove();
        }
    });

    // farmers配列が変更されたらマーカーを更新
    $: if (map && farmers && leafletModule) {
        logDebug(`農家データが更新されました: ${farmers.length}件`);
        addFarmerMarkers();
    }
</script>

<div
    class="iwate-map-container rounded-lg overflow-hidden shadow-lg bg-green-50 dark:bg-green-900/20"
>
    <div
        bind:this={mapContainer}
        class="map-element h-[500px] w-full border border-green-100 dark:border-green-700/30"
    ></div>

    {#if debug && false}
        <!-- デバッグモードがオンの場合のみ表示 -->
        <div
            class="bg-gray-100 p-2 mt-2 text-xs font-mono overflow-auto max-h-32"
        >
            <pre>{debug}</pre>
        </div>
    {/if}
</div>

<style>
    /* Leafletが必要とするスタイル */
    :global(.leaflet-control-attribution) {
        font-size: 10px;
    }

    /* Leafletのコントロールやボーダーを少し微調整 */
    :global(.leaflet-container) {
        border-radius: 0.5rem;
        background-color: rgba(110, 231, 183, 0.15); /* green-light の薄い版 */
    }

    :global(.leaflet-control) {
        border-radius: 0.25rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
</style>
