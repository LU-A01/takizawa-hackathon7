<script lang="ts">
    // 特徴データ
    const features = [
        {
            title: "農家のプロフィール",
            description:
                "地元の農家の顔が見える、詳細なプロフィールを提供。どのような思いで農業に取り組んでいるかを知ることができます。",
            icon: "user",
        },
        {
            title: "栽培過程の動画",
            description:
                "農作物がどのように育てられているかを動画で確認。安心して食べられる農産物の栽培過程を透明に公開しています。",
            icon: "video",
        },
        {
            title: "QRコード連携",
            description:
                "実店舗でQRコードをスキャンすることで、その場で農作物の詳細情報やレビューを確認できます。",
            icon: "qr",
        },
    ];
</script>

<!-- 特徴セクション -->
<div class="bg-theme-secondary py-16 mt-12 w-full">
    <div class="container mx-auto px-4 md:px-6 max-w-5xl">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-theme-primary">
                農家と消費者をつなぐプラットフォーム
            </h2>
            <p class="text-theme-secondary max-w-2xl mx-auto">
                私たちは地域の農業を応援し、消費者が安心して食べられる農産物を提供するため、様々な機能を提供しています。
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {#each features as feature}
                <div
                    class="bg-theme-primary p-6 rounded-lg shadow-theme border border-theme transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                    <div
                        class="w-12 h-12 bg-theme-accent/10 rounded-full flex items-center justify-center mb-4"
                    >
                        {#if feature.icon === "user"}
                            <svg
                                class="w-6 h-6 text-theme-accent"
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
                        {:else if feature.icon === "video"}
                            <svg
                                class="w-6 h-6 text-theme-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path>
                            </svg>
                        {:else if feature.icon === "qr"}
                            <svg
                                class="w-6 h-6 text-theme-accent"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                                ></path>
                            </svg>
                        {/if}
                    </div>
                    <h3 class="text-xl font-semibold mb-2 text-theme-primary">
                        {feature.title}
                    </h3>
                    <p class="text-theme-secondary">{feature.description}</p>
                </div>
            {/each}
        </div>
    </div>
</div>
