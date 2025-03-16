<script lang="ts">
    import Button from "$lib/components/ui/Button.svelte";
</script>

<!-- CTAセクション -->
<div class="bg-theme-secondary py-16 mt-12 w-full">
    <div class="container mx-auto px-4 md:px-6 max-w-5xl">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4 text-theme-primary">
                地元の農家を応援しませんか？
            </h2>
            <p class="text-theme-secondary max-w-2xl mx-auto">
                安心・安全な食材を提供する地元の農家と繋がることで、あなたの食生活がもっと豊かになります。
            </p>
            <Button
                class="px-8 py-3 text-lg bg-theme-accent text-white hover:bg-theme-accent-hover shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >今すぐ始める</Button
            >
        </div>
    </div>
</div>
