# What is Aeria?

Aeria is a web framework that focuses on security and efficiency. It does so by mostly reducing the code volume drastically (an app written in Aeria is generally much smaller in terms of LOC, so less prone to bugs and easier to maintain).

However, depending on the context, Aeria may refer to the ecossystem built around this framework. This ecossystem is made of:

- `aeria`: the secure and efficient web framework
- `aeria-ui`: a server-driven UI library
- `aeria-lang`: a schema declaration language
- `create-aeria-app`: a command-line utility to quickly setup Aeria projects
- _themes, extensions, static analysys tools, etc..._

Get started [here](/guide/getting-started) if you haven't already.


## Some things to have in mind

- Aeria is opinative by nature, meaning it comes with some defaults (which some of them you can change later)
- Aeria is heavily dependent on MongoDB, meaning you can't plug in another database engines
- Aeria does not bring a view layer -- you can however use it as a source of truth in Next/Nuxt/Sveltekit or whatever frameworks

Still not sure if Aeria suits you? Visit [Picking Aeria over another options](/guide/picking-aeria-over-another-options).
