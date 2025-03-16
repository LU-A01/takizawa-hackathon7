<script lang="ts">
    import { onMount } from "svelte";
    import ProductCard from "../../components/ProductCard.svelte";
    import { getAllProducts } from "../../services/productService";
    import type { Product } from "../../types/Product";

    let products: Product[] = [];
    let loading = true;
    let error = "";

    onMount(async () => {
        try {
            loading = true;
            products = await getAllProducts();
        } catch (err) {
            error = "商品データの読み込み中にエラーが発生しました。";
            console.error(err);
        } finally {
            loading = false;
        }
    });
</script>

<svelte:head>
    <title>商品一覧 | 農家と消費者をつなぐプラットフォーム</title>
    <meta name="description" content="新鮮な農産物の一覧をご覧いただけます。" />
</svelte:head>

<section class="products-section">
    <div class="container">
        <h1>商品一覧</h1>
        <p class="subtitle">農家から直接届く新鮮な農産物</p>

        {#if loading}
            <div class="loading">
                <p>商品データを読み込み中...</p>
            </div>
        {:else if error}
            <div class="error">
                <p>{error}</p>
            </div>
        {:else if products.length === 0}
            <div class="no-products">
                <p>商品が見つかりませんでした。</p>
            </div>
        {:else}
            <div class="products-grid">
                {#each products as product (product.id)}
                    <div class="product-item">
                        <ProductCard {product} />
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</section>

<style>
    .products-section {
        padding: 2rem 0;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }

    h1 {
        font-size: 2rem;
        color: var(--color-text-primary);
        margin-bottom: 0.5rem;
        text-align: center;
    }

    .subtitle {
        text-align: center;
        color: var(--color-text-secondary);
        margin-bottom: 2rem;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 2rem;
    }

    .loading,
    .error,
    .no-products {
        text-align: center;
        padding: 2rem;
        background-color: var(--color-card-bg);
        border-radius: 8px;
        margin: 2rem 0;
    }

    .error {
        color: var(--color-error);
    }

    @media (max-width: 768px) {
        .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 1.5rem;
        }
    }

    @media (max-width: 480px) {
        .products-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
