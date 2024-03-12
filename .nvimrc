function! SetFormatting()
  set expandtab
  set shiftwidth=2
endfunction

augroup Formatting
  autocmd!
  autocmd bufenter * call SetFormatting()
augroup END
