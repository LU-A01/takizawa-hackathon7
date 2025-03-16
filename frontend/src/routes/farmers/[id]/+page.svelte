<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { getFarmerById } from "$lib/api/farmerApi";
    import { getProductsByFarmerId } from "../../../services/productService";
    import type { Farmer } from "$lib/types/Farmer";
    import type { Product } from "../../../types/Product";
    import ProductCard from "../../../components/ProductCard.svelte";

    // モックデータ（後でAPI呼び出しに置き換え）
    let farmer = $state<Farmer>({
        id: 0,
        name: "",
        icon: "",
        description: "",
        products: [],
    });

    let products = $state<Product[]>([]);
    let loading = $state(true);
    let error = $state("");

    // ページパラメーターからIDを取得
    const farmerId = $page.params.id;

    onMount(async () => {
        try {
            loading = true;
            // APIから農家データを取得
            const farmerData = await getFarmerById(Number(farmerId));

            if (farmerData) {
                farmer = farmerData;

                // APIから商品データを取得
                products = await getProductsByFarmerId(Number(farmerId));
            } else {
                error = `農家ID ${farmerId} のデータが見つかりませんでした`;
                console.error(error);
            }
        } catch (err) {
            error = "データの取得中にエラーが発生しました";
            console.error("データの取得中にエラーが発生しました:", err);
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

<svelte:head>
    <title>{farmer.name} | 農家プロフィール</title>
    <meta
        name="description"
        content="{farmer.name}のプロフィールページ。農作物情報やこだわりを紹介しています。"
    />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- 戻るリンク -->
    <a
        href="/"
        class="inline-flex items-center text-theme-accent dark:text-theme-accent hover:underline mb-6"
    >
        <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
        </svg>
        トップページに戻る
    </a>

    <!-- 農家プロフィールセクション -->
    <div
        class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden mb-8"
    >
        <div class="p-6">
            <div class="flex flex-col md:flex-row">
                <div
                    class="md:w-1/4 flex justify-center md:justify-start mb-6 md:mb-0"
                >
                    <div
                        class="w-32 h-32 rounded-full bg-theme-hover dark:bg-theme-hover overflow-hidden"
                    >
                        <img
                            src={farmer.icon}
                            alt="{farmer.name}のプロフィール画像"
                            class="w-full h-full object-cover"
                            onerror={handleImageError}
                        />
                    </div>
                </div>
                <div class="md:w-3/4">
                    <h1 class="text-3xl font-bold mb-4 text-theme-primary">
                        {farmer.name}
                    </h1>
                    <div class="mb-4">
                        <div class="flex flex-wrap gap-4 mb-4">
                            {#if farmer.location}
                                <div
                                    class="flex items-center text-theme-secondary dark:text-theme-secondary"
                                >
                                    <svg
                                        class="w-5 h-5 mr-2"
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
                                    <span>{farmer.location}</span>
                                </div>
                            {/if}
                            {#if farmer.establishedYear}
                                <div
                                    class="flex items-center text-theme-secondary dark:text-theme-secondary"
                                >
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                    <span>創業: {farmer.establishedYear}年</span
                                    >
                                </div>
                            {/if}
                            {#if farmer.farmSize}
                                <div
                                    class="flex items-center text-theme-secondary dark:text-theme-secondary"
                                >
                                    <svg
                                        class="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
                                        ></path>
                                    </svg>
                                    <span>農場規模: {farmer.farmSize}</span>
                                </div>
                            {/if}
                        </div>
                        {#if farmer.certifications && farmer.certifications.length > 0}
                            <div class="mb-4">
                                <h3 class="text-lg font-medium mb-2">
                                    認証・取得資格
                                </h3>
                                <div class="flex flex-wrap gap-2">
                                    {#each farmer.certifications as cert}
                                        <span
                                            class="px-3 py-1 bg-theme-accent/20 dark:bg-theme-accent/30 text-theme-accent dark:text-theme-accent rounded-full text-sm"
                                            >{cert}</span
                                        >
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    </div>
                    <div class="prose dark:prose-invert max-w-none">
                        <h2
                            class="text-xl font-semibold mb-2 text-theme-primary"
                        >
                            自己紹介
                        </h2>
                        <p class="text-theme-primary dark:text-theme-primary">
                            {farmer.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 商品セクション -->
    <section class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-theme-primary">
            {farmer.name}の商品
        </h2>

        {#if loading}
            <div
                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg p-6 text-center"
            >
                <p>商品データを読み込み中...</p>
            </div>
        {:else if error}
            <div
                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg p-6 text-center text-red-500"
            >
                <p>{error}</p>
            </div>
        {:else if products.length === 0}
            <div
                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg p-6 text-center"
            >
                <p>現在取り扱っている商品はありません。</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each products as product (product.id)}
                    <div class="h-full">
                        <ProductCard {product} />
                    </div>
                {/each}
            </div>
        {/if}
    </section>
</div>

<style>
    /* 既存のスタイルはそのまま */
</style>
