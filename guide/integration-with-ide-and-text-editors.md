# Integration with IDE and text editors

Officially supported plugins and extensions for Vim, Neovim, and VSCode-compatible editors exist in the following Github repo: https://github.com/aeria-org/language-tools. They provide syntax highligthing and LSP capabilities such as: inline diagnostics, autocompletion, etc.

## Visual Studio Code (and compatible)

The Aeria extension is published to Visual Studio Marketplace and to OpenVSIX, so compatible editors like VSCodium and Eclipse can also benefit from it. In order to install, simply search for the extension name in the "Extensions" tab of the IDE interface.

## Neovim

The **aeria.nvim** plugin ships the Aeria Language Server and Tree Sitter-powered syntax highlighting. Example of how to install using a Lua configuration file and the [lazy.nvim](https://github.com/folke/lazy.nvim) manager:

```lua
require('lazy').setup({
  "aeria-org/aeria.nvim",
  -- ...
})
```

## Vim

The **aeria.vim** plugin ships the Aeria Language Server and syntax highlighting. Example of how to install using a Lua configuration file and the [vim-plug](https://github.com/junegunn/vim-plug) plugin manager:

```vim
call plug#begin()
Plug 'aeria-org/aeria.vim'
" ...
call plug#end()
```

