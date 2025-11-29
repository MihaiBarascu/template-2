import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import Image from 'next/image'
import type { Logo as LogoType, Media } from '@/payload-types'

interface LogoProps {
  variant?: 'option1' | 'option2'
  className?: string
}

export async function Logo({ variant = 'option1', className = '' }: LogoProps) {
  const logoData = (await getCachedGlobal('logo', 1)()) as LogoType
  const option = logoData?.[variant]

  // Fallback if logo not configured
  if (!option) {
    return (
      <Link
        href="/"
        className={`text-3xl font-bold text-white hover:text-theme-primary transition-colors ${className}`}
      >
        Logo
      </Link>
    )
  }

  const image = option.image as Media | undefined

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      {option.type === 'text' && option.text && (
        <span className="text-3xl font-bold text-white hover:text-theme-primary transition-colors">
          {option.text}
        </span>
      )}
      {option.type === 'image' && image?.url && (
        <Image
          src={image.url}
          alt={image.alt || 'Logo'}
          width={150}
          height={48}
          className="h-12 w-auto"
          priority
        />
      )}
    </Link>
  )
}
