<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="
    flex
    flex-col
    gap-4
    bg-zinc-50
    dark:bg-zinc-800
    p-6
    rounded-lg
  ">
    <div class="
      text-lg
      font-[600]
      ">
      {{ title }}
    </div>

    <div class="
      flex
      flex-col
      gap-2
    ">
      <slot></slot>
    </div>
  </div>
</template>
