import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ひっさんマスター',
    short_name: 'ひっさんマスター',
    start_url: '/',
    display: 'standalone',
    background_color: '#fefce8',
    theme_color: '#a855f7',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
