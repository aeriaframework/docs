export default {
  plugins: {
    autoprefixer: {},
    tailwindcss: {
      config: {
        darkMode: 'class',
        content: [
          './**/*.vue',
          './**/*.md',
          '!./node_modules/',
        ]
      },
    },
  },
}
