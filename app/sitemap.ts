import type { MetadataRoute } from 'next'

const BASE_URL = 'https://clyvoai.in'

const pages = [
  { path: '/',                                  priority: 1.0, freq: 'monthly'  },
  { path: '/services/ai-chatbots',              priority: 0.9, freq: 'monthly'  },
  { path: '/services/workflow-automation',      priority: 0.9, freq: 'monthly'  },
  { path: '/services/custom-ai-models',         priority: 0.9, freq: 'monthly'  },
  { path: '/services/voice-agents',             priority: 0.9, freq: 'monthly'  },
  { path: '/services/system-integrations',      priority: 0.9, freq: 'monthly'  },
  { path: '/how-it-works',                      priority: 0.8, freq: 'monthly'  },
  { path: '/pricing',                           priority: 0.8, freq: 'monthly'  },
  { path: '/apply',                             priority: 0.8, freq: 'monthly'  },
  { path: '/book',                              priority: 0.8, freq: 'monthly'  },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority, freq }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }))
}
