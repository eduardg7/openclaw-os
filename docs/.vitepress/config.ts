import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "OpenClaw OS",
  description: "Personal Operating System for AI Agents",
  base: '/openclaw-os/',
  
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'OpenClaw OS',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: '/USER-GUIDE' },
      { text: 'Contributing', link: '/CONTRIBUTING' },
      { text: 'GitHub', link: 'https://github.com/eduardg7/openclaw-os' }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Introduction', link: '/' },
            { text: 'Quick Start', link: '/USER-GUIDE#-getting-started' },
            { text: 'Installation', link: '/USER-GUIDE#installation' },
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Dashboard', link: '/USER-GUIDE#-using-openclaw-os' },
            { text: 'Agents', link: '/USER-GUIDE#agents-page' },
            { text: 'Tasks', link: '/USER-GUIDE#tasks-page' },
            { text: 'Settings', link: '/USER-GUIDE#settings' },
          ]
        },
        {
          text: 'Deployment',
          items: [
            { text: 'Docker', link: '/USER-GUIDE#-docker-deployment' },
            { text: 'Production', link: '/USER-GUIDE#-advanced-usage' },
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'Contributing', link: '/CONTRIBUTING' },
            { text: 'Changelog', link: '/CHANGELOG' },
            { text: 'Troubleshooting', link: '/USER-GUIDE#-troubleshooting' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/eduardg7/openclaw-os' },
      { icon: 'discord', link: 'https://discord.com/invite/clawd' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Faintech Solutions'
    },

    search: {
      provider: 'local'
    }
  }
})
