<script lang="ts">
    import { onMount } from "svelte";
    import type { Farmer } from "$lib/types/Farmer";
    import { getAllFarmers } from "$lib/api/farmerApi";
    import IwateMap from "$lib/components/IwateMap.svelte";

    let farmers: Farmer[] = [];
    let loading = true;
    let error = false;
    let debugMessage = "";

    function logDebug(message: string) {
        console.log(`[FarmersSection Debug] ${message}`);
        debugMessage += message + "\n";
    }

    // コンポーネントマウント時にAPIからデータを取得
    onMount(async () => {
        try {
            logDebug("農家データの取得を開始します");
            farmers = await getAllFarmers();
            logDebug(`${farmers.length}件の農家データを取得しました`);

            // 位置情報のデバッグ
            if (farmers.length > 0) {
                const withLocation = farmers.filter(
                    (f) => f.latitude && f.longitude,
                );
                logDebug(
                    `位置情報が設定されている農家: ${withLocation.length}/${farmers.length}`,
                );

                withLocation.forEach((farmer, i) => {
                    logDebug(
                        `農家${i + 1}: ${farmer.name}, 位置: [${farmer.latitude}, ${farmer.longitude}]`,
                    );
                });

                if (withLocation.length === 0) {
                    logDebug("警告: 位置情報が設定されている農家がありません");
                }

                // 農家データ全体をコンソールに出力（開発用）
                console.log("取得した農家データ:", JSON.stringify(farmers));
            }
        } catch (err) {
            console.error("農家データの取得に失敗しました:", err);
            logDebug(`エラー: ${err}`);
            error = true;
        } finally {
            loading = false;
        }
    });

    // 画像読み込みエラー時のハンドラー
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = "/images/default-farmer.jpg";
    }
</script>

<!-- 農家一覧セクション -->
<div class="container mx-auto px-4 md:px-6 max-w-5xl">
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-theme-primary">
            地元の農家たち
        </h2>
        <p class="text-theme-secondary max-w-2xl mx-auto">
            地域の豊かな食文化を支える農家の方々をご紹介します。それぞれが独自のこだわりを持ち、安全で美味しい農作物を育てています。
        </p>
    </div>

    <!-- 開発者用デバッグ情報 -->
    {#if debugMessage && false}
        <!-- 本番環境では非表示 -->
        <div
            class="bg-gray-100 dark:bg-gray-800 p-4 mb-6 rounded-lg text-xs font-mono max-h-40 overflow-auto"
        >
            <h3 class="font-bold mb-2">デバッグ情報:</h3>
            <pre>{debugMessage}</pre>
        </div>
    {/if}

    <!-- 岩手県地図 -->
    {#if !loading && !error && farmers.length > 0}
        <div class="mb-12">
            <h3 class="text-2xl font-bold mb-4 text-theme-primary text-center">
                岩手県の農家マップ
            </h3>
            <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg">
                <IwateMap {farmers} />
            </div>
            <p
                class="text-sm text-center mt-3 text-gray-500 dark:text-gray-400"
            >
                マップ上のマーカーをクリックすると農家の詳細が表示されます
            </p>
        </div>
    {/if}

    <!-- レンダリングエラー時 -->
    {#if error}
        <div class="text-center">
            <p class="text-red-500 mb-4">エラーが発生しました: {error}</p>
            <button
                class="px-4 py-2 bg-theme-primary-light dark:bg-theme-primary hover:bg-opacity-90 text-white rounded"
                onclick={() => window.location.reload()}>再読み込み</button
            >
        </div>
        <!-- データロード中 -->
    {:else if loading}
        <div class="spinner"></div>
        <!-- 農家データなし -->
    {:else if farmers.length === 0}
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>表示できる農家データがありません。</p>
        </div>
        <!-- 農家データあり -->
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each farmers as farmer}
                <div
                    class="bg-theme-secondary dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-100 dark:border-gray-700"
                >
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div
                                class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4 border-2 border-theme-accent dark:border-green-600 shadow-md"
                            >
                                <img
                                    src={farmer.icon}
                                    alt="{farmer.name}のプロフィール画像"
                                    class="w-full h-full object-cover"
                                    onerror={handleImageError}
                                />
                            </div>
                            <h3
                                class="text-xl font-semibold text-theme-primary dark:text-gray-100"
                            >
                                {farmer.name}
                            </h3>
                        </div>

                        <!-- 位置情報があれば表示 -->
                        {#if farmer.location}
                            <p
                                class="text-sm text-gray-500 dark:text-gray-400 mb-2"
                            >
                                <span class="inline-flex items-center">
                                    <svg
                                        class="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                    {farmer.location}
                                </span>
                            </p>
                        {/if}

                        <!-- デバッグ用：座標情報の表示 -->
                        {#if farmer.latitude && farmer.longitude && false}
                            <p class="text-xs text-red-500 mb-2">
                                位置: [{farmer.latitude}, {farmer.longitude}]
                            </p>
                        {/if}

                        <p
                            class="text-theme-secondary dark:text-gray-300 mb-4 line-clamp-3"
                        >
                            {farmer.description}
                        </p>
                        {#if farmer.products && farmer.products.length > 0}
                            <div class="mb-4">
                                <h4
                                    class="font-medium mb-2 text-theme-primary dark:text-gray-200"
                                >
                                    主な農作物:
                                </h4>
                                <div class="flex flex-wrap gap-2">
                                    {#each farmer.products as product}
                                        <span
                                            class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm"
                                            >{product}</span
                                        >
                                    {/each}
                                </div>
                            </div>
                        {/if}
                        <a
                            href="/farmers/{farmer.id}"
                            class="inline-flex items-center text-theme-accent dark:text-green-400 hover:underline hover:text-green-700 dark:hover:text-green-300 transition-colors"
                        >
                            詳細を見る
                            <svg
                                class="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .spinner {
        margin: 2rem auto;
        width: 50px;
        height: 50px;
        border: 3px solid rgba(0, 128, 0, 0.1);
        border-radius: 50%;
        border-top-color: #4ade80;
        animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
