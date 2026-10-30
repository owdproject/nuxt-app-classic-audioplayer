import { existsSync } from 'node:fs'
import {
  defineNuxtModule,
  createResolver,
  addComponentsDir,
  addPlugin,
} from '@nuxt/kit'
import { registerTailwindPath } from '@owdproject/nuxt-kit-tailwind/kit/registerTailwindPath'

export default defineNuxtModule({
  meta: {
    name: 'desktop-app-classic-audioplayer',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // add components

    addComponentsDir({
      path: resolve('./runtime/components'),
    })

    // add plugins

    addPlugin(resolve('./runtime/plugin'))

    const css = resolve('./runtime/assets/styles/classic-audioplayer.css')
    nuxt.options.css.push(existsSync(css) ? css : resolve('./runtime/assets/styles/classic-audioplayer.scss'))

    // configure tailwind

    registerTailwindPath(
      nuxt,
      resolve('./runtime/components/**/*.{vue,mjs,ts}'),
    )
  },
})
