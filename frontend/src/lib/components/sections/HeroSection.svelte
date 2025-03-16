<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
</script>

<!-- フルワイドのヒーローセクション -->
<div class="w-full relative mb-16">
    <div
        class="relative w-full h-[90vh] max-h-[800px] min-h-[500px] bg-cover bg-center bg-fixed overflow-hidden pt-16"
        style="background-image: url('/images/hero-bg.jpg')"
    >
        <!-- ブラーオーバーレイ -->
        <div class="absolute inset-0 backdrop-blur-[2px] bg-black/10"></div>

        <!-- オーバーレイグラデーション -->
        <div
            class="absolute inset-0 bg-gradient-to-r from-theme-accent/90 to-theme-accent/75"
        ></div>

        <!-- コンテンツ -->
        <div
            class="container mx-auto px-4 h-full flex items-center relative z-10"
        >
            <div class="flex flex-col md:flex-row items-center h-full py-16">
                <!-- テキストコンテンツ -->
                <div class="md:w-1/2 mb-12 md:mb-0 animate-fade-in">
                    <h1
                        class="text-4xl md:text-5xl xl:text-6xl font-bold mb-6 text-theme-primary drop-shadow-lg leading-tight"
                    >
                        地元の農家と<br class="hidden sm:block" />つながる体験
                    </h1>
                    <p
                        class="text-xl mb-8 text-theme-primary drop-shadow max-w-xl leading-relaxed"
                    >
                        あなたの食べ物がどこから来るのか、誰が作っているのかを知ることができます。地元の農家を応援し、安心・安全な農作物を手に入れましょう。
                    </p>
                    <Button
                        class="px-8 py-3 text-lg bg-theme-accent text-white hover:bg-theme-accent-hover shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        >農家を探す</Button
                    >
                </div>
                <!-- イメージコンテナ -->
                <div class="md:w-1/2 flex justify-center animate-slide-in">
                    <div
                        class="relative rounded-lg overflow-hidden shadow-2xl w-full max-w-md transform hover:scale-105 transition-transform duration-500"
                    >
                        <img
                            src="/images/hero-image.jpg"
                            alt="農家の風景"
                            class="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
