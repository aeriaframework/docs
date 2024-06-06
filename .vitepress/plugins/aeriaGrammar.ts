import type { Plugin } from 'vite'
import * as path from 'path'
import * as fs from 'fs'

export const aeriaGrammar = (): Plugin => {
  const virtualModuleId = 'virtual:aeria-grammar'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  return {
    name: 'aeria-grammar',
    resolveId(id) {
      if( id === virtualModuleId ) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if( id === resolvedVirtualModuleId ) {
        const json = fs.readFileSync(path.join(__dirname, '..',  '..', 'node_modules', 'aeria-lang-vscode', 'syntaxes', 'aeria.tmLanguage.json'), 'utf8')
        return `export default ${json}`
      }
    }
  }
}
