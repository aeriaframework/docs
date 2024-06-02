<script setup lang="ts">
import { AeriaIcon } from 'aeria-ui'
</script>

<template>
  <div class="page">
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

    <section>
      <div class="features">
        <div>
          <h4>Minimal code surface</h4>
          <p>
            Prototype your next project with a few lines of code with the help of a schema definition DSL
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
        <div>
          <h4>Leave nothing for pentesters</h4>
          <p>
            Aeria security decisions are explicit and assessable
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
        <div>
          <h4>Bring up a frontend in minutes</h4>
          <p>
            Aeria features a server-driven UI library that automatically renders your data from information reflected from the backend
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
        <div>
          <h4>Don't let complexity overwhelm you</h4>
          <p>
            Model complex data with nested references and denormalisation with ease
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
        <div>
          <h4>Rich IDE integration</h4>
          <p>
            Get syntax highlighting and hints directly from your IDE
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
        <div>
          <h4>No need to run configure anything</h4>
          <p>
            Got Aeria Lang installed? Aeria's CLI will automatically detect it and compile on file changes
          </p>
          <a href="/aeria/security">Know more</a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="./home.less"></style>

