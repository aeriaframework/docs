<script setup lang="ts">
import { ref } from 'vue'
import { AeriaButton } from 'aeria-ui'

const count = ref(0)
</script>

<template>
  <aeria-button @click="count++">
    {{ count }}
  </aeria-button>
</template>
