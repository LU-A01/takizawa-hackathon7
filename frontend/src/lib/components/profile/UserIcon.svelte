
// REVIEW:

<script lang="ts">
  export let src: string;
  export let alt: string = 'Image'; 
  export let width: string = 'full'; 
  export let height: string = 'auto';
  
</script>

<div class="flex justify-center items-center">
  <img 
    src={src} 
    alt={alt} 
    class={`w-${width} h-${height} object-contain`} 
  />
</div>

