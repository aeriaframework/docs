<script setup lang="ts">
import { onMounted, ref } from 'vue'
import markdownit from 'markdown-it'
import shiki from '@shikijs/markdown-it'
import typescriptGrammar from 'shiki/langs/typescript.mjs'
import aeriaGrammar from 'virtual:aeria-grammar'

const isDark = ref(false)
const hash = ref('')

type Snippet = {
  name: string
  code: string
}

const snippets = ref<Record<string, Snippet>>({})
const currentSnippet = ref<string | undefined>()
const isCommandCopied = ref(false)

snippets.value.collection = {
  name: 'Collection',
  code: `
\`\`\`aeria
collection Person {
  icon "person"
  properties {
    name str
    age int
    picture File @accept(["image/jpeg"])
  }
  functions {
    get @expose
    getAll @expose
    insert @expose(["root"])
    remove @expose(["root"])
    upload @expose(["root"])
  }
}
\`\`\`
`
}

snippets.value.contract = {
    name: 'Contract',
    code: `
\`\`\`aeria
contract ExampleContract {
  // payload (POST data) will get runtime-validated
  payload {
    properties {
      id str
    }
  }
  response {
    Error {}
    Result Person
  }
}
\`\`\`
`,
}

snippets.value.routing = {
    name: 'Routing',
    code: `
\`\`\`typescript
import { createRouter, Result } from 'aeria'
import { ExampleContract } from '../../.aeria/out/index.mjs'

export const router = createRouter()

router.POST('/example', async (context) => {
  return context.collections.person.functions.get({
    filters: {
      _id: context.request.payload.id,
    },
  })
}, ExampleContract)
\`\`\`
`,
}

snippets.value.sdk = {
    name: 'SDK',
    code: `
\`\`\`typescript
import aeria from 'aeria-sdk'

// SDK get's 1:1 typing from the backend!
const { error, result: person } = aeria().person.example.POST({
  id: 'bf619e0107ae79fbdccc1a68d0f110ac',
})

if( error ) {
  console.error(error)
  return
}

// const person: { name: string, age: number, file: { ... } }
console.log(\`Hello, \${person.name}!\`)
\`\`\`
`,
}

onMounted(async () => {
  const md = markdownit()
  md.use(await shiki({
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    langs: [].concat(
      aeriaGrammar,
      typescriptGrammar,
     )
  }))

  snippets.value = Object.fromEntries(Object.entries(snippets.value).map(([slug, snippet]) => {
    return [slug, {
      ...snippet,
      code: md.render(snippet.code),
    }]
  }))

  currentSnippet.value = hash.value
    ? hash.value.slice(1)
    : Object.keys(snippets.value)[0]
})

const copyCommand = async () => {
  await navigator.clipboard.writeText('npm create -y aeria-app my-project')
  isCommandCopied.value = true
}

const setCurrentSnippet = (slug: string) => {
  location.hash = slug
  currentSnippet.value = slug
}
</script>

<template>
  <nav class="nav">
    Aeria
    <menu>
      <ul>
        <a href="/aeria/">Docs</a>
        <a href="/guide/getting-started/">Getting Started</a>
        <aeria-icon v-clickable v-if="isDark" icon="sun" @click="isDark = false" />
        <aeria-icon v-clickable v-else icon="moon" @click="isDark = true" />
        <aeria-icon
          v-clickable
          icon="github-logo"
          href="https://github.com/aeria-org/aeria"
          target="_blank"
          class="github-logo"
        >
          Star us on Github!
        </aeria-icon>
      </ul>
    </menu>
  </nav>

  <nav class="mobile-nav">
    Aeria
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
          <div class="hero__command-box">
            <div class="hero__command-text">
              npm create -y aeria-app my-project
            </div>
            <div
              v-clickable
              class="hero__command-copy"
              @click="copyCommand"
            >
              <aeria-icon icon="copy" />
            </div>
          </div>
          <div v-if="isCommandCopied" class="hero__command-copied">
            Copied!
          </div>
        </div>
        <div class="hero_cta">
          <a href="/guide/getting-started">
            <aeria-button>Get Started</aeria-button>
          </a>
        </div>
      </div>
      <div class="snippets">
        <div class="snippets__tabs">
          <a 
            v-clickable
            v-for="([slug, snippet]) in Object.entries(snippets)"
            :key="`snippet-${slug}`"
            :class="{
              'snippets__tab': true,
              'snippets__tab--current': currentSnippet === slug,
            }"
            @click="setCurrentSnippet(slug)"
          >
            {{ snippet.name }}
          </a>
        </div>
        <div
          v-if="typeof currentSnippet === 'string'"
          v-html="snippets[currentSnippet].code"
          class="snippet"
        ></div>
      </div>

    </div>
  </section>
</template>

