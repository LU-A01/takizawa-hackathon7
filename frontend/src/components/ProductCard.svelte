<script lang="ts">
    import { onMount } from "svelte";
    import type { Product } from "../types/Product";

    export let product: Product;

    // 価格をフォーマットする関数
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY",
        }).format(price);
    };
</script>

<div class="product-card">
    <div class="product-image">
        <img src={product.image} alt={product.name} />
    </div>
    <div class="product-info">
        <h3>{product.name}</h3>
        <p class="price">{formatPrice(product.price)}</p>
        <p class="season">収穫時期: {product.harvestSeason}</p>
        <p class="description">{product.description}</p>
        <a
            href={`/farmers/${product.farmerId}/products/${product.id}`}
            class="view-details">詳細を見る</a
        >
    </div>
</div>

<style>
    .product-card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-card-bg);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        height: 100%;
    }

    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    }

    .product-image {
        height: 200px;
        overflow: hidden;
    }

    .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }

    .product-card:hover .product-image img {
        transform: scale(1.05);
    }

    .product-info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    h3 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
        color: var(--color-text-primary);
    }

    .price {
        font-weight: bold;
        color: var(--color-accent);
        margin: 0.5rem 0;
        font-size: 1.1rem;
    }

    .season {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        margin: 0.25rem 0;
    }

    .description {
        font-size: 0.9rem;
        color: var(--color-text-secondary);
        margin: 0.5rem 0;
        flex-grow: 1;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .view-details {
        display: inline-block;
        margin-top: auto;
        padding: 0.5rem 1rem;
        background-color: var(--color-primary);
        color: white;
        text-decoration: none;
        border-radius: 4px;
        text-align: center;
        transition: background-color 0.3s ease;
    }

    .view-details:hover {
        background-color: var(--color-primary-dark);
    }
</style>
