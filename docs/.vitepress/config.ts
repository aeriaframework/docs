import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'url'
import * as path from 'path'
import * as fs from 'fs'
import aeriaIcons from 'aeria-icons'

const aeriaGrammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'node_modules', 'aeria-lang-vscode', 'syntaxes', 'aeria.tmLanguage.json'), 'utf8'))

export default defineConfig({
  lang: 'en-US',
  title: 'Aeria',
  description: 'Official documentation for the Aeria Framework',
  base: '/docs',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        'bson': fileURLToPath(new URL('bson.cjs', import.meta.resolve('bson'))),
      },
    },
    optimizeDeps: {
      include: ['bson'],
    },
    plugins: [
      aeriaIcons({
        libraries: [
          '@aeria-ui/ui'
        ]
      }),
    ],
  },
  markdown: {
    languages: [
      aeriaGrammar,
      {
        ...aeriaGrammar,
        name: 'aeria-properties',
        scopeName: 'source.aeria-properties',
        patterns: [
          { include: '#comment' },
          { include: '#properties.column' },
        ]
      },
    ]
  },
  themeConfig: {
    logo: '/assets/logo.png',
    outline: [1, 4],
    nav: [
      {
        text: 'Docs',
        activeMatch: '^/(aeria|aeria-ui)//',
        items: [
          { text: 'Aeria', link: '/aeria/', activeMatch: '^/aeria/' },
          { text: 'Aeria UI', link: '/aeria-ui/', activeMatch: '^/aeria-ui/' },
          { text: 'Aeria SDK', link: '/aeria-sdk/', activeMatch: '^/aeria-sdk/' },
          { text: 'create-aeria-app', link: 'https://github.com/aeria-org/create-aeria-app' },
        ]
      },
      {
        text: 'Guide',
        link: '/guide/getting-started',
        activeMatch: '^/guide/'
      },
      {
        text: 'Demo',
        link: 'https://demo.aeria.land/',
      },
    ],
    sidebar: {
      '/guide/': sidebarGuide(),
      '/aeria/': sidebarAeriaReference(),
      '/aeria-ui/': sidebarAeriaUiReference()
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/aeria-org/aeria'
      },
      {
        icon: 'discord',
        link: 'https://discord.aeria.land/'
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present'
    }
  }
})

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Using as a source of truth', link: '/guide/using-as-a-source-of-truth' },
        { text: 'Integration with IDE and text editors', link: '/guide/integration-with-ide-and-text-editors' },
        { text: 'Deploy', link: '/guide/deploy' },
      ]
    },
  ]
}

function sidebarAeriaReference() {
  return [
    {
      text: 'General',
      items: [
        { text: 'Aeria Lang', link: '/aeria/aeria-lang', },
        { text: 'Collections', link: '/aeria/collections', },
        {
          text: 'Data structure',
          items: [
            { text: 'Aeria Schema', link: '/aeria/aeria-schema', },
            { text: 'Properties', link: '/aeria/properties' },
            { text: 'Validation', link: '/aeria/validation' },
          ],
        },
        { text: 'Contracts', link: '/aeria/contracts' },
        { text: 'Routing', link: '/aeria/routing', },
        { text: 'Error Handling', link: '/aeria/error-handling', },
        { text: 'Security', link: '/aeria/security', },
        { text: 'init()', link: '/aeria/init', },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        {
          text: 'Collections',
          link: '/aeria/builtins/collections'
        },
        {
          text: 'Functions',
          link: '/aeria/builtins/functions'
        }
      ]
    },
    {
      text: 'Advanced API',
      items: [
        { text: 'Condition', link: '/aeria/condition' },
        { text: 'traverseDocument()', link: '/aeria/traverse-document' },
        { text: 'getLookupPipeline()', link: '/aeria/get-lookup-pipeline' },
        { text: 'successfulAuthentication()', link: '/aeria/successful-authentication' },
      ]
    },
  ]
}

function sidebarAeriaUiReference() {
  return [
    {
      text: 'Configuration',
      items: [
        { text: 'App configuration', link: '/aeria-ui/app-configuration' },
        { text: 'Menu configuration', link: '/aeria-ui/menu-configuration' }
      ]
    },
    {
      text: 'Stores',
      items: [
        { text: 'Using and registering stores', link: '/aeria-ui/using-and-registering-stores' },
        { text: 'CollectionStore', link: '/aeria-ui/collection-store' },
      ]
    },
    {
      text: 'Built-ins',
      items: [
        { text: 'Directives', link: '/aeria-ui/directives' },
        { text: 'Composables', link: '/aeria-ui/composables' },
        { text: 'Template functions and computed variables', link: '/aeria-ui/template-functions-and-computed-variables' },
        { text: 'Meta store', link: '/aeria-ui/meta-store' },
      ]
    },
    {
      text: 'Components',
      items: [
        { text: 'aeria-accordion', link: '/aeria-ui/components/aeria-accordion' },
        { text: 'aeria-bare-button', link: '/aeria-ui/components/aeria-bare-button' },
        { text: 'aeria-button', link: '/aeria-ui/components/aeria-button' },
        { text: 'aeria-card', link: '/aeria-ui/components/aeria-card' },
        { text: 'aeria-checkbox', link: '/aeria-ui/components/aeria-checkbox' },
        { text: 'aeria-context-menu', link: '/aeria-ui/components/aeria-context-menu' },
        { text: 'aeria-crud', link: '/aeria-ui/components/aeria-crud' },
        { text: 'aeria-file', link: '/aeria-ui/components/aeria-file' },
        { text: 'aeria-form', link: '/aeria-ui/components/aeria-form' },
        { text: 'aeria-grid', link: '/aeria-ui/components/aeria-grid' },
        { text: 'aeria-icon', link: '/aeria-ui/components/aeria-icon' },
        { text: 'aeria-info', link: '/aeria-ui/components/aeria-info' },
        { text: 'aeria-input', link: '/aeria-ui/components/aeria-input' },
        { text: 'aeria-main', link: '/aeria-ui/components/aeria-main' },
        { text: 'aeria-options', link: '/aeria-ui/components/aeria-options' },
        { text: 'aeria-panel', link: '/aeria-ui/components/aeria-panel' },
        { text: 'aeria-picture', link: '/aeria-ui/components/aeria-picture' },
        { text: 'aeria-search', link: '/aeria-ui/components/aeria-search' },
        { text: 'aeria-select', link: '/aeria-ui/components/aeria-select' },
        { text: 'aeria-switch', link: '/aeria-ui/components/aeria-switch' },
        { text: 'aeria-table', link: '/aeria-ui/components/aeria-table' },
        { text: 'aeria-tabs', link: '/aeria-ui/components/aeria-tabs' },
      ]
    },
  ]
}
