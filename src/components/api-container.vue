<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="
    tw-flex
    tw-flex-col
    tw-gap-4
    tw-bg-zinc-50
    dark:tw-bg-zinc-800
    tw-p-6
    tw-rounded-lg
  ">
    <div class="
      tw-text-lg
      tw-font-[600]
      ">
      {{ title }}
    </div>

    <div class="
      tw-flex
      tw-flex-col
      tw-gap-2
    ">
      <slot></slot>
    </div>
  </div>
</template>
