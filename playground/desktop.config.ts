import { defineDesktopConfig } from '@owdproject/nuxt'

export default defineDesktopConfig({
  theme: '@owdproject/theme-nova',
  apps: ['@owdproject/app-classic-audioplayer'],
  modules: ['@owdproject/module-fs', '@owdproject/nuxt-persistence-pinia'],
  systemBar: { enabled: true, startButton: true },
  about: {
    title: 'Audio Player (playground)',
    subtitle: 'app-classic-audioplayer · theme-nova',
    href: 'https://github.com/owdproject/app-classic-audioplayer',
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
