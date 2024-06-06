---
layout: false
---

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import markdownit from 'markdown-it'
import shiki from '@shikijs/markdown-it'
import typescriptGrammar from 'shiki/langs/typescript.mjs'
import aeriaGrammar from 'virtual:aeria-grammar'

const snippets: string[] = []
const renderedSnippets = ref<string[]>([])

snippets.push(`
\`\`\`aeria
collection Person {
  properties {
    name str
    age int
    picture File @accept("image/jpeg")
  }
  functions {
    get
    getAll
    insert
    remove
    upload
  }
}
\`\`\`
`)

snippets.push(`
\`\`\`typescript
import { createRouter } from 'aeria'

export const router = createRouter()
router.POST('/example', async (context) => {
  const person = await context.collections.person.functions.get()

  return {
    message: \`hello, \${person.name}!\`
  }
})
\`\`\`
`)

const codeSnippet1 = ref()

onMounted(async () => {
  const md = markdownit()
  md.use(await shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    langs: [aeriaGrammar].concat(
      typescriptGrammar
     )
  }))

  renderedSnippets.value = snippets.map((code) => md.render(code))
})

const swapSnippets = () => {
  renderedSnippets.value = renderedSnippets.value.reverse()
}
</script>

<nav>
  Aeria

  <menu>
    <ul>
      <a href="/aeria/">Docs</a>
      <a href="/guide/getting-started/">Getting Started</a>
    </ul>
  </menu>
</nav>

<section>
  <div class="hero">
    <div class="hero-info">
      <h1>Write better code by writing <u>less code.</u></h1>
      <h2>
        Aeria is a schema definition language and a minimalistic, type-driven
        web framework that ensures the quality of the code being produced
      </h2>
    </div>
    <div class="showcase">
      <div class="snippets">
        <div
          v-html="renderedSnippets[0]"
          class="snippet"
        />
        <div class="highlighted-snippet">
          <div
            v-html="renderedSnippets[1]"
            class="snippet snippet--highlight"
          />
          <a
            href="#"
            class="highlighted-snippet__action"
            @click="swapSnippets"
          >
            Swap
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

<style scoped lang="less">
nav {
  display: flex;
  justify-content: space-between;
  padding: 2rem 8rem;
  border-bottom: 1px solid #efefef;
}

menu ul {
  display: flex;
  gap: 1rem;
}

section {
  padding: 4rem 8rem;
}

.hero {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
}

h1, h2 {
  line-height: 2.4rem;
  margin-bottom: 1rem;
}

h1 {
  font-size: 24pt;
}

h2 {
  font-size: 20pt;
  font-weight: 300;
}

.showcase {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.snippet {
  font-size: 10pt;
  border: 1px solid #efefef;
  border-radius: 6px;
  padding: 1rem;
  min-height: 20rem;
  width: 40rem;
}

.snippet:not(.snippet--highlight) {
  opacity: .6;
  filter: grayscale(1);
}

.snippet,
.snippet > * {
  background: #fdfdfd !important;
}

.highlighted-snippet {
  position: absolute;
  top: 3rem;
  right: -3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  &__action {
    opacity: .6;
  }
}

.snippet--highlight {
  box-shadow: 0 4px 12px #eee;
}
</style>
