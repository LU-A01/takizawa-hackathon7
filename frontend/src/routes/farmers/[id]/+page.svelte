<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    interface Product {
        id: number;
        name: string;
        image: string;
        description: string;
        harvestSeason: string;
        price: string;
        videoUrl: string;
    }

    interface Farmer {
        id: number;
        name: string;
        icon: string;
        description: string;
        location?: string;
        establishedYear?: number;
        farmSize?: string;
        certifications?: string[];
    }

    // モックデータ（後でAPI呼び出しに置き換え）
    let farmer = $state<Farmer>({
        id: 0,
        name: "",
        icon: "",
        description: "",
    });

    let products = $state<Product[]>([]);

    // ページパラメーターからIDを取得
    const farmerId = $page.params.id;

    onMount(() => {
        // ここで実際にはAPIからデータを取得する
        // モックデータを使用して表示
        if (farmerId === "1") {
            farmer = {
                id: 1,
                name: "鈴木農園",
                icon: "/images/farmer1.jpg",
                description:
                    "自然と共に生きる農業を目指しています。無農薬・有機栽培にこだわり、安全でおいしい野菜を育てています。当園では、季節ごとの旬の野菜を大切に育て、収穫から出荷まで一貫して行っています。土づくりから始まり、自然の恵みを活かした農法で、安全で栄養価の高い野菜作りに取り組んでいます。",
                location: "長野県松本市",
                establishedYear: 1985,
                farmSize: "5ヘクタール",
                certifications: ["有機JAS認証", "特別栽培農産物"],
            };

            products = [
                {
                    id: 1,
                    name: "有機にんじん",
                    image: "/images/carrot.jpg",
                    description:
                        "甘みが強く、生でも美味しく食べられる有機栽培のにんじんです。",
                    harvestSeason: "春・秋",
                    price: "300円/束",
                    videoUrl: "/videos/carrot-growth.mp4",
                },
                {
                    id: 2,
                    name: "じゃがいも（キタアカリ）",
                    image: "/images/potato.jpg",
                    description:
                        "ホクホクとした食感と甘みが特徴の人気品種です。煮崩れしにくく、様々な料理に使えます。",
                    harvestSeason: "夏",
                    price: "400円/kg",
                    videoUrl: "/videos/potato-growth.mp4",
                },
                {
                    id: 3,
                    name: "フルーツトマト",
                    image: "/images/tomato.jpg",
                    description:
                        "糖度8度以上の甘いトマト。朝採りのフレッシュな味わいをお届けします。",
                    harvestSeason: "夏",
                    price: "600円/パック",
                    videoUrl: "/videos/tomato-growth.mp4",
                },
            ];
        } else if (farmerId === "2") {
            // 他の農家データも同様に設定
            farmer = {
                id: 2,
                name: "山田ファーム",
                icon: "/images/farmer2.jpg",
                description:
                    "代々続く農家の伝統を守りながらも、新しい技術を取り入れた農業を実践しています。山に囲まれた自然豊かな場所で、四季折々の果物を栽培しています。先代から受け継いだ技術と、最新の栽培方法を融合させた独自の栽培方法で、味と品質にこだわった果物を育てています。",
                location: "山梨県笛吹市",
                establishedYear: 1962,
                farmSize: "7ヘクタール",
                certifications: ["GAP認証", "エコファーマー"],
            };

            products = [
                {
                    id: 4,
                    name: "サンふじりんご",
                    image: "/images/apple.jpg",
                    description:
                        "蜜がたっぷり入った甘いりんご。みずみずしい食感と芳醇な香りが特徴です。",
                    harvestSeason: "秋",
                    price: "500円/個",
                    videoUrl: "/videos/apple-growth.mp4",
                },
                {
                    id: 5,
                    name: "シャインマスカット",
                    image: "/images/grape.jpg",
                    description:
                        "皮ごと食べられる、甘くて香りの良いぶどうです。一粒一粒が大きく、ジューシーな味わい。",
                    harvestSeason: "夏",
                    price: "2,500円/房",
                    videoUrl: "/videos/grape-growth.mp4",
                },
                {
                    id: 6,
                    name: "白桃",
                    image: "/images/peach.jpg",
                    description:
                        "とろけるような食感と甘い香りが楽しめる、山梨県自慢の白桃です。",
                    harvestSeason: "夏",
                    price: "800円/個",
                    videoUrl: "/videos/peach-growth.mp4",
                },
            ];
        } else {
            // デフォルトデータまたはエラー処理
            farmer = {
                id: 3,
                name: "緑の谷農場",
                icon: "/images/farmer3.jpg",
                description:
                    "自然豊かな山間部で育てる作物は、味と栄養にこだわっています。四季折々の野菜と果物を提供します。標高の高い場所で育つため、昼夜の寒暖差を活かした栽培方法で、野菜本来の味を引き出しています。農薬使用を最小限に抑え、環境に配慮した持続可能な農業を実践しています。",
                location: "茨城県つくば市",
                establishedYear: 2010,
                farmSize: "3ヘクタール",
                certifications: ["エコファーマー"],
            };

            products = [
                {
                    id: 7,
                    name: "サラダレタス",
                    image: "/images/lettuce.jpg",
                    description:
                        "シャキシャキとした食感と瑞々しさが特徴の、低農薬栽培のレタスです。",
                    harvestSeason: "春・秋",
                    price: "200円/個",
                    videoUrl: "/videos/lettuce-growth.mp4",
                },
                {
                    id: 8,
                    name: "ほうれん草",
                    image: "/images/spinach.jpg",
                    description:
                        "栄養価が高く、鮮度抜群のほうれん草。アクが少なく、生でもサラダとして楽しめます。",
                    harvestSeason: "冬・春",
                    price: "250円/束",
                    videoUrl: "/videos/spinach-growth.mp4",
                },
                {
                    id: 9,
                    name: "栗かぼちゃ",
                    image: "/images/pumpkin.jpg",
                    description:
                        "甘みが強く、ホクホクとした食感の栗かぼちゃ。煮物や天ぷらなど、様々な料理に使えます。",
                    harvestSeason: "秋",
                    price: "600円/個",
                    videoUrl: "/videos/pumpkin-growth.mp4",
                },
            ];
        }
    });

    // 画像読み込みエラー時のハンドラー
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = "/images/default-farmer.jpg";
    }

    function handleProductImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = "/images/default-product.jpg";
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
                            on:error={handleImageError}
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

    <!-- 農作物一覧セクション -->
    <h2 class="text-2xl font-bold mb-6 text-theme-primary">
        栽培している農作物
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {#each products as product}
            <div
                class="bg-theme-secondary dark:bg-theme-secondary rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
                <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                    <img
                        src={product.image}
                        alt="{product.name}の写真"
                        class="w-full h-full object-cover"
                        on:error={handleProductImageError}
                    />
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">{product.name}</h3>
                    <p
                        class="text-theme-secondary dark:text-theme-secondary mb-4 line-clamp-3"
                    >
                        {product.description}
                    </p>
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
                    <a
                        href="/farmers/{farmer.id}/products/{product.id}"
                        class="inline-block mt-2 text-theme-accent dark:text-theme-accent hover:underline"
                    >
                        詳細・レビューを見る →
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>
