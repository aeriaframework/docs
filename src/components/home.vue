<script setup lang="ts">
import { AeriaIcon } from 'aeria-ui'
</script>

<template>
  <section id="hero">
    <h1 class="tagline">
      Aeria is the AI era app framework
    </h1>
    <p class="text">
      End-to-end strong typing, server-driven UI components and native AppSec
      features: we've got everything packed so you can ship faster.
    </p>
    <div class="actions">
      <aeria-icon
        icon="book"
        href="/aeria/"
      >
        Docs
      </aeria-icon>
      <aeria-icon
        icon-right
        icon="arrow-right"
        href="/guide/getting-started"
      >
        Get started
      </aeria-icon>
    </div>
  </section>
</template>

<style scoped lang="less">
section {
  padding: 2rem 0;
}

#hero {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.tagline {
  font-size: 3rem;
  line-height: .92;
  font-weight: 900;
  letter-spacing: -1.5px;
  max-width: 960px;
  margin: 0 auto;

  color: transparent;
  background: linear-gradient(100deg, lighten(pink, 6%) 25%, darken(#b7dde9, 10%));
  background-clip: text;
}

.text {
  font-size: 16pt;
  font-weight: 500;
  opacity: .6;
}

.actions {
  display: flex;
  gap: .8em;
  justify-content: center;
}

.actions a:hover {
  color: initial;
}

.actions a {
  display: flex;
  align-items: center;
  font-weight: 400;
  text-decoration: none;
  padding: 1.2rem 1.6rem;
  border-radius: 6px;
  background: #f2f2f2;
}

.actions a:hover {
  background: #eee;
}

.dark .actions a {
  background: #333;
}

.dark .actions a:hover {
  background: #444;
}

@media screen and (min-width: 768px) {
  #hero {
    position: absolute;
    width: 54rem;
    left: 50%;
    transform: translateX(-50%);
    gap: 1rem;
  }

  .tagline {
    font-size: 5rem;
  }

  .actions a {
    font-size: 12pt;
  }
}
</style>

