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

<div class="container">
    {#if loading}
        <div class="loading">
            <p>商品データを読み込み中...</p>
        </div>
    {:else if error}
        <div class="error">
            <p>{error}</p>
            <a href="/products" class="back-button">商品一覧に戻る</a>
        </div>
    {:else if product}
        <div class="product-detail">
            <div class="product-header">
                <a href="/products" class="back-link">← 商品一覧に戻る</a>
                <h1>{product.name}</h1>
            </div>

            <div class="product-content">
                <div class="product-image">
                    <img src={product.image} alt={product.name} />
                </div>

                <div class="product-info">
                    <div class="price-section">
                        <h2>価格</h2>
                        <p class="price">{formatPrice(product.price)}</p>
                    </div>

                    <div class="season-section">
                        <h2>収穫時期</h2>
                        <p>{product.harvestSeason}</p>
                    </div>

                    <div class="description-section">
                        <h2>商品説明</h2>
                        <p>{product.description}</p>
                    </div>

                    {#if product.salesLocation}
                        <div class="location-section">
                            <h2>販売場所</h2>
                            <p class="sales-location">
                                <svg
                                    class="location-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path
                                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                                    ></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                {product.salesLocation}
                            </p>
                        </div>
                    {/if}

                    <a
                        href={`/farmers/${product.farmerId}`}
                        class="farmer-link"
                    >
                        この商品の農家を見る
                    </a>
                </div>
            </div>

            {#if product.videoUrl}
                <div class="video-section">
                    <h2>商品紹介動画</h2>
                    <div class="video-container">
                        <iframe
                            src={product.videoUrl}
                            title={`${product.name}の紹介動画`}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </div>
                </div>
            {/if}

            {#if product.processVideos && product.processVideos.length > 0}
                <div class="process-videos">
                    <h2>加工・調理動画</h2>
                    <div class="videos-grid">
                        {#each product.processVideos as video (video.id)}
                            <div class="video-card">
                                <h3>{video.title}</h3>
                                <div class="video-container">
                                    <iframe
                                        src={video.videoUrl}
                                        title={video.title}
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen
                                    ></iframe>
                                </div>
                                <p>{video.description}</p>
                                <div class="likes">
                                    <span>👍 {video.likes}</span>
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .loading,
    .error {
        text-align: center;
        padding: 2rem;
        background-color: var(--color-card-bg);
        border-radius: 8px;
        margin: 2rem 0;
    }

    .error {
        color: var(--color-error);
    }

    .back-button,
    .back-link {
        display: inline-block;
        margin-top: 1rem;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 500;
    }

    .back-link {
        margin-bottom: 1rem;
    }

    .product-header {
        margin-bottom: 2rem;
    }

    h1 {
        font-size: 2rem;
        color: var(--color-text-primary);
        margin: 0.5rem 0 1rem;
    }

    h2 {
        font-size: 1.2rem;
        color: var(--color-text-primary);
        margin: 1rem 0 0.5rem;
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 0.5rem;
    }

    .product-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-bottom: 2rem;
    }

    .product-image {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .product-image img {
        width: 100%;
        height: auto;
        display: block;
    }

    .price {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--color-accent);
    }

    .farmer-link {
        display: inline-block;
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        background-color: var(--color-primary);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: background-color 0.3s ease;
    }

    .farmer-link:hover {
        background-color: var(--color-primary-dark);
    }

    .video-section {
        margin: 2rem 0;
    }

    .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 アスペクト比 */
        height: 0;
        overflow: hidden;
        border-radius: 8px;
    }

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .process-videos {
        margin: 2rem 0;
    }

    .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
    }

    .video-card {
        background-color: var(--color-card-bg);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding-bottom: 1rem;
    }

    .video-card h3 {
        padding: 1rem;
        margin: 0;
        font-size: 1.1rem;
    }

    .video-card p {
        padding: 0 1rem;
        color: var(--color-text-secondary);
    }

    .likes {
        padding: 0 1rem;
        color: var(--color-text-secondary);
        font-size: 0.9rem;
    }

    .location-section {
        margin: 1rem 0;
    }

    .sales-location {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1rem;
        line-height: 1.5;
    }

    .location-icon {
        flex-shrink: 0;
        color: var(--color-accent);
    }

    @media (max-width: 768px) {
        .product-content {
            grid-template-columns: 1fr;
        }

        .videos-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
