<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { getProductById } from "../../../services/productService";
    import type { Product } from "../../../types/Product";

    let product: Product | null = null;
    let loading = true;
    let error = "";

    // 価格をフォーマットする関数
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY",
        }).format(price);
    };

    onMount(async () => {
        try {
            loading = true;
            const productId = Number($page.params.id);
            if (isNaN(productId)) {
                error = "無効な商品IDです。";
                return;
            }

            product = await getProductById(productId);
            if (!product) {
                error = "商品が見つかりませんでした。";
            }
        } catch (err) {
            error = "商品データの読み込み中にエラーが発生しました。";
            console.error(err);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    {#if product}
        <title>{product.name} | 農家と消費者をつなぐプラットフォーム</title>
        <meta name="description" content={product.description} />
    {:else}
        <title>商品詳細 | 農家と消費者をつなぐプラットフォーム</title>
        <meta
            name="description"
            content="農産物の詳細情報をご覧いただけます。"
        />
    {/if}
</svelte:head>

<div class="container mx-auto px-4 py-8">
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
            <a
                href="/products"
                class="inline-block mt-4 text-theme-accent dark:text-theme-accent hover:underline"
                >商品一覧に戻る</a
            >
        </div>
    {:else if product}
        <div>
            <!-- 戻るリンク -->
            <a
                href="/products"
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
                商品一覧に戻る
            </a>

            <!-- 商品詳細セクション -->
            <div
                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden mb-8"
            >
                <div class="p-6">
                    <div class="flex flex-col lg:flex-row">
                        <div class="lg:w-1/2 mb-6 lg:mb-0 lg:pr-6">
                            <div
                                class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-theme-hover dark:bg-theme-hover"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div class="lg:w-1/2">
                            <h1
                                class="text-3xl font-bold mb-4 text-theme-primary"
                            >
                                {product.name}
                            </h1>

                            <div class="flex flex-wrap gap-4 mb-4">
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
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        ></path>
                                    </svg>
                                    <span
                                        class="text-xl font-bold text-theme-accent"
                                        >{formatPrice(product.price)}</span
                                    >
                                </div>

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
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        ></path>
                                    </svg>
                                    <span
                                        >収穫時期: {product.harvestSeason}</span
                                    >
                                </div>
                            </div>

                            <div
                                class="prose dark:prose-invert max-w-none mb-6"
                            >
                                <h2
                                    class="text-xl font-semibold mb-2 text-theme-primary"
                                >
                                    商品説明
                                </h2>
                                <p
                                    class="text-theme-primary dark:text-theme-primary"
                                >
                                    {product.description}
                                </p>
                            </div>

                            {#if product.salesLocation}
                                <div class="mb-6">
                                    <h2
                                        class="text-xl font-semibold mb-2 text-theme-primary"
                                    >
                                        販売場所
                                    </h2>
                                    <div class="flex items-start">
                                        <svg
                                            class="w-5 h-5 mr-2 mt-0.5 text-theme-accent flex-shrink-0"
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
                                        <span
                                            class="text-theme-primary dark:text-theme-primary"
                                            >{product.salesLocation}</span
                                        >
                                    </div>
                                </div>
                            {/if}

                            <a
                                href={`/farmers/${product.farmerId}`}
                                class="inline-flex items-center px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-theme-accent-hover transition-colors"
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
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    ></path>
                                </svg>
                                この商品の農家を見る
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {#if product.videoUrl}
                <div class="mb-12">
                    <h2 class="text-2xl font-bold mb-4 text-theme-primary">
                        商品紹介動画
                    </h2>
                    <div
                        class="aspect-w-16 aspect-h-9 bg-theme-hover dark:bg-theme-hover rounded-lg overflow-hidden"
                    >
                        <iframe
                            src={product.videoUrl}
                            title={`${product.name}の紹介動画`}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                            class="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            {/if}

            {#if product.processVideos && product.processVideos.length > 0}
                <div class="mb-12">
                    <h2 class="text-2xl font-bold mb-6 text-theme-primary">
                        加工・調理動画
                    </h2>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {#each product.processVideos as video}
                            <div
                                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden"
                            >
                                <h3
                                    class="text-xl font-semibold p-4 text-theme-primary"
                                >
                                    {video.title}
                                </h3>
                                <div
                                    class="aspect-w-16 aspect-h-9 bg-theme-hover dark:bg-theme-hover"
                                >
                                    <iframe
                                        src={video.videoUrl}
                                        title={video.title}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                        class="w-full h-full"
                                    ></iframe>
                                </div>
                                <div class="p-4">
                                    <p
                                        class="text-theme-secondary dark:text-theme-secondary mb-4"
                                    >
                                        {video.description}
                                    </p>
                                    <div
                                        class="flex items-center text-theme-secondary dark:text-theme-secondary"
                                    >
                                        <svg
                                            class="w-5 h-5 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                            ></path>
                                        </svg>
                                        <span>{video.likes} いいね</span>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>
