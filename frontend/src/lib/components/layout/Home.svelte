<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
    import { onMount } from "svelte";
    
    // モックデータ（後でAPI呼び出しに置き換え）
    const farmers = [
        {
            id: 1,
            name: "鈴木農園",
            icon: "/images/farmer1.jpg",
            description: "自然と共に生きる農業を目指しています。無農薬・有機栽培にこだわり、安全でおいしい野菜を育てています。",
            products: ["にんじん", "じゃがいも", "トマト"]
        },
        {
            id: 2,
            name: "山田ファーム",
            icon: "/images/farmer2.jpg",
            description: "代々続く農家の伝統を守りながらも、新しい技術を取り入れた農業を実践しています。",
            products: ["りんご", "ぶどう", "もも"]
        },
        {
            id: 3,
            name: "緑の谷農場",
            icon: "/images/farmer3.jpg",
            description: "自然豊かな山間部で育てる作物は、味と栄養にこだわっています。四季折々の野菜と果物を提供します。",
            products: ["レタス", "ほうれん草", "かぼちゃ"]
        }
    ];

    // 画像読み込みエラー時のハンドラー
    function handleImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = '/images/default-farmer.jpg';
    }
</script>

<!-- フルワイドのヒーローセクション -->
<div class="w-full relative mb-16">
    <div class="relative w-full h-[90vh] max-h-[800px] min-h-[500px] bg-cover bg-center bg-fixed overflow-hidden" style="background-image: url('/images/hero-bg.jpg')">
        <!-- オーバーレイグラデーション -->
        <div class="absolute inset-0 bg-gradient-to-r from-green-800/85 to-blue-700/75 dark:from-green-900/90 dark:to-blue-800/85"></div>
        
        <!-- コンテンツ -->
        <div class="container mx-auto px-4 h-full flex items-center relative z-10">
            <div class="flex flex-col md:flex-row items-center h-full py-16">
                <!-- テキストコンテンツ -->
                <div class="md:w-1/2 mb-12 md:mb-0 animate-fade-in">
                    <h1 class="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-white drop-shadow-lg leading-tight">
                        地元の農家と<br class="hidden sm:block" />つながる体験
                    </h1>
                    <p class="text-xl mb-8 text-white/90 drop-shadow max-w-xl leading-relaxed">
                        あなたの食べ物がどこから来るのか、誰が作っているのかを知ることができます。地元の農家を応援し、安心・安全な農作物を手に入れましょう。
                    </p>
                    <Button class="px-8 py-3 text-lg bg-white text-theme-accent hover:bg-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:scale-105">農家を探す</Button>
                </div>
                <!-- イメージコンテナ -->
                <div class="md:w-1/2 flex justify-center animate-slide-in">
                    <div class="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-500">
                        <img src="/images/hero-image.jpg" alt="農家の風景" class="w-full h-auto rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 農家一覧セクション -->
<div class="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
    <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">地元の農家たち</h2>
        <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">地域の豊かな食文化を支える農家の方々をご紹介します。それぞれが独自のこだわりを持ち、安全で美味しい農作物を育てています。</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each farmers as farmer}
            <div class="bg-theme-secondary dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 border border-gray-100 dark:border-gray-700">
                <div class="p-6">
                    <div class="flex items-center mb-4">
                        <div class="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4 border-2 border-theme-accent dark:border-green-600 shadow-md">
                            <img src={farmer.icon} alt="{farmer.name}のプロフィール画像" class="w-full h-full object-cover" on:error={handleImageError} />
                        </div>
                        <h3 class="text-xl font-semibold text-theme-primary dark:text-gray-100">{farmer.name}</h3>
                    </div>
                    <p class="text-theme-secondary dark:text-gray-300 mb-4 line-clamp-3">{farmer.description}</p>
                    <div class="mb-4">
                        <h4 class="font-medium mb-2 text-theme-primary dark:text-gray-200">主な農作物:</h4>
                        <div class="flex flex-wrap gap-2">
                            {#each farmer.products as product}
                                <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">{product}</span>
                            {/each}
                        </div>
                    </div>
                    <a href="/farmers/{farmer.id}" class="inline-flex items-center text-theme-accent dark:text-blue-400 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                        詳細を見る
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- 特徴セクション -->
<div class="bg-gray-50 dark:bg-gray-900 py-16 mt-12 w-full">
    <div class="container mx-auto px-4 md:px-6 max-w-5xl">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">農家と消費者をつなぐプラットフォーム</h2>
            <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">私たちは地域の農業を応援し、消費者が安心して食べられる農産物を提供するため、様々な機能を提供しています。</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div class="bg-theme-secondary dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-theme-accent dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-theme-primary dark:text-gray-100">農家のプロフィール</h3>
                <p class="text-theme-secondary dark:text-gray-300">地元の農家の顔が見える、詳細なプロフィールを提供。どのような思いで農業に取り組んでいるかを知ることができます。</p>
            </div>
            
            <div class="bg-theme-secondary dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-theme-accent dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-theme-primary dark:text-gray-100">栽培過程の動画</h3>
                <p class="text-theme-secondary dark:text-gray-300">農作物がどのように育てられているかを動画で確認。安心して食べられる農産物の栽培過程を透明に公開しています。</p>
            </div>
            
            <div class="bg-theme-secondary dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-theme-accent dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold mb-2 text-theme-primary dark:text-gray-100">QRコード連携</h3>
                <p class="text-theme-secondary dark:text-gray-300">実店舗でQRコードをスキャンすることで、その場で農作物の詳細情報やレビューを確認できます。</p>
            </div>
        </div>
    </div>
</div>

<!-- CTAセクション -->
<div class="container mx-auto px-4 md:px-6 py-16 text-center max-w-5xl">
    <h2 class="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">地元の農家を応援しませんか？</h2>
    <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">安心・安全な食材を提供する地元の農家と繋がることで、あなたの食生活がもっと豊かになります。</p>
    <Button class="px-8 py-3 text-lg bg-theme-accent text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">今すぐ始める</Button>
</div>