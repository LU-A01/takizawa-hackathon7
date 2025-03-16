<script lang="ts">
  import { reviews } from "./mockData";
  // コンポーネント外部から review 情報を受け取る（初期値は例として設定）
  export let review = {
    name: "投稿者名",
    date: "2025-03-15",
    rating: 4, // 1～5の星評価
    comment: "これは素晴らしいレビューです。",
    goodCount: 0, // 初期のグッド数
  };

  // 星評価の最大値
  const maxRating = 5;

  // グッドボタンのクリックイベント
  function handleGood() {
    review.goodCount++;
  }
</script>

<div class="review">
  <div class="header">
    <span class="name">{review.name}</span>
    <span class="date">{review.date}</span>
  </div>
  <div class="rating">
    {#each Array(maxRating) as _, i}
      {#if i < review.rating}
        <span class="star">★</span>
      {:else}
        <span class="star">☆</span>
      {/if}
    {/each}
  </div>
  <div class="comment">
    <p>{review.comment}</p>
  </div>
  <div class="good">
    <button on:click={handleGood}>グッド ({review.goodCount})</button>
  </div>
</div>

<style>
  .review {
    border: 1px solid #ccc;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    font-family: sans-serif;
  }
  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }
  .name {
    font-weight: bold;
  }
  .date {
    color: #888;
    font-size: 0.9rem;
  }
  .rating {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  .star {
    margin-right: 0.1rem;
  }
  .comment {
    margin-bottom: 0.5rem;
  }
  .good button {
    background: #eee;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 4px;
    transition: background 0.2s;
  }
  .good button:hover {
    background: #ddd;
  }
</style>
