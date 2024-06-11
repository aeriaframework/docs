---
layout: false
---

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import markdownit from 'markdown-it'
import shiki from '@shikijs/markdown-it'
import typescriptGrammar from 'shiki/langs/typescript.mjs'
import aeriaGrammar from 'virtual:aeria-grammar'
import { AeriaIcon } from 'aeria-ui'

const { isDark } = useData()

const snippets: string[] = []
const renderedSnippets = ref<string[]>([])

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

snippets.push(`
\`\`\`aeria
collection Person {
  properties {
    name str
    age int
    picture File @accept(["image/jpeg"])
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
      <aeria-icon v-clickable v-if="isDark" icon="sun" @click="isDark = false" />
      <aeria-icon v-clickable v-else icon="moon" @click="isDark = true" />
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
          <div class="showcase-actions">
            <a href="#">
              View more examples
            </a>
            <a
              href="#"
              @click="swapSnippets"
            >
              Swap
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<style lang="less">
* {
  --nav-padding: 2rem;
  --section-padding: 2rem;
  --border-color: #efefef;
  --shadow-color: #eee;
  --snippet-background-color: #f9f9f9;
}

.dark {
  * {
    --border-color: #333;
    --shadow-color: #000;
    --snippet-background-color: #222;
  }
}

@media screen and (min-width: 768px) {
  * {
    --nav-padding: 2rem 8rem;
    --section-padding: 4rem 8rem;
  }
}

</style>

<style scoped lang="less">
@media screen and (min-width: 768px) {
  section h2 {
    font-size: 1.4rem;
  }

  .hero {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }

  .hero-info {
    font-size: 15pt;
  }

  .snippet {
    min-height: 20rem;
    width: 40rem;
  }

  .highlighted-snippet {
    position: absolute;
    top: 3rem;
    right: -3rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;

    a {
      opacity: .6;
    }
  }

  .snippet--highlight {
    box-shadow: 0 4px 12px var(--shadow-color);
  }

  .snippet:not(.snippet--highlight) {
    opacity: .6;
    filter: grayscale(1);
  }
}

nav {
  display: flex;
  justify-content: space-between;
  padding: var(--nav-padding);
  border-bottom: 1px solid var(--border-color);
}

menu ul {
  display: flex;
  gap: 1rem;
}

section {
  padding: var(--section-padding);
}

h1, h2 {
  line-height: 1.2em;
  margin-bottom: 1rem;
}

h1 {
  font-size: 1.6em;
}

h2 {
  font-size: 1.2rem;
  font-weight: 300;
}

.showcase {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.showcase-actions {
  display: flex;
  gap: .8rem;
}

.snippets {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.snippet {
  font-size: 10pt;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 1rem;
  overflow: auto;
}

.snippet,
.snippet > * {
  background: var(--snippet-background-color) !important;
}
</style>
