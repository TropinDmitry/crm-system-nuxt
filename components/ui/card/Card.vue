<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'cursor-pointer rounded-lg border bg-card text-card-foreground animation border border-transparent transition-colors hover:border-[#197A75]',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

<style scoped>
  
  @keyframes show {
    from {
      /*@apply border-[#a252c83d];*/
      border-color: rgba(162, 82, 200, 0.24);
      transform: scale(0.5) translateY(-30px);
      opacity: 0.4;
    }

    90% {
      /*@apply border-[#a252c83d];*/
      border-color: rgba(162, 82, 200, 0.24);
    }

    to {
      /*@apply border-transparent;*/
      border-color: transparent;
      transform: scale(1) translateY(0);
      opacity: 1;
    }
  }

  .animation {
    animation: show 0.3s ease-in-out;
  }
</style>