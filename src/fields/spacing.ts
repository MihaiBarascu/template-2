import type { Field } from 'payload'

// Spacing options
const spacingOptions = [
  { label: 'None (0)', value: 'none' },
  { label: 'XS (4px)', value: 'xs' },
  { label: 'SM (8px)', value: 'sm' },
  { label: 'MD (16px)', value: 'md' },
  { label: 'LG (32px)', value: 'lg' },
  { label: 'XL (48px)', value: 'xl' },
  { label: '2XL (64px)', value: '2xl' },
  { label: '3XL (96px)', value: '3xl' },
]

// Main spacing field - marginTop and marginBottom
export const spacingField: Field = {
  name: 'spacing',
  type: 'group',
  label: 'Spacing',
  admin: {
    description: 'Spațiu vertical între blocuri',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'marginTop',
          type: 'select',
          label: 'Margin Top',
          defaultValue: 'none',
          options: spacingOptions,
          admin: { width: '50%' },
        },
        {
          name: 'marginBottom',
          type: 'select',
          label: 'Margin Bottom',
          defaultValue: 'none',
          options: spacingOptions,
          admin: { width: '50%' },
        },
      ],
    },
  ],
}

// Tailwind class mappings
const marginTopMap: Record<string, string> = {
  none: '',
  xs: 'mt-1',
  sm: 'mt-2',
  md: 'mt-4',
  lg: 'mt-8',
  xl: 'mt-12',
  '2xl': 'mt-16',
  '3xl': 'mt-24',
}

const marginBottomMap: Record<string, string> = {
  none: '',
  xs: 'mb-1',
  sm: 'mb-2',
  md: 'mb-4',
  lg: 'mb-8',
  xl: 'mb-12',
  '2xl': 'mb-16',
  '3xl': 'mb-24',
}

// Types
export interface SpacingConfig {
  marginTop?: string | null
  marginBottom?: string | null
}

// Get spacing classes from config
export const getSpacingClasses = (spacing?: SpacingConfig | null): string => {
  if (!spacing) return ''

  const classes: string[] = []

  if (spacing.marginTop) classes.push(marginTopMap[spacing.marginTop] || '')
  if (spacing.marginBottom) classes.push(marginBottomMap[spacing.marginBottom] || '')

  return classes.filter(Boolean).join(' ')
}

// Legacy support - keep old topSpacing working during migration
export const topSpacingField: Field = {
  name: 'topSpacing',
  type: 'select',
  label: 'Top Spacing',
  defaultValue: 'none',
  options: [
    { label: 'None', value: 'none' },
    { label: 'Small', value: 'small' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large' },
  ],
  admin: {
    description: 'Spațiu deasupra blocului (legacy)',
  },
}

export const getLegacySpacingClasses = (topSpacing?: string | null): string => {
  const spacingMap: Record<string, string> = {
    none: '',
    small: 'mt-4',
    normal: 'mt-8',
    large: 'mt-12',
  }
  return spacingMap[topSpacing || 'none'] || ''
}
