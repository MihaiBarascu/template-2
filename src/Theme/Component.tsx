import React from 'react'

import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Theme } from '@/payload-types'

export async function ThemeStyles() {
  const theme: Theme = await getCachedGlobal('theme', 0)()

  // Culori de bază (din admin)
  const primary = theme?.primaryColor || '#f13a11'
  const dark = theme?.darkColor || '#171819'
  const light = theme?.lightColor || '#ffffff'
  const text = theme?.textColor || '#666262'
  const surface = theme?.surfaceColor || '#f9f9f9'

  const cssVariables = `
    :root {
      /* === CULORI DE BAZĂ (din admin) === */
      --theme-primary: ${primary};
      --theme-dark: ${dark};
      --theme-light: ${light};
      --theme-text: ${text};
      --theme-surface: ${surface};

      /* === CULORI DERIVATE (calculate automat) === */
      --theme-muted: color-mix(in srgb, ${text} 70%, ${light});
      --theme-link: color-mix(in srgb, ${dark} 75%, ${light});
      --theme-border: color-mix(in srgb, ${dark} 15%, ${light});
      --theme-primary-hover: color-mix(in srgb, ${primary} 85%, black);
      --theme-primary-light: color-mix(in srgb, ${primary} 20%, ${light});
      --theme-dark-gradient: color-mix(in srgb, ${dark} 90%, black);
    }
  `

  return <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
}
