<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Result'
})
</script>

<template>
  <div class="
    tw-flex
    tw-flex-col
    tw-gap-4
    tw-border
    tw-p-4
    tw-rounded-lg
  ">
    <div>
      <slot></slot>
    </div>
    <div 
      v-if="$slots.result"
      class="
        tw-p-2
        tw-bg-gray-50
        tw-whitespace-pre
        tw-font-[300]
        tw-rounded-lg
    ">
      <div class="tw-font-[500]">
        {{ title }}
      </div>
      <div class="tw-p-2">
        <slot name="result"></slot>
      </div>
    </div>
  </div>
</template>
