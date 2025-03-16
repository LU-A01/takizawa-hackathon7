<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';
    
    interface Product {
        id: number;
        name: string;
        image: string;
        description: string;
        harvestSeason: string;
        price: string;
        videoUrl: string;
        processVideos?: ProcessVideo[];
    }
    
    interface Farmer {
        id: number;
        name: string;
        icon: string;
        description: string;
        location?: string;
    }
    
    interface ProcessVideo {
        id: number;
        title: string;
        videoUrl: string;
        description: string;
        likes: number;
    }
    
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
        description: ""
    });
    
    let product = $state<Product>({
        id: 0,
        name: "",
        image: "",
        description: "",
        harvestSeason: "",
        price: "",
        videoUrl: "",
        processVideos: []
    });
    
    let reviews = $state<Review[]>([]);
    let qrCodeDataUrl = $state("");
    
    // 新しいレビュー用の状態
    let newReview = $state({
        userName: "",
        rating: 5,
        comment: ""
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
                dark: '#228B22',  // 緑色
                light: '#FFFFFF'  // 白色
            }
        })
        .then((dataUrl: string) => {
            qrCodeDataUrl = dataUrl;
        })
        .catch((err: Error) => {
            console.error(err);
            alert('QRコードの生成に失敗しました。');
        });
    }
    
    // レビューの送信
    function submitReview() {
        if (!newReview.userName || !newReview.comment) {
            alert('お名前とコメントを入力してください。');
            return;
        }
        
        // 実際にはAPIにPOSTするが、ここではモックデータに追加
        const now = new Date();
        const formattedDate = `${now.getFullYear()}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getDate().toString().padStart(2, '0')}`;
        
        const review: Review = {
            id: reviews.length + 1,
            userName: newReview.userName,
            rating: newReview.rating,
            comment: newReview.comment,
            createdAt: formattedDate,
            likes: 0
        };
        
        reviews = [review, ...reviews];
        
        // フォームをリセット
        newReview = {
            userName: "",
            rating: 5,
            comment: ""
        };
        
        alert('レビューを投稿しました。ありがとうございます！');
    }
    
    function likeReview(reviewId: number) {
        reviews = reviews.map(review => {
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
                processVideos: product.processVideos.map(video => {
                    if (video.id === videoId) {
                        return { ...video, likes: video.likes + 1 };
                    }
                    return video;
                })
            };
        }
    }
    
    onMount(() => {
        // ここで実際にはAPIからデータを取得する
        // モックデータを使用して表示
        if (farmerId === "1") {
            farmer = {
                id: 1,
                name: "鈴木農園",
                icon: "/images/farmer1.jpg",
                description: "自然と共に生きる農業を目指しています。",
                location: "長野県松本市"
            };
            
            if (productId === "1") {
                product = {
                    id: 1,
                    name: "有機にんじん",
                    image: "/images/carrot.jpg",
                    description: "甘みが強く、生でも美味しく食べられる有機栽培のにんじんです。栄養価が高く、ビタミンAやカロテンを豊富に含んでいます。土づくりから丁寧に行い、農薬や化学肥料を使わずに栽培しています。そのため、お子様からお年寄りまで安心してお召し上がりいただけます。生でサラダに、煮込み料理に、様々な料理にお使いいただけます。",
                    harvestSeason: "春・秋",
                    price: "300円/束",
                    videoUrl: "/videos/carrot-growth.mp4",
                    processVideos: [
                        {
                            id: 1,
                            title: "種まきから収穫まで",
                            videoUrl: "/videos/carrot-process1.mp4",
                            description: "有機にんじんの種まきから収穫までの過程を紹介します。",
                            likes: 24
                        },
                        {
                            id: 2,
                            title: "土づくりのこだわり",
                            videoUrl: "/videos/carrot-process2.mp4",
                            description: "美味しいにんじんを育てるための土づくりについて解説します。",
                            likes: 18
                        }
                    ]
                };
                
                reviews = [
                    {
                        id: 1,
                        userName: "野菜大好き主婦",
                        rating: 5,
                        comment: "とても甘くて美味しいにんじんです！子供も喜んで食べています。生でもサラダで美味しいです。",
                        createdAt: "2023/06/15",
                        likes: 8
                    },
                    {
                        id: 2,
                        userName: "料理人ケン",
                        rating: 4,
                        comment: "煮込み料理に使うと、しっかりとした味と甘みが出て美味しいです。調理しても色鮮やかなのもいいですね。",
                        createdAt: "2023/05/23",
                        likes: 5
                    }
                ];
            } else if (productId === "2") {
                // じゃがいものデータ
                product = {
                    id: 2,
                    name: "じゃがいも（キタアカリ）",
                    image: "/images/potato.jpg",
                    description: "ホクホクとした食感と甘みが特徴の人気品種です。煮崩れしにくく、様々な料理に使えます。ビタミンCが豊富で、皮近くに栄養素が多く含まれているので、皮ごと調理するのもおすすめです。肥沃な土壌で育てられ、独自の栽培方法により、一般的なじゃがいもよりも甘みが強いのが特徴です。",
                    harvestSeason: "夏",
                    price: "400円/kg",
                    videoUrl: "/videos/potato-growth.mp4",
                    processVideos: [
                        {
                            id: 3,
                            title: "じゃがいもの植え付け",
                            videoUrl: "/videos/potato-process1.mp4",
                            description: "春のじゃがいも植え付けの様子です。",
                            likes: 15
                        }
                    ]
                };
                
                reviews = [
                    {
                        id: 3,
                        userName: "ポテト好き",
                        rating: 5,
                        comment: "本当に美味しいじゃがいもです。シンプルに塩ゆでにしても甘みがあって最高です！",
                        createdAt: "2023/07/10",
                        likes: 12
                    }
                ];
            } else {
                // その他の商品
                product = {
                    id: 3,
                    name: "フルーツトマト",
                    image: "/images/tomato.jpg",
                    description: "糖度8度以上の甘いトマト。朝採りのフレッシュな味わいをお届けします。一般的なトマトよりも甘みが強く、フルーツのようにそのままでも美味しく食べられます。丁寧な水管理と日照管理によって、糖度を高めています。サラダはもちろん、カプレーゼなど、シンプルな調理法で素材の味を活かすのがおすすめです。",
                    harvestSeason: "夏",
                    price: "600円/パック",
                    videoUrl: "/videos/tomato-growth.mp4",
                    processVideos: [
                        {
                            id: 4,
                            title: "トマトの栽培環境",
                            videoUrl: "/videos/tomato-process1.mp4",
                            description: "甘いトマトを育てるための環境づくりについて紹介します。",
                            likes: 32
                        }
                    ]
                };
                
                reviews = [
                    {
                        id: 4,
                        userName: "トマト大好き",
                        rating: 5,
                        comment: "これまで食べたトマトの中で一番甘いです！本当にフルーツのような味わいで感動しました。",
                        createdAt: "2023/08/05",
                        likes: 15
                    },
                    {
                        id: 5,
                        userName: "料理研究家",
                        rating: 4,
                        comment: "カプレーゼに使いましたが、甘みと酸味のバランスが絶妙で、シンプルな調理でも美味しさが引き立ちます。",
                        createdAt: "2023/07/28",
                        likes: 9
                    }
                ];
            }
        } else {
            // その他のケースも同様に設定（省略）
            farmer = {
                id: parseInt(farmerId),
                name: "サンプル農園",
                icon: "/images/default-farmer.jpg",
                description: "サンプルデータです。"
            };
            
            product = {
                id: parseInt(productId),
                name: "サンプル商品",
                image: "/images/default-product.jpg",
                description: "これはサンプル商品です。",
                harvestSeason: "春",
                price: "100円/個",
                videoUrl: "/videos/sample.mp4"
            };
            
            reviews = [];
        }
        
        // ページ読み込み時にQRコードを生成
        generateQRCode();
    });

    // 画像読み込みエラー時のハンドラー
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = '/images/default-product.jpg';
    }

    function handleFarmerImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = '/images/default-farmer.jpg';
    }
    
    // 星評価コンポーネント用の関数
    function getRatingStars(rating: number) {
        return Array.from({ length: 5 }, (_, i) => i < rating);
    }
