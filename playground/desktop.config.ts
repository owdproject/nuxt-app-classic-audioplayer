import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/nuxt-theme-paper',
  apps: ['@owdproject/nuxt-app-classic-audioplayer'],
  modules: ['@owdproject/nuxt-module-fs', '@owdproject/nuxt-module-pinia-persistence'],
  systemBar: { enabled: true, startButton: true },
  about: {
    title: 'Audio Player (playground)',
    subtitle: 'app-classic-audioplayer · theme-paper',
    href: 'https://github.com/owdproject/nuxt-app-classic-audioplayer',
    versionText: 'Nuxt Desktop',
    icons: [
      {
        title: 'Open Web Desktop',
        name: 'mdi:hexagon-multiple-outline',
        size: 24,
      },
      {
        title: 'Nuxt.js',
        name: 'simple-icons:nuxt',
        size: 25,
        style: 'margin-top: -1px',
      },
    ],
  },
  fs: {
    mounts: {
      '/mnt/test': '/test.zip',
    },
  },
})
