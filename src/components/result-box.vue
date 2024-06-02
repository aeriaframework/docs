<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Result'
})
</script>

<template>
  <div class="
    flex
    flex-col
    gap-4
    border
    dark:border-gray-800
    p-4
    rounded-lg
  ">
    <div>
      <slot></slot>
    </div>
    <div 
      v-if="$slots.result"
      class="
        p-2
        bg-gray-50
        dark:bg-gray-800
        whitespace-pre
        font-[300]
        rounded-lg
    ">
      <div class="font-[500]">
        {{ title }}
      </div>
      <div class="p-2">
        <slot name="result"></slot>
      </div>
    </div>
  </div>
</template>
