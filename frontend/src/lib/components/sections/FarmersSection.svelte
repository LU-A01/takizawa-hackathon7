<script lang="ts">
    import { onMount } from "svelte";
    import type { Farmer } from "$lib/types/Farmer";
    import { getAllFarmers } from "$lib/api/farmerApi";

    let farmers: Farmer[] = [];
    let loading = true;
    let error = false;

    // コンポーネントマウント時にAPIからデータを取得
    onMount(async () => {
        try {
            farmers = await getAllFarmers();
        } catch (err) {
            console.error("農家データの取得に失敗しました:", err);
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

    {#if loading}
        <div class="flex justify-center items-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-accent"
            ></div>
        </div>
    {:else if error}
        <div class="text-center py-8 text-red-500">
            <p>農家データの読み込み中にエラーが発生しました。</p>
            <button
                class="mt-4 px-4 py-2 bg-theme-accent text-white rounded-md hover:bg-theme-accent-hover"
                on:click={() => window.location.reload()}>再読み込み</button
            >
        </div>
    {:else if farmers.length === 0}
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>表示できる農家データがありません。</p>
        </div>
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
                                    on:error={handleImageError}
                                />
                            </div>
                            <h3
                                class="text-xl font-semibold text-theme-primary dark:text-gray-100"
                            >
                                {farmer.name}
                            </h3>
                        </div>
                        <p
                            class="text-theme-secondary dark:text-gray-300 mb-4 line-clamp-3"
                        >
                            {farmer.description}
                        </p>
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