</script>

<svelte:head>
    <title>{product.name} | {farmer.name} | 農作物詳細</title>
    <meta name="description" content="{farmer.name}の{product.name}。栽培方法やこだわり、レビューをご覧いただけます。" />
</svelte:head>

<div class="container mx-auto px-4 py-8">
    <!-- 戻るリンク -->
    <a href="/farmers/{farmer.id}" class="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        {farmer.name}のプロフィールに戻る
    </a>

    <!-- 農作物詳細セクション -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="p-6">
            <div class="flex flex-col lg:flex-row">
                <div class="lg:w-1/2 mb-6 lg:mb-0 lg:pr-6">
                    <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-200">
                        <img src={product.image} alt="{product.name}の写真" class="w-full h-full object-cover" on:error={handleImageError} />
                    </div>
                    
                    {#if product.videoUrl}
                        <div class="mt-6">
                            <h3 class="text-lg font-semibold mb-2">紹介動画</h3>
                            <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                                <video src={product.videoUrl} controls class="w-full h-full object-cover">
                                    お使いのブラウザは動画再生に対応していません。
                                </video>
                            </div>
                        </div>
                    {/if}
                </div>
                
                <div class="lg:w-1/2">
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden mr-3">
                            <img src={farmer.icon} alt="{farmer.name}のプロフィール画像" class="w-full h-full object-cover" on:error={handleFarmerImageError} />
                        </div>
                        <div>
                            <h3 class="text-lg font-medium">{farmer.name}</h3>
                            {#if farmer.location}
                                <p class="text-sm text-gray-600 dark:text-gray-400">{farmer.location}</p>
                            {/if}
                        </div>
                    </div>
                    
                    <h1 class="text-3xl font-bold mb-4">{product.name}</h1>
                    
                    <div class="flex flex-wrap gap-4 mb-4">
                        {#if product.harvestSeason}
                            <div class="flex items-center text-gray-600 dark:text-gray-300">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                                <span>収穫時期: {product.harvestSeason}</span>
                            </div>
                        {/if}
                        {#if product.price}
                            <div class="flex items-center text-gray-600 dark:text-gray-300">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>価格の目安: {product.price}</span>
                            </div>
                        {/if}
                    </div>
                    
                    <div class="prose dark:prose-invert max-w-none mb-6">
                        <h2 class="text-xl font-semibold mb-2">商品説明</h2>
                        <p>{product.description}</p>
                    </div>
                    
                    <div class="flex flex-col sm:flex-row gap-4">
                        <!-- QRコード表示セクション -->
                        <div class="flex-1">
                            <h3 class="text-lg font-semibold mb-3">QRコード</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">この商品ページのQRコードです。実店舗でスキャンして詳細情報を確認できます。</p>
                            {#if qrCodeDataUrl}
                                <div class="flex flex-col items-center">
                                    <img src={qrCodeDataUrl} alt="QRコード" class="w-32 h-32" />
                                    <a href={qrCodeDataUrl} download="product-qrcode.png" class="mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                        QRコードをダウンロード
                                    </a>
                                </div>
                            {:else}
                                <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" on:click={generateQRCode}>
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
        <h2 class="text-2xl font-bold mb-6">栽培過程</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {#each product.processVideos as video}
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                        <video src={video.videoUrl} controls class="w-full h-full object-cover">
                            お使いのブラウザは動画再生に対応していません。
                        </video>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">{video.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">{video.description}</p>
                        <div class="flex items-center">
                            <button class="flex items-center text-gray-500 hover:text-red-500 transition-colors" on:click={() => likeVideo(video.id)}>
                                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
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
    <h2 class="text-2xl font-bold mb-6">カスタマーレビュー</h2>
    
    <!-- レビュー投稿フォーム -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-4">レビューを投稿する</h3>
            <form on:submit|preventDefault={submitReview} class="space-y-4">
                <div>
                    <label for="userName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">お名前</label>
                    <input type="text" id="userName" bind:value={newReview.userName} class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white" />
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">評価</label>
                    <div class="flex items-center">
                        {#each Array(5) as _, i}
                            <button 
                                type="button" 
                                on:click={() => newReview.rating = i + 1}
                                class="text-2xl text-yellow-400 focus:outline-none"
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
                    <label for="comment" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">コメント</label>
                    <textarea id="comment" bind:value={newReview.comment} rows="4" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"></textarea>
                </div>
                
                <div>
                    <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
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
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-2">
                            <h4 class="text-lg font-semibold">{review.userName}</h4>
                            <span class="text-sm text-gray-500 dark:text-gray-400">{review.createdAt}</span>
                        </div>
                        
                        <div class="flex items-center mb-3">
                            {#each getRatingStars(review.rating) as isFilled}
                                <span class="text-yellow-400 text-lg">
                                    {#if isFilled}★{:else}☆{/if}
                                </span>
                            {/each}
                        </div>
                        
                        <p class="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                        
                        <div class="flex items-center">
                            <button class="flex items-center text-gray-500 hover:text-red-500 transition-colors" on:click={() => likeReview(review.id)}>
                                <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                                </svg>
                                <span>{review.likes}いいね</span>
                            </button>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <p class="text-gray-600 dark:text-gray-400">まだレビューがありません。この商品について最初のレビューを投稿しませんか？</p>
        </div>
    {/if}
</div> 