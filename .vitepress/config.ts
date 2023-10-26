import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Aeria',
  description: 'Official documentation for the Aeria Framework',
  base: '/docs/',

  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
      '/backend/': sidebarBackendReference(),
      '/frontend/': sidebarFrontendReference()
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/aeriaframework/aeria'
      }
    ]
  }
})

function nav() {
  return [
    { text: 'Guide', link: '/guide/getting-started', activeMatch: '/guide/' },
    { text: 'Backend Reference', link: '/backend/', activeMatch: '/backend/' },
    { text: 'Frontend Reference', link: '/frontend/', activeMatch: '/frontend/' },
    // {
    //   text: 'Reference',
    //   activeMatch: '^/(api|server|system)/',
    //   items: [
    //     { text: '@semantic-api/access-control', link: '/access-control/' },
    //     { text: '@semantic-api/api', link: '/backend/' },
    //     { text: '@semantic-api/server', link: '/server/' },
    //     { text: '@semantic-api/system', link: '/system/' },
    //   ]
    // }
  ]
}

function sidebarGuide() {
  return [
    {
      text: 'Introduction',
      collapsed: false,
      items: [
        { text: 'What is Aeria?', link: '/guide/what-is-aeria' },
        { text: 'Getting started', link: '/guide/getting-started' },
        { text: 'Setting the Backend up', link: '/guide/setting-the-backend-up' },
        { text: 'Setting the Frontend up', link: '/guide/setting-the-frontend-up' },
        { text: 'Deploy', link: '/guide/deploy' },
      ]
    }
  ]
}

function sidebarBackendReference() {
  return [
    {
      text: 'Collection',
      items: [
        { text: 'AccessControl', link: '/backend/access-control' },
        { text: 'Collection', link: '/backend/collection' },
        { text: 'CollectionProperty', link: '/backend/collection-property' },
        { text: 'Description', link: '/backend/description' },
        { text: 'defineCollection', link: '/backend/define-collection' },
        { text: 'defineDescription', link: '/backend/define-description' },
        { text: 'useFunctions', link: '/backend/use-functions' },
      ]
    },
    {
      text: 'Functions',
      items: [
        { text: 'count', link: '/backend/count' },
        { text: 'get', link: '/backend/get' },
        { text: 'getAll', link: '/backend/get-all' },
        { text: 'insert', link: '/backend/insert' },
        { text: 'remove', link: '/backend/remove' },
        { text: 'removeAll', link: '/backend/remove-all' },
        { text: 'removeFile', link: '/backend/remove-file' },
        { text: 'upload', link: '/backend/upload' },
      ]
    },
    {
      text: 'Routing',
      link: '/backend/routing',
      items: [
        { text: 'makeRouter', link: '/backend/make-router' }
      ]
    },
    {
      text: 'Validation',
      link: '/backend/validation',
      items: [
        { text: 'validate', link: '/backend/validate' },
        { text: 'validateSilently', link: '/backend/validate-silently' },
      ]
    },
    {
      text: 'Error handling',
      link: '/backend/error-handling',
      items: [
        { text: 'Either', link: '/backend/either' },
      ]
    },
  ]
}

function sidebarFrontendReference() {
  return [
    {
      text: 'Stores',
      link: '/frontend/stores',
      items: [
        { text: 'useStore', link: '/frontend/use-store' },
        { text: 'registerStore', link: '/frontend/register-store' },
        { text: 'createCollectionStore', link: '/frontend/create-collection-store' },
      ]
    },
    {
      text: 'Components',
      link: '/backend/collections',
      items: [
        { text: 'aeria-bare-button', link: '/frontend/components/aeria-bare-button' },
        { text: 'aeria-button', link: '/frontend/components/aeria-button' },
        { text: 'aeria-card', link: '/frontend/components/aeria-card' },
        { text: 'aeria-crud', link: '/frontend/components/aeria-crud' },
        { text: 'aeria-grid', link: '/frontend/components/aeria-grid' },
        { text: 'aeria-info', link: '/frontend/components/aeria-info' },
        { text: 'aeria-main', link: '/frontend/components/aeria-main' },
        { text: 'aeria-picture', link: '/frontend/components/aeria-picture' },
        { text: 'aeria-table', link: '/frontend/components/aeria-table' },
        { text: 'aeria-tabs', link: '/frontend/components/aeria-tabs' },
      ]
    },
    // {
    //   text: 'Routing',
    //   link: '/backend/routing',
    //   items: [
    //     { text: 'makeRouter', link: '/backend/make-router' }
    //   ]
    // },
    // {
    //   text: 'Validation',
    //   link: '/backend/validation',
    //   items: [
    //     { text: 'validate', link: '/backend/validate' },
    //     { text: 'validateSilently', link: '/backend/validate-silently' },
    //   ]
    // },
    // {
    //   text: 'Error handling',
    //   link: '/backend/error-handling',
    //   items: [
    //     { text: 'Either', link: '/backend/either' },
    //   ]
    // },
  ]
}
