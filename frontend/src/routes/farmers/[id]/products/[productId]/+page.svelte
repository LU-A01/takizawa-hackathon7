<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import QRCode from "qrcode";
    import { getFarmerById } from "$lib/api/farmerApi";
    import type { Farmer } from "$lib/types/Farmer";
    import type { Product, ProcessVideo } from "$lib/types/Product";

    interface Review {
        id: number;
        userName: string;
        rating: number;
        comment: string;
        createdAt: string;
        likes: number;
    }

    // モックデータ（後でAPI呼び出しに置き換え）
    let farmer = $state<Farmer>({
        id: 0,
        name: "",
        icon: "",
        description: "",
        products: [],
    });

    let product = $state<Product>({
        id: 0,
        name: "",
        image: "",
        description: "",
        harvestSeason: "",
        price: "",
        videoUrl: "",
        processVideos: [],
    });

    let reviews = $state<Review[]>([]);
    let qrCodeDataUrl = $state("");

    // 新しいレビュー用の状態
    let newReview = $state({
        userName: "",
        rating: 5,
        comment: "",
    });

    // ページパラメーターからIDを取得
    const farmerId = $page.params.id;
    const productId = $page.params.productId;

    // QRコードの生成
    function generateQRCode() {
        const url = window.location.href;

        QRCode.toDataURL(url, {
            width: 300,
            margin: 2,
            color: {
                dark: "#228B22", // 緑色
                light: "#FFFFFF", // 白色
            },
        })
            .then((dataUrl: string) => {
                qrCodeDataUrl = dataUrl;
            })
            .catch((err: Error) => {
                console.error(err);
                alert("QRコードの生成に失敗しました。");
            });
    }

    // レビューの送信
    function submitReview() {
        if (!newReview.userName || !newReview.comment) {
            alert("お名前とコメントを入力してください。");
            return;
        }

        // 実際にはAPIにPOSTするが、ここではモックデータに追加
        const now = new Date();
        const formattedDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}`;

        const review: Review = {
            id: reviews.length + 1,
            userName: newReview.userName,
            rating: newReview.rating,
            comment: newReview.comment,
            createdAt: formattedDate,
            likes: 0,
        };

        reviews = [review, ...reviews];

        // フォームをリセット
        newReview = {
            userName: "",
            rating: 5,
            comment: "",
        };

        alert("レビューを投稿しました。ありがとうございます！");
    }

    function likeReview(reviewId: number) {
        reviews = reviews.map((review) => {
            if (review.id === reviewId) {
                return { ...review, likes: review.likes + 1 };
            }
            return review;
        });
    }

    function likeVideo(videoId: number) {
        if (product.processVideos) {
            product = {
                ...product,
                processVideos: product.processVideos.map((video) => {
                    if (video.id === videoId) {
                        return { ...video, likes: video.likes + 1 };
                    }
                    return video;
                }),
            };
        }
    }

    onMount(async () => {
        try {
            // APIから農家データを取得
            const farmerData = await getFarmerById(Number(farmerId));

            if (farmerData) {
                farmer = farmerData;

                // 商品データはまだAPIがないのでモックデータを使用
                if (farmerId === "1" && productId === "1") {
                    product = {
                        id: 1,
                        name: "有機にんじん",
                        image: "/images/carrot.jpg",
                        description:
                            "甘みが強く、生でも美味しく食べられる有機栽培のにんじんです。栄養価が高く、ビタミンAやカロテンを豊富に含んでいます。土づくりから丁寧に行い、農薬や化学肥料を使わずに栽培しています。そのため、お子様からお年寄りまで安心してお召し上がりいただけます。生でサラダに、煮込み料理に、様々な料理にお使いいただけます。",
                        harvestSeason: "春・秋",
                        price: "300円/束",
                        videoUrl: "/videos/carrot-growth.mp4",
                        processVideos: [
                            {
                                id: 1,
                                title: "種まきから収穫まで",
                                videoUrl: "/videos/carrot-process1.mp4",
                                description:
                                    "有機にんじんの種まきから収穫までの過程を紹介します。",
                                likes: 24,
                            },
                            {
                                id: 2,
                                title: "土づくりのこだわり",
                                videoUrl: "/videos/carrot-process2.mp4",
                                description:
                                    "美味しいにんじんを育てるための土づくりについて解説します。",
                                likes: 18,
                            },
                        ],
                    };

                    reviews = [
                        {
                            id: 1,
                            userName: "野菜大好き主婦",
                            rating: 5,
                            comment:
                                "とても甘くて美味しいにんじんです！子供も喜んで食べています。生でもサラダで美味しいです。",
                            createdAt: "2023/06/15",
                            likes: 8,
                        },
                        {
                            id: 2,
                            userName: "料理人ケン",
                            rating: 4,
                            comment:
                                "煮込み料理に使うと、しっかりとした味と甘みが出て美味しいです。調理しても色鮮やかなのもいいですね。",
                            createdAt: "2023/05/23",
                            likes: 5,
                        },
                    ];
                } else {
                    // その他のケースも同様に設定（省略）
                    // デフォルトデータを使用
                    product = {
                        id: parseInt(productId),
                        name: "サンプル商品",
                        image: "/images/default-product.jpg",
                        description: "これはサンプル商品です。",
                        harvestSeason: "春",
                        price: "100円/個",
                        videoUrl: "/videos/sample.mp4",
                    };

                    reviews = [];
                }
            } else {
                console.error(
                    `農家ID ${farmerId} のデータが見つかりませんでした`,
                );
            }

            // ページ読み込み時にQRコードを生成
            generateQRCode();
        } catch (error) {
            console.error("データの取得中にエラーが発生しました:", error);
        }
    });

    // 画像読み込みエラー時のハンドラー
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = "/images/default-product.jpg";
    }

    function handleFarmerImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = "/images/default-farmer.jpg";
    }

    // 星評価コンポーネント用の関数
    function getRatingStars(rating: number) {
        return Array.from({ length: 5 }, (_, i) => i < rating);
    }
</script>

<svelte:head>
    <title>{product.name} | {farmer.name} | 農作物詳細</title>
    <meta
        name="description"
        content="{farmer.name}の{product.name}。栽培方法やこだわり、レビューをご覧いただけます。"
    />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- 戻るリンク -->
    <a
        href="/farmers/{farmer.id}"
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
        {farmer.name}のプロフィールに戻る
    </a>

    <!-- 農作物詳細セクション -->
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
                            alt="{product.name}の写真"
                            class="w-full h-full object-cover"
                            onerror={handleImageError}
                        />
                    </div>

                    {#if product.videoUrl}
                        <div class="mt-6">
                            <h3 class="text-lg font-semibold mb-2">紹介動画</h3>
                            <div
                                class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-theme-hover dark:bg-theme-hover"
                            >
                                <video
                                    src={product.videoUrl}
                                    controls
                                    class="w-full h-full object-cover"
                                >
                                    <track
                                        kind="captions"
                                        label="日本語"
                                        src="/captions/product-video-ja.vtt"
                                        srclang="ja"
                                        default
                                    />
                                    お使いのブラウザは動画再生に対応していません。
                                </video>
                            </div>
                        </div>
                    {/if}
                </div>

                <div class="lg:w-1/2">
                    <div class="flex items-center mb-4">
                        <div
                            class="w-12 h-12 rounded-full bg-theme-hover dark:bg-theme-hover overflow-hidden mr-3"
                        >
                            <img
                                src={farmer.icon}
                                alt="{farmer.name}のプロフィール画像"
                                class="w-full h-full object-cover"
                                onerror={handleFarmerImageError}
                            />
                        </div>
                        <div>
                            <h3 class="text-lg font-medium text-theme-primary">
                                {farmer.name}
                            </h3>
                            {#if farmer.location}
                                <p
                                    class="text-sm text-theme-secondary dark:text-theme-secondary"
                                >
                                    {farmer.location}
                                </p>
                            {/if}
                        </div>
                    </div>

                    <h1 class="text-3xl font-bold mb-4 text-theme-primary">
                        {product.name}
                    </h1>

                    <div class="flex flex-wrap gap-4 mb-4">
                        {#if product.harvestSeason}
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
                                <span>収穫時期: {product.harvestSeason}</span>
                            </div>
                        {/if}
                        {#if product.price}
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
                                <span>価格の目安: {product.price}</span>
                            </div>
                        {/if}
                    </div>

                    <div class="prose dark:prose-invert max-w-none mb-6">
                        <h2
                            class="text-xl font-semibold mb-2 text-theme-primary"
                        >
                            商品説明
                        </h2>
                        <p class="text-theme-primary dark:text-theme-primary">
                            {product.description}
                        </p>
                    </div>

                    <!-- 農家を見るボタン -->
                    <a
                        href={`/farmers/${product.farmerId}`}
                        class="inline-flex items-center px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-theme-accent-hover transition-colors mb-6"
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

                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- QRコード表示セクション -->
                        <div class="flex-1">
                            <h3
                                class="text-lg font-semibold mb-3 text-theme-primary"
                            >
                                QRコード
                            </h3>
                            <p
                                class="text-sm text-theme-secondary dark:text-theme-secondary mb-3"
                            >
                                この商品ページのQRコードです。実店舗でスキャンして詳細情報を確認できます。
                            </p>
                            {#if qrCodeDataUrl}
                                <div class="flex flex-col items-center">
                                    <img
                                        src={qrCodeDataUrl}
                                        alt="QRコード"
                                        class="w-32 h-32"
                                    />
                                    <a
                                        href={qrCodeDataUrl}
                                        download="product-qrcode.png"
                                        class="mt-2 text-theme-accent dark:text-theme-accent hover:underline text-sm"
                                    >
                                        QRコードをダウンロード
                                    </a>
                                </div>
                            {:else}
                                <button
                                    class="px-4 py-2 bg-theme-accent text-white rounded-lg hover:bg-theme-accent-hover transition-colors"
                                    onclick={generateQRCode}
                                >
                                    QRコードを生成
                                </button>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 栽培過程の動画セクション -->
    {#if product.processVideos && product.processVideos.length > 0}
        <h2 class="text-2xl font-bold mb-6 text-theme-primary">栽培過程</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {#each product.processVideos as video}
                <div
                    class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden"
                >
                    <div
                        class="aspect-w-16 aspect-h-9 bg-theme-hover dark:bg-theme-hover"
                    >
                        <video
                            src={video.videoUrl}
                            controls
                            class="w-full h-full object-cover"
                        >
                            <track
                                kind="captions"
                                label="日本語"
                                src={`/captions/${video.id}-ja.vtt`}
                                srclang="ja"
                                default
                            />
                            お使いのブラウザは動画再生に対応していません。
                        </video>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">
                            {video.title}
                        </h3>
                        <p
                            class="text-theme-secondary dark:text-theme-secondary mb-4"
                        >
                            {video.description}
                        </p>
                        <div class="flex items-center">
                            <button
                                class="flex items-center text-theme-secondary dark:text-theme-secondary hover:text-theme-accent transition-colors"
                                onclick={() => likeVideo(video.id)}
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
                                <span>{video.likes}いいね</span>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <!-- レビューセクション -->
    <h2 class="text-2xl font-bold mb-6 text-theme-primary">
        カスタマーレビュー
    </h2>

    <!-- レビュー投稿フォーム -->
    <div
        class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden mb-8"
    >
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-4 text-theme-primary">
                レビューを投稿する
            </h3>
            <form
                onsubmit={(e) => {
                    e.preventDefault();
                    submitReview();
                }}
                class="space-y-4"
            >
                <div>
                    <label
                        for="userName"
                        class="block text-sm font-medium text-theme-primary dark:text-theme-primary mb-1"
                        >お名前</label
                    >
                    <input
                        type="text"
                        id="userName"
                        bind:value={newReview.userName}
                        class="w-full px-4 py-2 border bg-theme-card border-theme dark:border-theme rounded-md shadow-sm focus:ring-2 focus:ring-theme-accent focus:border-transparent dark:bg-theme-hover dark:text-theme-primary"
                    />
                </div>

                <div>
                    <label
                        for="rating"
                        class="block text-sm font-medium text-theme-primary dark:text-theme-primary mb-1"
                        >評価</label
                    >
                    <input
                        type="hidden"
                        id="rating"
                        name="rating"
                        value={newReview.rating}
                    />
                    <div class="flex items-center">
                        {#each Array(5) as _, i}
                            <button
                                type="button"
                                onclick={() => (newReview.rating = i + 1)}
                                class="text-2xl text-theme-accent focus:outline-none"
                                aria-label="{i + 1}星の評価"
                            >
                                {#if i < newReview.rating}
                                    ★
                                {:else}
                                    ☆
                                {/if}
                            </button>
                        {/each}
                    </div>
                </div>

                <div>
                    <label
                        for="comment"
                        class="block text-sm font-medium text-theme-primary dark:text-theme-primary mb-1"
                        >コメント</label
                    >
                    <textarea
                        id="comment"
                        bind:value={newReview.comment}
                        rows="4"
                        class="w-full px-4 py-2 border bg-theme-card border-theme dark:border-theme rounded-md shadow-sm focus:ring-2 focus:ring-theme-accent focus:border-transparent dark:bg-theme-hover dark:text-theme-primary"
                    ></textarea>
                </div>

                <div>
                    <button
                        type="submit"
                        class="px-6 py-2 bg-theme-accent text-white rounded-lg hover:bg-theme-accent-hover transition-colors"
                    >
                        レビューを投稿
                    </button>
                </div>
            </form>
        </div>
    </div>

    <!-- レビュー一覧 -->
    {#if reviews.length > 0}
        <div class="space-y-6">
            {#each reviews as review}
                <div
                    class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden"
                >
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-semibold">
                                {review.userName}
                            </h4>
                            <span
                                class="text-sm text-theme-secondary dark:text-theme-secondary"
                                >{review.createdAt}</span
                            >
                        </div>

                        <div class="flex items-center mb-3">
                            {#each getRatingStars(review.rating) as isFilled}
                                <span class="text-theme-accent text-lg">
                                    {#if isFilled}★{:else}☆{/if}
                                </span>
                            {/each}
                        </div>

                        <p
                            class="text-theme-primary dark:text-theme-primary mb-4"
                        >
                            {review.comment}
                        </p>

                        <div class="flex items-center">
                            <button
                                class="flex items-center text-theme-secondary dark:text-theme-secondary hover:text-theme-accent transition-colors"
                                onclick={() => likeReview(review.id)}
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
                                <span>{review.likes}いいね</span>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div
            class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg p-8 text-center"
        >
            <p class="text-theme-secondary dark:text-theme-secondary">
                まだレビューがありません。この商品について最初のレビューを投稿しませんか？
            </p>
        </div>
    {/if}
</div>
