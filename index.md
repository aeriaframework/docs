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
import { AeriaIcon, AeriaButton } from 'aeria-ui'

const { isDark } = useData()

type Snippet = {
  name: string
  code: string
}

const snippets = ref<Snippet[]>([])
const currentSnippet = ref<number | undefined>()

snippets.value.push({
  name: 'Schema',
  code: `
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
`
})

snippets.value.push({
    name: 'Routing',
    code: `
\`\`\`typescript
import { createRouter, Result } from 'aeria'

export const router = createRouter()
router.POST('/example', async (context) => {
    const { error, result: person } = await context.collections.person.functions.get({
      filters: {
        _id: id
      }
    })

  if( error ) {
    return Result.error(error)
  }

  return Result.result({
    message: \`hello, \${person.name}!\`
  })
})
\`\`\`
`,
})

onMounted(async () => {
  const md = markdownit()
  md.use(await shiki({
    themes: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    langs: [].concat(
      aeriaGrammar,
      typescriptGrammar,
     )
  }))

  snippets.value = snippets.value.map((snippet) => {
    return {
      ...snippet,
      code: md.render(snippet.code),
    }
  })

  currentSnippet.value = 0
})

const selectSnippet = (index: number) => {
  currentSnippet.value = index
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
      <aeria-icon v-clickable icon="github-logo" class="github-logo">
        Star us on Github!
      </aeria-icon>
    </ul>
  </menu>
</nav>

<section>
  <div class="hero">
    <div class="hero__info">
      <h1>Let your code do the talking.</h1>
      <h2>
        Aeria is a schema definition language and a minimalistic, type-driven
        web framework that ensures the quality of the code being produced
      </h2>
      <div class="hero__command">
        <div class="hero__command-text">
          npm create -y aeria-app my-project
        </div>
        <div class="hero__command-copy">
          <aeria-icon v-clickable icon="copy" />
        </div>
      </div>
      <div class="hero_cta">
        <aeria-button>Get Started</aeria-button>
      </div>
    </div>
    <div class="showcase">
      <div class="snippets">
        <div class="snippets__tabs">
          <a 
            v-clickable
            v-for="(snippet, index) in snippets"
            :key="`snippet-name-${snippet.name}`"
            class="snippets__tab"
            @click="currentSnippet = index"
          >
            {{ snippet.name }}
          </a>
        </div>
        <div
          v-if="typeof currentSnippet === 'number'"
          v-html="snippets[currentSnippet].code"
          class="snippet"
        ></div>
      </div>
    </div>

  </div>
</section>

<style lang="less">
* {
  --nav-padding: 2rem;
  --section-padding: 2rem;
  --border-color: #efefef;
  --contrast-border-color: black;
  --shadow-color: #eee;
  --snippet-background-color: #f9f9f9;
}

.dark {
  * {
    --border-color: #444;
    --contrast-border-color: white;
    --shadow-color: #000;
    --snippet-background-color: #222;
  }
}

@media screen and (min-width: 1200px) {
  * {
    --nav-padding: 1.4rem 8rem;
    --section-padding: 4rem 8rem;
  }
}
</style>

<style scoped lang="less">
@media screen and (min-width: 1200px) {
  section h2 {
    font-size: 1.4rem;
  }

  .hero {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &__info {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 1rem;
      font-size: 15pt;
    }

    &__command {
      display: inline-flex;
      border: 1px solid var(--border-color);
      align-items: center;
    }

    &__command-text, &__command-copy {
      padding: 1rem;
    }

    &__command-text {
      font-size: 12pt;
      border-right: 1px solid var(--border-color);
    }
  }

  .snippets {
    width: 42rem;
    min-height: 20rem;
  }
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--nav-padding);
  border-bottom: 1px solid var(--border-color);

  menu > ul {
    display: flex;
    align-items: center;
  }

  .github-logo {
    border: 1px solid var(--contrast-border-color);
    padding: 1rem;
  }
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
}

h1 {
  font-size: 2em;
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
  border: 1px solid var(--border-color);

  &__tabs {
    display: flex;
  }

  &__tab {
    flex: 1;
    text-align: center;
    padding: 1rem;
    &:not(:last-child) {
      border-right: 1px solid var(--border-color);
    }
  }
}

.snippet {
  font-size: 10pt;
  padding: 1rem;
  overflow: auto;
}

.snippet,
.snippet > * {
  background: var(--snippet-background-color) !important;
}
</style>
