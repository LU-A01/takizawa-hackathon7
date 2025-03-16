<script lang="ts">
  import ThemeToggle from "$lib/components/layout/ThemeToggle.svelte";

  let { darkMode, toggleDarkMode } = $props<{
    darkMode: boolean;
    toggleDarkMode: () => void;
  }>();
</script>

<header
  class="border-b border-theme bg-theme-header px-6 py-4 shadow-theme transition-colors duration-200 z-10"
>
  <div class="mx-auto flex max-w-5xl items-center justify-between">
    <div class="flex items-center gap-2">
      <div
        class="flex h-10 w-10 items-center justify-center rounded-md bg-theme-accent text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 21V8" />
          <path d="M12 9C9 3 3 9 3 9" />
          <path d="M12 9c3-6 9 0 9 0" />
          <path d="M4 21h16" />
        </svg>
      </div>
      <h1
        class="text-2xl font-bold text-theme-primary transition-colors duration-200"
      >
        Tsuna<span class="text-theme-accent">Agri</span>
        <span class="text-xs font-normal text-theme-secondary block"
          >農家と消費者をつなぐプラットフォーム</span
        >
      </h1>
    </div>

    <ThemeToggle {darkMode} {toggleDarkMode} />
  </div>
</header>
